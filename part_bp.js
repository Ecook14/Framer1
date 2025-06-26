    const [chunkId, offset, length] = value.split("/").map(Number);
    assert(isNumber(chunkId), "Invalid chunkId");
    assert(isNumber(offset), "Invalid offset");
    assert(isNumber(length), "Invalid length");
    return new _DatabaseItemPointerModel(chunkId, offset, length);
  }
  toString() {
    return \`\${this.chunkId}/\${this.offset}/\${this.length}\`;
  }
  static read(reader) {
    const chunkId = reader.readUint16();
    const offset = reader.readUint32();
    const length = reader.readUint32();
    return new _DatabaseItemPointerModel(chunkId, offset, length);
  }
  write(writer) {
    writer.writeUint16(this.chunkId);
    writer.writeUint32(this.offset);
    writer.writeUint32(this.length);
  }
  compare(other) {
    if (this.chunkId < other.chunkId) return -1;
    if (this.chunkId > other.chunkId) return 1;
    if (this.offset < other.offset) return -1;
    if (this.offset > other.offset) return 1;
    assert(this.length === other.length);
    return 0;
  }
};

// src/code-generation/components/cms/bundled/models/DatabaseValueModel.ts
import { ControlType } from "framer";
function getValueType(value) {
  if (isNull(value)) {
    return 0 /* Null */;
  }
  switch (value.type) {
    case ControlType.Array:
      return 1 /* Array */;
    case ControlType.Boolean:
      return 2 /* Boolean */;
    case ControlType.Color:
      return 3 /* Color */;
    case ControlType.Date:
      return 4 /* Date */;
    case ControlType.Enum:
      return 5 /* Enum */;
    case ControlType.File:
      return 6 /* File */;
    case ControlType.ResponsiveImage:
      return 10 /* ResponsiveImage */;
    case ControlType.Link:
      return 7 /* Link */;
    case ControlType.Number:
      return 8 /* Number */;
    case ControlType.Object:
      return 9 /* Object */;
    case ControlType.RichText:
      return 11 /* RichText */;
    case ControlType.String:
      return 12 /* String */;
    case ControlType.VectorSetItem:
      return 13 /* VectorSetItem */;
    default:
      assertNever(value);
  }
}
var DatabaseValueModel;
((DatabaseValueModel2) => {
  function read(reader) {
    const type = reader.readUint8();
    switch (type) {
      case 0 /* Null */:
        return null;
      case 1 /* Array */:
        return readArray(reader);
      case 2 /* Boolean */:
        return readBoolean(reader);
      case 3 /* Color */:
        return readColor(reader);
      case 4 /* Date */:
        return readDate(reader);
      case 5 /* Enum */:
        return readEnum(reader);
      case 6 /* File */:
        return readFile(reader);
      case 7 /* Link */:
        return readLink(reader);
      case 8 /* Number */:
        return readNumber(reader);
      case 9 /* Object */:
        return readObject(reader);
      case 10 /* ResponsiveImage */:
        return readResponsiveImage(reader);
      case 11 /* RichText */:
        return readRichText(reader);
      case 12 /* String */:
        return readString(reader);
      case 13 /* VectorSetItem */:
        return readVectorSetItem(reader);
