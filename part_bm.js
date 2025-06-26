  }
  ensureLength(requiredBytes) {
    const oldLength = this.bytes.length;
    if (this.offset + requiredBytes <= oldLength) return;
    throw new Error("Reading out of bounds");
  }
  readUint8() {
    const size = BYTE_LENGTH.Uint8;
    this.ensureLength(size);
    const value = this.view.getUint8(this.offset);
    this.offset += size;
    return value;
  }
  readUint16() {
    const size = BYTE_LENGTH.Uint16;
    this.ensureLength(size);
    const value = this.view.getUint16(this.offset);
    this.offset += size;
    return value;
  }
  readUint32() {
    const size = BYTE_LENGTH.Uint32;
    this.ensureLength(size);
    const value = this.view.getUint32(this.offset);
    this.offset += size;
    return value;
  }
  readUint64() {
    const bigint = this.readBigUint64();
    return Number(bigint);
  }
  readBigUint64() {
    const size = BYTE_LENGTH.BigUint64;
    this.ensureLength(size);
    const value = this.view.getBigUint64(this.offset);
    this.offset += size;
    return value;
  }
  readInt8() {
    const size = BYTE_LENGTH.Int8;
    this.ensureLength(size);
    const value = this.view.getInt8(this.offset);
    this.offset += size;
    return value;
  }
  readInt16() {
    const size = BYTE_LENGTH.Int16;
    this.ensureLength(size);
    const value = this.view.getInt16(this.offset);
    this.offset += size;
    return value;
  }
  readInt32() {
    const size = BYTE_LENGTH.Int32;
    this.ensureLength(size);
    const value = this.view.getInt32(this.offset);
    this.offset += size;
    return value;
  }
  readInt64() {
    const bigint = this.readBigInt64();
    return Number(bigint);
  }
  readBigInt64() {
    const size = BYTE_LENGTH.BigInt64;
    this.ensureLength(size);
    const value = this.view.getBigInt64(this.offset);
    this.offset += size;
    return value;
  }
  readFloat32() {
    const size = BYTE_LENGTH.Float32;
    this.ensureLength(size);
    const value = this.view.getFloat32(this.offset);
    this.offset += size;
    return value;
  }
  readFloat64() {
    const size = BYTE_LENGTH.Float64;
    this.ensureLength(size);
    const value = this.view.getFloat64(this.offset);
    this.offset += size;
    return value;
  }
  readBytes(length) {
    const start = this.offset;
    const end = start + length;
    const value = this.bytes.subarray(start, end);
    this.offset = end;
    return value;
  }
  readString() {
    const length = this.readUint32();
    const bytes = this.readBytes(length);
    return this.decoder.decode(bytes);
  }
  readJson() {
    const string = this.readString();
    return JSON.parse(string);
  }
