      default:
        assertNever(type);
    }
  }
  DatabaseValueModel2.read = read;
  function write(writer, value) {
    const type = getValueType(value);
    writer.writeUint8(type);
    if (isNull(value)) return;
    switch (value.type) {
      case ControlType.Array:
        return writeArray(writer, value);
      case ControlType.Boolean:
        return writeBoolean(writer, value);
      case ControlType.Color:
        return writeColor(writer, value);
      case ControlType.Date:
        return writeDate(writer, value);
      case ControlType.Enum:
        return writeEnum(writer, value);
      case ControlType.File:
        return writeFile(writer, value);
      case ControlType.Link:
        return writeLink(writer, value);
      case ControlType.Number:
        return writeNumber(writer, value);
      case ControlType.Object:
        return writeObject(writer, value);
      case ControlType.ResponsiveImage:
        return writeResponsiveImage(writer, value);
      case ControlType.RichText:
        return writeRichText(writer, value);
      case ControlType.VectorSetItem:
        return writeVectorSetItem(writer, value);
      case ControlType.String:
        return writeString(writer, value);
      default:
        assertNever(value);
    }
  }
  DatabaseValueModel2.write = write;
  function compare(left, right, collation) {
    const leftType = getValueType(left);
    const rightType = getValueType(right);
    if (leftType < rightType) return -1;
    if (leftType > rightType) return 1;
    if (isNull(left) || isNull(right)) return 0;
    switch (left.type) {
      case ControlType.Array:
        assert(right.type === ControlType.Array);
        return compareArray(left, right, collation);
      case ControlType.Boolean:
        assert(right.type === ControlType.Boolean);
        return compareBoolean(left, right);
      case ControlType.Color:
        assert(right.type === ControlType.Color);
        return compareColor(left, right);
      case ControlType.Date:
        assert(right.type === ControlType.Date);
        return compareDate(left, right);
      case ControlType.Enum:
        assert(right.type === ControlType.Enum);
        return compareEnum(left, right);
      case ControlType.File:
        assert(right.type === ControlType.File);
        return compareFile(left, right);
      case ControlType.Link:
        assert(right.type === ControlType.Link);
        return compareLink(left, right);
      case ControlType.Number:
        assert(right.type === ControlType.Number);
        return compareNumber(left, right);
      case ControlType.Object:
        assert(right.type === ControlType.Object);
        return compareObject(left, right, collation);
      case ControlType.ResponsiveImage:
        assert(right.type === ControlType.ResponsiveImage);
        return compareResponsiveImage(left, right);
      case ControlType.RichText:
        assert(right.type === ControlType.RichText);
        return compareRichText(left, right);
      case ControlType.VectorSetItem:
        assert(right.type === ControlType.VectorSetItem);
        return compareVectorSetItem(left, right);
      case ControlType.String:
        assert(right.type === ControlType.String);
        return compareString(left, right, collation);
      default:
        assertNever(left);
    }
  }
  DatabaseValueModel2.compare = compare;
})(DatabaseValueModel || (DatabaseValueModel = {}));
function readArray(reader) {
  const length = reader.readUint16();
  const value = [];
  for (let i = 0; i < length; i++) {
    const item = DatabaseValueModel.read(reader);
    value.push(item);
  }
