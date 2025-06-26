}
var lr = Xr;
Xr.default = Xr;
let { isClean: Rt, my: zu } = ut, Wu = As, Vu = zn, Gu = lr;
function Kr(s, e) {
  let t = new s.constructor();
  for (let r in s) {
    if (!Object.prototype.hasOwnProperty.call(s, r) || r === "proxyCache") continue;
    let i = s[r], n = typeof i;
    r === "parent" && n === "object" ? e && (t[r] = e) : r === "source" ? t[r] = i : Array.isArray(i) ? t[r] = i.map((o) => Kr(o, t)) : (n === "object" && i !== null && (i = Kr(i)), t[r] = i);
  }
  return t;
}
let Qr = class {
  constructor(e = {}) {
    this.raws = {}, this[Rt] = !1, this[zu] = !0;
    for (let t in e)
      if (t === "nodes") {
        this.nodes = [];
        for (let r of e[t])
          typeof r.clone == "function" ? this.append(r.clone()) : this.append(r);
      } else
        this[t] = e[t];
  }
  addToError(e) {
    if (e.postcssNode = this, e.stack && this.source && /\n\s{4}at /.test(e.stack)) {
      let t = this.source;
      e.stack = e.stack.replace(
        /\n\s{4}at /,
        `$&${t.input.from}:${t.start.line}:${t.start.column}$&`
      );
    }
    return e;
  }
  after(e) {
    return this.parent.insertAfter(this, e), this;
  }
  assign(e = {}) {
    for (let t in e)
      this[t] = e[t];
    return this;
  }
  before(e) {
    return this.parent.insertBefore(this, e), this;
  }
  cleanRaws(e) {
    delete this.raws.before, delete this.raws.after, e || delete this.raws.between;
  }
  clone(e = {}) {
    let t = Kr(this);
    for (let r in e)
      t[r] = e[r];
    return t;
  }
  cloneAfter(e = {}) {
    let t = this.clone(e);
    return this.parent.insertAfter(this, t), t;
  }
  cloneBefore(e = {}) {
    let t = this.clone(e);
    return this.parent.insertBefore(this, t), t;
  }
  error(e, t = {}) {
    if (this.source) {
      let { end: r, start: i } = this.rangeBy(t);
      return this.source.input.error(
        e,
        { column: i.column, line: i.line },
        { column: r.column, line: r.line },
        t
      );
    }
    return new Wu(e);
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf" ? e : t === "root" ? () => e.root().toProxy() : e[t];
      },
      set(e, t, r) {
        return e[t] === r || (e[t] = r, (t === "prop" || t === "value" || t === "name" || t === "params" || t === "important" || /* c8 ignore next */
        t === "text") && e.markDirty()), !0;
      }
    };
  }
  markDirty() {
    if (this[Rt]) {
      this[Rt] = !1;
      let e = this;
      for (; e = e.parent; )
        e[Rt] = !1;
    }
  }
  next() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e + 1];
  }
  positionBy(e, t) {
    let r = this.source.start;
