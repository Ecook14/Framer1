};
function getDataView(bytes) {
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

// src/code-generation/components/cms/bundled/DatabaseDictionaryIndex.ts
import { ControlType as ControlType2 } from "framer";

// ../../library/src/utils/utils.ts
var isWindow = typeof window !== "undefined";
var supportsRequestIdleCallback = isWindow && typeof window.requestIdleCallback === "function";

// src/code-generation/components/cms/bundled/assert.ts
function assert(condition, ...msg) {
  if (condition) return;
  throw Error("Assertion Error" + (msg.length > 0 ? ": " + msg.join(" ") : ""));
}
function assertNever(condition) {
  throw new Error(\`Unexpected value: \${condition}\`);
}

// src/code-generation/components/cms/bundled/BufferWriter.ts
var INITIAL_BUFFER_SIZE = 1024;
var GROWTH_FACTOR = 1.5;
var maxUnsignedNumber = (bits) => 2 ** bits - 1;
var minSignedNumber = (bits) => -(2 ** (bits - 1));
var maxSignedNumber = (bits) => 2 ** (bits - 1) - 1;
var MIN_VALUE = {
  Uint8: 0,
  Uint16: 0,
  Uint32: 0,
  Uint64: 0,
  BigUint64: 0,
  Int8: minSignedNumber(8),
  Int16: minSignedNumber(16),
  Int32: minSignedNumber(32),
  Int64: Number.MIN_SAFE_INTEGER,
  BigInt64: -(BigInt(2) ** BigInt(63))
};
var MAX_VALUE = {
  Uint8: maxUnsignedNumber(8),
  Uint16: maxUnsignedNumber(16),
  Uint32: maxUnsignedNumber(32),
  Uint64: Number.MAX_SAFE_INTEGER,
  BigUint64: BigInt(2) ** BigInt(64) - BigInt(1),
  Int8: maxSignedNumber(8),
  Int16: maxSignedNumber(16),
  Int32: maxSignedNumber(32),
  Int64: Number.MAX_SAFE_INTEGER,
  BigInt64: BigInt(2) ** BigInt(63) - BigInt(1)
};
function assertRange(value, min, max, dataType) {
  assert(value >= min, value, "outside lower bound for", dataType);
  assert(value <= max, value, "outside upper bound for", dataType);
}
var BufferWriter = class {
  constructor() {
    __publicField(this, "offset", 0);
    __publicField(this, "bytes", new Uint8Array(INITIAL_BUFFER_SIZE));
    __publicField(this, "view", getDataView(this.bytes));
    __publicField(this, "encoder", new TextEncoder());
    __publicField(this, "encodedStrings", /* @__PURE__ */ new Map());
  }
  getOffset() {
    return this.offset;
  }
  slice(start = 0, end = this.offset) {
    return this.bytes.slice(start, end);
  }
  subarray(start = 0, end = this.offset) {
    return this.bytes.subarray(start, end);
  }
  ensureLength(requiredBytes) {
    const oldLength = this.bytes.length;
    if (this.offset + requiredBytes <= oldLength) return;
    const newLength = Math.ceil(oldLength * GROWTH_FACTOR) + requiredBytes;
    const newBytes = new Uint8Array(newLength);
    newBytes.set(this.bytes);
    this.bytes = newBytes;
    this.view = getDataView(newBytes);
  }
  writeUint8(value) {
    assertRange(value, MIN_VALUE.Uint8, MAX_VALUE.Uint8, "Uint8");
    const size = BYTE_LENGTH.Uint8;
    this.ensureLength(size);
    this.view.setUint8(this.offset, value);
    this.offset += size;
  }
  writeUint16(value) {
    assertRange(value, MIN_VALUE.Uint16, MAX_VALUE.Uint16, "Uint16");
    const size = BYTE_LENGTH.Uint16;
    this.ensureLength(size);
    this.view.setUint16(this.offset, value);
    this.offset += size;
  }
  writeUint32(value) {
    assertRange(value, MIN_VALUE.Uint32, MAX_VALUE.Uint32, "Uint32");
    const size = BYTE_LENGTH.Uint32;
    this.ensureLength(size);
    this.view.setUint32(this.offset, value);
