   */
  findItems(entries, position, predicate) {
    const result = [];
    let start = 0;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const value = entry.values[position];
      const isMatching = predicate(value);
      if (isMatching) continue;
      if (start < i) {
        const slice = entries.slice(start, i);
        result.push(slice);
      }
      start = i + 1;
    }
    if (start < entries.length) {
      const slice = entries.slice(start);
      result.push(slice);
    }
    return result;
  }
};

// src/code-generation/components/cms/bundled/models/DatabaseItemModel.ts
var DatabaseItemModel = class _DatabaseItemModel {
  constructor() {
    __publicField(this, "fields", /* @__PURE__ */ new Map());
  }
  static read(reader) {
    const item = new _DatabaseItemModel();
    const fieldCount = reader.readUint16();
    for (let i = 0; i < fieldCount; i++) {
      const key = reader.readString();
      const value = DatabaseValueModel.read(reader);
      item.setField(key, value);
    }
    return item;
  }
  write(writer) {
    writer.writeUint16(this.fields.size);
    for (const [key, value] of this.fields) {
      writer.writeString(key);
      DatabaseValueModel.write(writer, value);
    }
  }
  getData() {
    const data = {};
    for (const [key, value] of this.fields) {
      data[key] = value;
    }
    return data;
  }
  setField(key, value) {
    this.fields.set(key, value);
  }
  getField(key) {
    return this.fields.get(key);
  }
};

// src/code-generation/components/cms/bundled/DatabaseCollection.ts?bundle
var DatabaseChunk = class {
  constructor(id, url) {
    this.id = id;
    this.url = url;
    __publicField(this, "itemsPromise");
    __publicField(this, "itemLoader", new import_dataloader.default(async (pointers) => {
      const ranges = pointers.map((pointer) => {
        const pointerModel = DatabaseItemPointerModel.fromString(pointer);
        return { from: pointerModel.offset, to: pointerModel.offset + pointerModel.length };
      });
      const rangeBytes = await rangeRequest(this.url, ranges);
      return rangeBytes.map((bytes, index) => {
        const reader = new BufferReader(bytes);
        const itemModel = DatabaseItemModel.read(reader);
        const pointer = pointers[index];
        assert(pointer, "Missing pointer");
        return {
          pointer,
          data: itemModel.getData()
        };
      });
    }));
  }
  scanItems() {
    this.itemsPromise ??= fetchWithRetries(this.url).then(async (response) => {
      if (!response.ok) {
        throw new Error(\`Request failed: \${response.status} \${response.statusText}\`);
      }
      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const reader = new BufferReader(bytes);
      const items = [];
      const itemCount = reader.readUint32();
      for (let i = 0; i < itemCount; i++) {
        const offset = reader.getOffset();
        const itemModel = DatabaseItemModel.read(reader);
        const length = reader.getOffset() - offset;
        const pointerModel = new DatabaseItemPointerModel(this.id, offset, length);
        const pointer = pointerModel.toString();
