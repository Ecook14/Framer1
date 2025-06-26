function readLink(reader) {
  return {
    type: ControlType.Link,
    value: reader.readJson()
  };
}
function writeLink(writer, value) {
  writer.writeJson(value.value);
}
function compareLink(left, right) {
  const leftEncoded = JSON.stringify(left.value);
  const rightEncoded = JSON.stringify(right.value);
  if (leftEncoded < rightEncoded) return -1;
  if (leftEncoded > rightEncoded) return 1;
  return 0;
}
function readNumber(reader) {
  return {
    type: ControlType.Number,
    value: reader.readFloat64()
  };
}
function writeNumber(writer, value) {
  writer.writeFloat64(value.value);
}
function compareNumber(left, right) {
  if (left.value < right.value) return -1;
  if (left.value > right.value) return 1;
  return 0;
}
function readObject(reader) {
  const length = reader.readUint16();
  const result = {};
  for (let i = 0; i < length; i++) {
    const key = reader.readString();
    result[key] = DatabaseValueModel.read(reader);
  }
  return {
    type: ControlType.Object,
    value: result
  };
}
function writeObject(writer, value) {
  const entries = Object.entries(value.value);
  writer.writeUint16(entries.length);
  for (const [key, item] of entries) {
    writer.writeString(key);
    DatabaseValueModel.write(writer, item);
  }
}
function compareObject(left, right, collation) {
  const leftKeys = Object.keys(left.value).sort();
  const rightKeys = Object.keys(right.value).sort();
  if (leftKeys.length < rightKeys.length) return -1;
  if (leftKeys.length > rightKeys.length) return 1;
  for (let i = 0; i < leftKeys.length; i++) {
    const leftKey = leftKeys[i];
    const rightKey = rightKeys[i];
    if (leftKey < rightKey) return -1;
    if (leftKey > rightKey) return 1;
    const leftValue = left.value[leftKey] ?? null;
    const rightValue = right.value[rightKey] ?? null;
    const result = DatabaseValueModel.compare(leftValue, rightValue, collation);
    if (result !== 0) return result;
  }
  return 0;
}
function readResponsiveImage(reader) {
  return {
    type: ControlType.ResponsiveImage,
    value: reader.readJson()
  };
}
function writeResponsiveImage(writer, value) {
  writer.writeJson(value.value);
}
function compareResponsiveImage(left, right) {
  const leftEncoded = JSON.stringify(left.value);
  const rightEncoded = JSON.stringify(right.value);
  if (leftEncoded < rightEncoded) return -1;
  if (leftEncoded > rightEncoded) return 1;
  return 0;
}
function readRichText(reader) {
  return {
    type: ControlType.RichText,
    value: reader.readUint32()
  };
}
function writeRichText(writer, value) {
  writer.writeUint32(value.value);
}
function compareRichText(left, right) {
  const leftValue = left.value;
  const rightValue = right.value;
  if (leftValue < rightValue) return -1;
  if (leftValue > rightValue) return 1;
  return 0;
}
function readString(reader) {
