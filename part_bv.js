  }
  write(position, data) {
    let start = position;
    let end = start + data.length;
    let fromIndex = 0;
    let toIndex = this.chunks.length;
    for (; fromIndex < toIndex; fromIndex++) {
      const chunk2 = this.chunks[fromIndex];
      assert(chunk2, "Missing chunk");
      if (start > chunk2.end) {
        continue;
      }
      if (start > chunk2.start) {
        const offset = start - chunk2.start;
        const prefix = chunk2.data.subarray(0, offset);
        data = join(prefix, data);
        start = chunk2.start;
      }
      break;
    }
    for (; toIndex > fromIndex; toIndex--) {
      const chunk2 = this.chunks[toIndex - 1];
      assert(chunk2, "Missing chunk");
      if (end < chunk2.start) {
        continue;
      }
      if (end < chunk2.end) {
        const offset = end - chunk2.start;
        const suffix = chunk2.data.subarray(offset);
        data = join(data, suffix);
        end = chunk2.end;
      }
      break;
    }
    const chunk = {
      start,
      end,
      data
    };
    const deleteCount = toIndex - fromIndex;
    this.chunks.splice(fromIndex, deleteCount, chunk);
  }
};
function join(left, right) {
  const length = left.length + right.length;
  const result = new Uint8Array(length);
  result.set(left, 0);
  result.set(right, left.length);
  return result;
}
function collapseRanges(ranges) {
  assert(ranges.length > 0, "Must have at least one range");
  const sorted = [...ranges].sort((a, b) => a.from - b.from);
  const collapsed = [];
  for (const range of sorted) {
    const index = collapsed.length - 1;
    const previous = collapsed[index];
    if (previous && range.from <= previous.to) {
      collapsed[index] = {
        from: previous.from,
        to: Math.max(previous.to, range.to)
      };
    } else {
      collapsed.push(range);
    }
  }
  return collapsed;
}

// src/code-generation/components/cms/bundled/DatabaseDictionaryIndex.ts
var DatabaseDictionaryIndex = class {
  constructor(options) {
    this.options = options;
    __publicField(this, "schema");
    __publicField(this, "fields");
    __publicField(this, "supportedLookupTypes", [
      "All" /* All */,
      "Equals" /* Equals */,
      "NotEquals" /* NotEquals */,
      "LessThan" /* LessThan */,
      "GreaterThan" /* GreaterThan */,
      "Contains" /* Contains */,
      "StartsWith" /* StartsWith */,
      "EndsWith" /* EndsWith */
    ]);
    __publicField(this, "modelPromise");
    __publicField(this, "model");
    __publicField(this, "collation");
    const schema = {};
    const fields = [];
    for (const fieldName of this.options.fieldNames) {
      const definition = this.options.collectionSchema[fieldName];
      assert(definition, "Missing definition for field", fieldName);
      schema[fieldName] = definition;
      fields.push({ type: "Identifier", name: fieldName });
    }
    this.schema = schema;
    this.fields = fields;
    this.collation = this.options.collation;
  }
