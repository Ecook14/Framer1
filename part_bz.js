        const item = {
          pointer,
          data: itemModel.getData()
        };
        this.itemLoader.prime(pointer, item);
        items.push(item);
      }
      return items;
    });
    return this.itemsPromise;
  }
  resolveItem(pointer) {
    return this.itemLoader.load(pointer);
  }
};
var DatabaseCollection = class {
  constructor(options) {
    this.options = options;
    __publicField(this, "schema");
    __publicField(this, "indexes");
    __publicField(this, "resolveRichText");
    __publicField(this, "resolveVectorSetItem");
    __publicField(this, "chunks");
    this.chunks = this.options.chunks.map((url, id) => {
      return new DatabaseChunk(id, url);
    });
    this.schema = options.schema;
    this.indexes = options.indexes;
    this.resolveRichText = options.resolveRichText;
    this.resolveVectorSetItem = options.resolveVectorSetItem;
  }
  async scanItems() {
    const chunkedItems = await Promise.all(
      this.chunks.map(async (chunk) => {
        return chunk.scanItems();
      })
    );
    return chunkedItems.flat();
  }
  async resolveItems(pointers) {
    return Promise.all(
      pointers.map((pointer) => {
        const pointerModel = DatabaseItemPointerModel.fromString(pointer);
        const chunk = this.chunks[pointerModel.chunkId];
        assert(chunk, "Missing chunk");
        return chunk.resolveItem(pointer);
      })
    );
  }
  compareItems(left, right) {
    const leftModel = DatabaseItemPointerModel.fromString(left.pointer);
    const rightModel = DatabaseItemPointerModel.fromString(right.pointer);
    return leftModel.compare(rightModel);
  }
  compareValues(left, right, collation) {
    return DatabaseValueModel.compare(left, right, collation);
  }
};
export {
  DatabaseCollection,
  DatabaseDictionaryIndex
};
`;var w_=`var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/code-generation/components/cms/bundled/DraftDatabaseCollection.ts?bundle
import { ControlType } from "framer";

// src/utils/typeChecks.ts
function isNumber(value) {
  return Number.isFinite(value);
}

// src/code-generation/components/cms/bundled/assert.ts
function assert(condition, ...msg) {
  if (condition) return;
  throw Error("Assertion Error" + (msg.length > 0 ? ": " + msg.join(" ") : ""));
}

// src/code-generation/components/cms/bundled/DraftDatabaseCollection.ts?bundle
var DraftDatabaseCollection = class {
  constructor(draftCollection, originalCollection, previousItemId, nextItemId) {
    this.draftCollection = draftCollection;
    this.originalCollection = originalCollection;
    this.previousItemId = previousItemId;
    this.nextItemId = nextItemId;
    __publicField(this, "schema");
    // We cannot use the original indexes because the draft items
    // are not in the original collection.
    // Having no indexes means that we perform a full collection scan for every query.
    __publicField(this, "indexes", []);
    __publicField(this, "itemsPromise");
    this.schema = originalCollection.schema;
    this.itemsPromise = this.getItems();
  }
  async getItems() {
    const [[...draftItems], [...originalItems]] = await Promise.all([
      this.draftCollection.scanItems(),
      this.originalCollection.scanItems()
