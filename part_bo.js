    this.offset += size;
  }
  writeUint64(value) {
    assertRange(value, MIN_VALUE.Uint64, MAX_VALUE.Uint64, "Uint64");
    const bigint = BigInt(value);
    this.writeBigUint64(bigint);
  }
  writeBigUint64(value) {
    assertRange(value, MIN_VALUE.BigUint64, MAX_VALUE.BigUint64, "BigUint64");
    const size = BYTE_LENGTH.BigUint64;
    this.ensureLength(size);
    this.view.setBigUint64(this.offset, value);
    this.offset += size;
  }
  writeInt8(value) {
    assertRange(value, MIN_VALUE.Int8, MAX_VALUE.Int8, "Int8");
    const size = BYTE_LENGTH.Int8;
    this.ensureLength(size);
    this.view.setInt8(this.offset, value);
    this.offset += size;
  }
  writeInt16(value) {
    assertRange(value, MIN_VALUE.Int16, MAX_VALUE.Int16, "Int16");
    const size = BYTE_LENGTH.Int16;
    this.ensureLength(size);
    this.view.setInt16(this.offset, value);
    this.offset += size;
  }
  writeInt32(value) {
    assertRange(value, MIN_VALUE.Int32, MAX_VALUE.Int32, "Int32");
    const size = BYTE_LENGTH.Int32;
    this.ensureLength(size);
    this.view.setInt32(this.offset, value);
    this.offset += size;
  }
  writeInt64(value) {
    assertRange(value, MIN_VALUE.Int64, MAX_VALUE.Int64, "Int64");
    const bigint = BigInt(value);
    this.writeBigInt64(bigint);
  }
  writeBigInt64(value) {
    assertRange(value, MIN_VALUE.BigInt64, MAX_VALUE.BigInt64, "BigInt64");
    const size = BYTE_LENGTH.BigInt64;
    this.ensureLength(size);
    this.view.setBigInt64(this.offset, value);
    this.offset += size;
  }
  writeFloat32(value) {
    const size = BYTE_LENGTH.Float32;
    this.ensureLength(size);
    this.view.setFloat32(this.offset, value);
    this.offset += size;
  }
  writeFloat64(value) {
    const size = BYTE_LENGTH.Float64;
    this.ensureLength(size);
    this.view.setFloat64(this.offset, value);
    this.offset += size;
  }
  writeBytes(value) {
    const size = value.length;
    this.ensureLength(size);
    this.bytes.set(value, this.offset);
    this.offset += size;
  }
  encodeString(value) {
    const cached = this.encodedStrings.get(value);
    if (cached) return cached;
    const bytes = this.encoder.encode(value);
    this.encodedStrings.set(value, bytes);
    return bytes;
  }
  writeString(value) {
    const bytes = this.encodeString(value);
    const size = bytes.length;
    this.writeUint32(size);
    this.writeBytes(bytes);
  }
  writeJson(value) {
    const json = JSON.stringify(value);
    this.writeString(json);
  }
};

// src/utils/typeChecks.ts
function isNumber(value) {
  return Number.isFinite(value);
}
function isNull(value) {
  return value === null;
}

// src/code-generation/components/cms/bundled/models/DatabaseItemPointerModel.ts
var DatabaseItemPointerModel = class _DatabaseItemPointerModel {
  constructor(chunkId, offset, length) {
    this.chunkId = chunkId;
    this.offset = offset;
    this.length = length;
  }
  static fromString(value) {
