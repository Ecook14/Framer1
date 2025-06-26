  async loadModel() {
    const [bytes] = await rangeRequest(this.options.url, [this.options.range]);
    assert(bytes, "Failed to load model");
    return DatabaseDictionaryIndexModel.deserialize(bytes);
  }
  async getModel() {
    this.modelPromise ??= this.loadModel();
    this.model ??= await this.modelPromise;
    return this.model;
  }
  async lookupItems(queries) {
    assert(queries.length === this.fields.length, "Invalid query length");
    const model = await this.getModel();
    const chunks = queries.reduce(
      (memo, query, position) => memo.flatMap((entries) => {
        switch (query.type) {
          case "All" /* All */:
            return [entries];
          case "Equals" /* Equals */:
            return this.queryEquals(entries, query, position);
          case "NotEquals" /* NotEquals */:
            return this.queryNotEquals(entries, query, position);
          case "LessThan" /* LessThan */:
            return this.queryLessThan(entries, query, position);
          case "GreaterThan" /* GreaterThan */:
            return this.queryGreaterThan(entries, query, position);
          case "Contains" /* Contains */:
            return this.queryContains(entries, query, position);
          case "StartsWith" /* StartsWith */:
            return this.queryStartsWith(entries, query, position);
          case "EndsWith" /* EndsWith */:
            return this.queryEndsWith(entries, query, position);
          default:
            assertNever(query);
        }
      }),
      [model.entries]
    );
    const result = [];
    for (const entries of chunks) {
      for (const entry of entries) {
        const data = {};
        for (let i = 0; i < this.options.fieldNames.length; i++) {
          const fieldName = this.options.fieldNames[i];
          const fieldValue = entry.values[i];
          data[fieldName] = fieldValue;
        }
        result.push({ pointer: entry.pointer.toString(), data });
      }
    }
    return result;
  }
  queryEquals(entries, query, position) {
    const leftMost = this.getLeftMost(entries, position, query.value);
    const rightMost = this.getRightMost(entries, position, query.value);
    const slice = entries.slice(leftMost, rightMost + 1);
    return slice.length > 0 ? [slice] : [];
  }
  queryNotEquals(entries, query, position) {
    const leftMost = this.getLeftMost(entries, position, query.value);
    const rightMost = this.getRightMost(entries, position, query.value);
    const result = [];
    const before = entries.slice(0, leftMost);
    if (before.length > 0) result.push(before);
    const after = entries.slice(rightMost + 1);
    if (after.length > 0) result.push(after);
    return result;
  }
  queryLessThan(entries, query, position) {
    const nullBound = this.getRightMost(entries, position, null);
    entries = entries.slice(nullBound + 1);
    if (query.inclusive) {
      const rightMost = this.getRightMost(entries, position, query.value);
      const slice2 = entries.slice(0, rightMost + 1);
      return slice2.length > 0 ? [slice2] : [];
    }
    const leftMost = this.getLeftMost(entries, position, query.value);
    const slice = entries.slice(0, leftMost);
    return slice.length > 0 ? [slice] : [];
  }
  queryGreaterThan(entries, query, position) {
    const nullBound = this.getRightMost(entries, position, null);
    entries = entries.slice(nullBound + 1);
    if (query.inclusive) {
      const leftMost = this.getLeftMost(entries, position, query.value);
      const slice2 = entries.slice(leftMost);
      return slice2.length > 0 ? [slice2] : [];
    }
    const rightMost = this.getRightMost(entries, position, query.value);
    const slice = entries.slice(rightMost + 1);
    return slice.length > 0 ? [slice] : [];
  }
  queryContains(entries, query, position) {
    return this.findItems(entries, position, (current) => {
      if (current?.type !== ControlType2.String) return false;
      if (query.value?.type !== ControlType2.String) return false;
      let source = current.value;
      let target = query.value.value;
      if (this.collation.type === 0 /* CaseInsensitive */) {
        source = source.toLowerCase();
