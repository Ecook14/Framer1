      _proto.clearAll = function clearAll() {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          cacheMap.clear();
        }
        return this;
      };
      _proto.prime = function prime(key, value) {
        var cacheMap = this._cacheMap;
        if (cacheMap) {
          var cacheKey = this._cacheKeyFn(key);
          if (cacheMap.get(cacheKey) === void 0) {
            var promise;
            if (value instanceof Error) {
              promise = Promise.reject(value);
              promise["catch"](function() {
              });
            } else {
              promise = Promise.resolve(value);
            }
            cacheMap.set(cacheKey, promise);
          }
        }
        return this;
      };
      return DataLoader3;
    }();
    var enqueuePostPromiseJob = typeof process === "object" && typeof process.nextTick === "function" ? function(fn) {
      if (!resolvedPromise) {
        resolvedPromise = Promise.resolve();
      }
      resolvedPromise.then(function() {
        process.nextTick(fn);
      });
    } : typeof setImmediate === "function" ? function(fn) {
      setImmediate(fn);
    } : function(fn) {
      setTimeout(fn);
    };
    var resolvedPromise;
    function getCurrentBatch(loader) {
      var existingBatch = loader._batch;
      if (existingBatch !== null && !existingBatch.hasDispatched && existingBatch.keys.length < loader._maxBatchSize) {
        return existingBatch;
      }
      var newBatch = {
        hasDispatched: false,
        keys: [],
        callbacks: []
      };
      loader._batch = newBatch;
      loader._batchScheduleFn(function() {
        dispatchBatch(loader, newBatch);
      });
      return newBatch;
    }
    function dispatchBatch(loader, batch) {
      batch.hasDispatched = true;
      if (batch.keys.length === 0) {
        resolveCacheHits(batch);
        return;
      }
      var batchPromise;
      try {
        batchPromise = loader._batchLoadFn(batch.keys);
      } catch (e) {
        return failedDispatch(loader, batch, new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function " + ("errored synchronously: " + String(e) + ".")));
      }
      if (!batchPromise || typeof batchPromise.then !== "function") {
        return failedDispatch(loader, batch, new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did " + ("not return a Promise: " + String(batchPromise) + ".")));
      }
      batchPromise.then(function(values) {
        if (!isArrayLike(values)) {
          throw new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did " + ("not return a Promise of an Array: " + String(values) + "."));
        }
        if (values.length !== batch.keys.length) {
          throw new TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys." + ("\\n\\nKeys:\\n" + String(batch.keys)) + ("\\n\\nValues:\\n" + String(values)));
        }
        resolveCacheHits(batch);
        for (var i = 0; i < batch.callbacks.length; i++) {
          var value = values[i];
          if (value instanceof Error) {
            batch.callbacks[i].reject(value);
          } else {
            batch.callbacks[i].resolve(value);
          }
        }
      })["catch"](function(error) {
        failedDispatch(loader, batch, error);
      });
    }
    function failedDispatch(loader, batch, error) {
      resolveCacheHits(batch);
      for (var i = 0; i < batch.keys.length; i++) {
        loader.clear(batch.keys[i]);
        batch.callbacks[i].reject(error);
      }
    }
    function resolveCacheHits(batch) {
      if (batch.cacheHits) {
