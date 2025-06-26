        for (var i = 0; i < batch.cacheHits.length; i++) {
          batch.cacheHits[i]();
        }
      }
    }
    function getValidMaxBatchSize(options) {
      var shouldBatch = !options || options.batch !== false;
      if (!shouldBatch) {
        return 1;
      }
      var maxBatchSize = options && options.maxBatchSize;
      if (maxBatchSize === void 0) {
        return Infinity;
      }
      if (typeof maxBatchSize !== "number" || maxBatchSize < 1) {
        throw new TypeError("maxBatchSize must be a positive number: " + maxBatchSize);
      }
      return maxBatchSize;
    }
    function getValidBatchScheduleFn(options) {
      var batchScheduleFn = options && options.batchScheduleFn;
      if (batchScheduleFn === void 0) {
        return enqueuePostPromiseJob;
      }
      if (typeof batchScheduleFn !== "function") {
        throw new TypeError("batchScheduleFn must be a function: " + batchScheduleFn);
      }
      return batchScheduleFn;
    }
    function getValidCacheKeyFn(options) {
      var cacheKeyFn = options && options.cacheKeyFn;
      if (cacheKeyFn === void 0) {
        return function(key) {
          return key;
        };
      }
      if (typeof cacheKeyFn !== "function") {
        throw new TypeError("cacheKeyFn must be a function: " + cacheKeyFn);
      }
      return cacheKeyFn;
    }
    function getValidCacheMap(options) {
      var shouldCache = !options || options.cache !== false;
      if (!shouldCache) {
        return null;
      }
      var cacheMap = options && options.cacheMap;
      if (cacheMap === void 0) {
        return /* @__PURE__ */ new Map();
      }
      if (cacheMap !== null) {
        var cacheFunctions = ["get", "set", "delete", "clear"];
        var missingFunctions = cacheFunctions.filter(function(fnName) {
          return cacheMap && typeof cacheMap[fnName] !== "function";
        });
        if (missingFunctions.length !== 0) {
          throw new TypeError("Custom cacheMap missing methods: " + missingFunctions.join(", "));
        }
      }
      return cacheMap;
    }
    function getValidName(options) {
      if (options && options.name) {
        return options.name;
      }
      return null;
    }
    function isArrayLike(x) {
      return typeof x === "object" && x !== null && typeof x.length === "number" && (x.length === 0 || x.length > 0 && Object.prototype.hasOwnProperty.call(x, x.length - 1));
    }
    module.exports = DataLoader2;
  }
});

// src/code-generation/components/cms/bundled/DatabaseCollection.ts?bundle
var import_dataloader = __toESM(require_dataloader());

// src/code-generation/components/cms/bundled/BufferReader.ts
var BYTE_LENGTH = {
  Uint8: 1,
  Uint16: 2,
  Uint32: 4,
  BigUint64: 8,
  Int8: 1,
  Int16: 2,
  Int32: 4,
  BigInt64: 8,
  Float32: 4,
  Float64: 8
};
var BufferReader = class {
  constructor(bytes) {
    this.bytes = bytes;
    __publicField(this, "offset", 0);
    __publicField(this, "view");
    __publicField(this, "decoder", new TextDecoder());
    this.view = getDataView(this.bytes);
  }
  getOffset() {
    return this.offset;
