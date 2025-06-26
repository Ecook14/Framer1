    return;
  const r = s.constructor.name, i = hf(t, r);
  let n = i.indexOf(s);
  return n === -1 && (n = i.length, i.push(s)), n;
};
function Wt(s, e, t) {
  if (s instanceof Array)
    return s.map((r) => Wt(r, e, t));
  if (s === null)
    return s;
  if (s instanceof Float32Array || s instanceof Float64Array || s instanceof Int32Array || s instanceof Uint32Array || s instanceof Uint8Array || s instanceof Uint16Array || s instanceof Int16Array || s instanceof Int8Array || s instanceof Uint8ClampedArray)
    return {
      rr_type: s.constructor.name,
      args: [Object.values(s)]
    };
  if (
    // SharedArrayBuffer disabled on most browsers due to spectre.
    // More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/SharedArrayBuffer
    // value instanceof SharedArrayBuffer ||
    s instanceof ArrayBuffer
  ) {
    const r = s.constructor.name, i = cf(s);
    return {
      rr_type: r,
      base64: i
    };
  } else {
    if (s instanceof DataView)
      return {
        rr_type: s.constructor.name,
        args: [
          Wt(s.buffer, e, t),
          s.byteOffset,
          s.byteLength
        ]
      };
    if (s instanceof HTMLImageElement) {
      const r = s.constructor.name, { src: i } = s;
      return {
        rr_type: r,
        src: i
      };
    } else if (s instanceof HTMLCanvasElement) {
      const r = "HTMLImageElement", i = s.toDataURL();
      return {
        rr_type: r,
        src: i
      };
    } else {
      if (s instanceof ImageData)
        return {
          rr_type: s.constructor.name,
          args: [Wt(s.data, e, t), s.width, s.height]
        };
      if (zo(s, e) || typeof s == "object") {
        const r = s.constructor.name, i = Uo(s, e, t);
        return {
          rr_type: r,
          index: i
        };
      }
    }
  }
  return s;
}
const Bo = (s, e, t) => s.map((r) => Wt(r, e, t)), zo = (s, e) => !![
  "WebGLActiveInfo",
  "WebGLBuffer",
  "WebGLFramebuffer",
  "WebGLProgram",
  "WebGLRenderbuffer",
  "WebGLShader",
  "WebGLShaderPrecisionFormat",
  "WebGLTexture",
  "WebGLUniformLocation",
  "WebGLVertexArrayObject",
  // In old Chrome versions, value won't be an instanceof WebGLVertexArrayObject.
  "WebGLVertexArrayObjectOES"
].filter(
  (i) => typeof e[i] == "function"
).find(
  (i) => s instanceof e[i]
);
function ff(s, e, t, r) {
  const i = [], n = Object.getOwnPropertyNames(
    e.CanvasRenderingContext2D.prototype
  );
  for (const o of n)
    try {
      if (typeof e.CanvasRenderingContext2D.prototype[o] != "function")
        continue;
      const l = Ue(
        e.CanvasRenderingContext2D.prototype,
        o,
        function(a) {
          return function(...u) {
            return J(this.canvas, t, r, !0) || setTimeout(() => {
              const c = Bo(u, e, this);
              s(this.canvas, {
                type: Le["2D"],
