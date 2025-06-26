        target = target.toLowerCase();
      }
      return source.includes(target);
    });
  }
  queryStartsWith(entries, query, position) {
    return this.findItems(entries, position, (current) => {
      if (current?.type !== ControlType2.String) return false;
      if (query.value?.type !== ControlType2.String) return false;
      let source = current.value;
      let target = query.value.value;
      if (this.collation.type === 0 /* CaseInsensitive */) {
        source = source.toLowerCase();
        target = target.toLowerCase();
      }
      return source.startsWith(target);
    });
  }
  queryEndsWith(entries, query, position) {
    return this.findItems(entries, position, (current) => {
      if (current?.type !== ControlType2.String) return false;
      if (query.value?.type !== ControlType2.String) return false;
      let source = current.value;
      let target = query.value.value;
      if (this.collation.type === 0 /* CaseInsensitive */) {
        source = source.toLowerCase();
        target = target.toLowerCase();
      }
      return source.endsWith(target);
    });
  }
  /**
   * Returns the index of the left most entry that is equal to the target.
   *
   * \`\`\`text
   *   Left most
   *       \u2193
   * \u250C\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2510
   * \u2502 1 \u2502 2 \u2502 2 \u2502 2 \u2502 2 \u2502 3 \u2502
   * \u2514\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2518
   * \`\`\`
   *
   * @param entries The entries array to search in.
   * @param position The position of the value in the entry.
   * @param target The target value to search for.
   * @returns The index of the left most entry that is equal to the target.
   */
  getLeftMost(entries, position, target) {
    let left = 0;
    let right = entries.length;
    while (left < right) {
      const middle = left + right >> 1;
      const entry = entries[middle];
      const value = entry.values[position];
      if (DatabaseValueModel.compare(value, target, this.collation) < 0) {
        left = middle + 1;
      } else {
        right = middle;
      }
    }
    return left;
  }
  /**
   * Returns the index of the right most entry that is equal to the target.
   *
   * \`\`\`text
   *              Right most
   *                   \u2193
   * \u250C\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2510
   * \u2502 1 \u2502 2 \u2502 2 \u2502 2 \u2502 2 \u2502 3 \u2502
   * \u2514\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2518
   * \`\`\`
   *
   * @param entries The entries array to search in.
   * @param position The position of the value in the entry.
   * @param target The target value to search for.
   * @returns The index of the right most entry that is equal to the target.
   */
  getRightMost(entries, position, target) {
    let left = 0;
    let right = entries.length;
    while (left < right) {
      const middle = left + right >> 1;
      const entry = entries[middle];
      const value = entry.values[position];
      if (DatabaseValueModel.compare(value, target, this.collation) > 0) {
        right = middle;
      } else {
        left = middle + 1;
      }
    }
    return right - 1;
  }
  /**
   * Finds all items that are matching the predicate and groups adjacent items together.
   *
   * @param entries The entries array to search in.
   * @param position The position of the value in the entry.
   * @param predicate The predicate to match the values against.
   * @returns An array of chunks that match the predicate.
