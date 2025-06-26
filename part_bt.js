  return {
    type: ControlType.String,
    value: reader.readString()
  };
}
function writeString(writer, value) {
  writer.writeString(value.value);
}
function compareString(left, right, collation) {
  let leftValue = left.value;
  let rightValue = right.value;
  if (collation.type === 0 /* CaseInsensitive */) {
    leftValue = left.value.toLowerCase();
    rightValue = right.value.toLowerCase();
  }
  if (leftValue < rightValue) return -1;
  if (leftValue > rightValue) return 1;
  return 0;
}
function readVectorSetItem(reader) {
  return {
    type: ControlType.VectorSetItem,
    value: reader.readUint32()
  };
}
function writeVectorSetItem(writer, value) {
  writer.writeUint32(value.value);
}
function compareVectorSetItem(left, right) {
  const leftValue = left.value;
  const rightValue = right.value;
  if (leftValue < rightValue) return -1;
  if (leftValue > rightValue) return 1;
  return 0;
}

// src/code-generation/components/cms/bundled/models/DatabaseDictionaryIndexModel.ts
var DatabaseDictionaryIndexModel = class _DatabaseDictionaryIndexModel {
  constructor(fieldNames, options) {
    this.fieldNames = fieldNames;
    this.options = options;
    __publicField(this, "entries", []);
  }
  sortEntries() {
    this.entries.sort((left, right) => {
      for (let i = 0; i < this.fieldNames.length; i++) {
        const leftValue = left.values[i];
        const rightValue = right.values[i];
        const result = DatabaseValueModel.compare(leftValue, rightValue, this.options.collation);
        if (result !== 0) return result;
      }
      return left.pointer.compare(right.pointer);
    });
  }
  static deserialize(bytes) {
    const reader = new BufferReader(bytes);
    const collation = reader.readJson();
    const fieldCount = reader.readUint8();
    const fieldNames = [];
    for (let i = 0; i < fieldCount; i++) {
      const fieldName = reader.readString();
      fieldNames.push(fieldName);
    }
    const index = new _DatabaseDictionaryIndexModel(fieldNames, {
      collation
    });
    const entryCount = reader.readUint32();
    for (let i = 0; i < entryCount; i++) {
      const values = [];
      for (let j = 0; j < fieldCount; j++) {
        const fieldValue = DatabaseValueModel.read(reader);
        values.push(fieldValue);
      }
      const pointer = DatabaseItemPointerModel.read(reader);
      index.entries.push({ values, pointer });
    }
    return index;
  }
  serialize() {
    const writer = new BufferWriter();
    writer.writeJson(this.options.collation);
    writer.writeUint8(this.fieldNames.length);
    for (const fieldName of this.fieldNames) {
      writer.writeString(fieldName);
    }
    this.sortEntries();
    writer.writeUint32(this.entries.length);
    for (const entry of this.entries) {
      const { values, pointer } = entry;
      for (const value of values) {
        DatabaseValueModel.write(writer, value);
      }
      pointer.write(writer);
    }
    return writer.subarray();
  }
  addItem(item, pointer) {
    const values = this.fieldNames.map((fieldName) => {
      return item.getField(fieldName) ?? null;
    });
