    ]);
    const lastDraftItem = draftItems.pop();
    const firstOriginalItem = originalItems.shift();
    if (lastDraftItem) {
      draftItems.push({
        ...lastDraftItem,
        data: {
          ...lastDraftItem.data,
          [this.nextItemId]: firstOriginalItem?.data.id ?? null
        }
      });
    }
    if (firstOriginalItem) {
      originalItems.unshift({
        ...firstOriginalItem,
        data: {
          ...firstOriginalItem.data,
          [this.previousItemId]: lastDraftItem?.data.id ?? null
        }
      });
    }
    return draftItems.map(draftItem).concat(...originalItems);
  }
  /**
   * Get all items, updating pointers for draft items.
   */
  async scanItems() {
    return this.itemsPromise;
  }
  /**
   * Depending on the pointer, resolve draft rich text from the draft
   * collection, and original rich text from the original collection.
   */
  async resolveRichText(pointer) {
    if (isDraftRichTextPointer(pointer)) {
      const originalPointer = undraftRichTextPointer(pointer);
      return this.draftCollection.resolveRichText(originalPointer);
    }
    return this.originalCollection.resolveRichText(pointer);
  }
  async resolveVectorSetItem(pointer) {
    if (isDraftVectorSetItemPointer(pointer)) {
      const originalPointer = undraftVectorSetItemPointer(pointer);
      return this.draftCollection.resolveVectorSetItem?.(originalPointer);
    }
    return this.originalCollection.resolveVectorSetItem?.(pointer);
  }
  async resolveItems(pointers) {
    const items = await this.itemsPromise;
    return pointers.map((pointer) => {
      const item = items.find((current) => current.pointer === pointer);
      assert(item, "Item must exist");
      return item;
    });
  }
  /**
   * Compare two items, the draft items should come first.
   */
  compareItems(left, right) {
    const leftIsDraft = isDraftPointer(left.pointer);
    const rightIsDraft = isDraftPointer(right.pointer);
    if (leftIsDraft && rightIsDraft) {
      const originalLeft = undraftItem(left);
      const originalRight = undraftItem(right);
      return this.draftCollection.compareItems(originalLeft, originalRight);
    }
    if (leftIsDraft) return -1;
    if (rightIsDraft) return 1;
    return this.originalCollection.compareItems(left, right);
  }
};
var draftPrefix = "draft:";
function isDraftPointer(pointer) {
  return pointer.startsWith(draftPrefix);
}
function draftPointer(pointer) {
  assert(!isDraftPointer(pointer), "should be an original pointer");
  return draftPrefix + pointer;
}
function undraftPointer(pointer) {
  assert(isDraftPointer(pointer), "should be a draft pointer");
  return pointer.slice(draftPrefix.length);
}
function isDraftRichTextPointer(pointer) {
  assert(isNumber(pointer), "rich text pointer must be a number");
  return pointer < 0;
}
function isDraftVectorSetItemPointer(pointer) {
  assert(isNumber(pointer), "vector set item pointer must be a number");
  return pointer < 0;
}
function draftRichTextPointer(pointer) {
  assert(isNumber(pointer), "rich text pointer must be a number");
  assert(!isDraftRichTextPointer(pointer), "should be an original rich text pointer");
  return -pointer - 1;
}
function undraftRichTextPointer(pointer) {
  assert(isNumber(pointer), "rich text pointer must be a number");
  assert(isDraftRichTextPointer(pointer), "should be a draft rich text pointer");
  return -pointer - 1;
