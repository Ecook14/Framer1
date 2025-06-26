  return {
    type: ControlType.Array,
    value
  };
}
function writeArray(writer, value) {
  writer.writeUint16(value.value.length);
  for (const item of value.value) {
    DatabaseValueModel.write(writer, item);
  }
}
function compareArray(left, right, collation) {
  const leftLength = left.value.length;
  const rightLength = right.value.length;
  if (leftLength < rightLength) return -1;
  if (leftLength > rightLength) return 1;
  for (let i = 0; i < leftLength; i++) {
    const leftItem = left.value[i];
    const rightItem = right.value[i];
    const result = DatabaseValueModel.compare(leftItem, rightItem, collation);
    if (result !== 0) return result;
  }
  return 0;
}
function readBoolean(reader) {
  return {
    type: ControlType.Boolean,
    value: reader.readUint8() !== 0
  };
}
function writeBoolean(writer, value) {
  writer.writeUint8(value.value ? 1 : 0);
}
function compareBoolean(left, right) {
  if (left.value < right.value) return -1;
  if (left.value > right.value) return 1;
  return 0;
}
function readColor(reader) {
  return {
    type: ControlType.Color,
    value: reader.readString()
  };
}
function writeColor(writer, value) {
  writer.writeString(value.value);
}
function compareColor(left, right) {
  if (left.value < right.value) return -1;
  if (left.value > right.value) return 1;
  return 0;
}
function readDate(reader) {
  const timestamp = reader.readInt64();
  const date = new Date(timestamp);
  return {
    type: ControlType.Date,
    value: date.toISOString()
  };
}
function writeDate(writer, value) {
  const date = new Date(value.value);
  const timestamp = date.getTime();
  writer.writeInt64(timestamp);
}
function compareDate(left, right) {
  const leftDate = new Date(left.value);
  const rightDate = new Date(right.value);
  if (leftDate < rightDate) return -1;
  if (leftDate > rightDate) return 1;
  return 0;
}
function readEnum(reader) {
  return {
    type: ControlType.Enum,
    value: reader.readString()
  };
}
function writeEnum(writer, value) {
  writer.writeString(value.value);
}
function compareEnum(left, right) {
  if (left.value < right.value) return -1;
  if (left.value > right.value) return 1;
  return 0;
}
function readFile(reader) {
  return {
    type: ControlType.File,
    value: reader.readString()
  };
}
function writeFile(writer, value) {
  writer.writeString(value.value);
}
function compareFile(left, right) {
  if (left.value < right.value) return -1;
  if (left.value > right.value) return 1;
  return 0;
}
