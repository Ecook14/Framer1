  }
  get root() {
    return this.sync().root;
  }
  get [Symbol.toStringTag]() {
    return "LazyResult";
  }
};
_e.registerPostcss = (s) => {
  as = s;
};
var go = _e;
_e.default = _e;
Vc.registerLazyResult(_e);
Bc.registerLazyResult(_e);
let Yc = Yn, Zc = lr, Jc = no, Xc = Ts;
const Kc = Ns;
let ls = class {
  constructor(e, t, r) {
    t = t.toString(), this.stringified = !1, this._processor = e, this._css = t, this._opts = r, this._map = void 0;
    let i, n = Zc;
    this.result = new Kc(this._processor, i, this._opts), this.result.css = t;
    let o = this;
    Object.defineProperty(this.result, "root", {
      get() {
        return o.root;
      }
    });
    let l = new Yc(n, i, this._opts, t);
    if (l.isMap()) {
      let [a, u] = l.generate();
      a && (this.result.css = a), u && (this.result.map = u);
    } else
      l.clearAnnotation(), this.result.css = l.css;
  }
  async() {
    return this.error ? Promise.reject(this.error) : Promise.resolve(this.result);
  }
  catch(e) {
    return this.async().catch(e);
  }
  finally(e) {
    return this.async().then(e, e);
  }
  sync() {
    if (this.error) throw this.error;
    return this.result;
  }
  then(e, t) {
    return process.env.NODE_ENV !== "production" && ("from" in this._opts || Jc(
      "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
    )), this.async().then(e, t);
  }
  toString() {
    return this._css;
  }
  warnings() {
    return [];
  }
  get content() {
    return this.result.css;
  }
  get css() {
    return this.result.css;
  }
  get map() {
    return this.result.map;
  }
  get messages() {
    return [];
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    if (this._root)
      return this._root;
    let e, t = Xc;
    try {
      e = t(this._css, this._opts);
    } catch (r) {
      this.error = r;
    }
    if (this.error)
      throw this.error;
    return this._root = e, e;
  }
  get [Symbol.toStringTag]() {
    return "NoWorkResult";
  }
};
var Qc = ls;
ls.default = ls;
let qc = Qc, eh = go, th = $s, rh = ct, it = class {
  constructor(e = []) {
    this.version = "8.4.38", this.plugins = this.normalize(e);
  }
