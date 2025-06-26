};
fe.registerRoot = (s) => {
  gn = s;
};
var Ie = fe;
fe.default = fe;
fe.rebuild = (s) => {
  s.type === "atrule" ? Object.setPrototypeOf(s, Ss.prototype) : s.type === "rule" ? Object.setPrototypeOf(s, ws.prototype) : s.type === "decl" ? Object.setPrototypeOf(s, pn.prototype) : s.type === "comment" ? Object.setPrototypeOf(s, dn.prototype) : s.type === "root" && Object.setPrototypeOf(s, gn.prototype), s[fn] = !0, s.nodes && s.nodes.forEach((e) => {
    fe.rebuild(e);
  });
};
let wl = Ie, bn, Cn, Qe = class extends wl {
  constructor(e) {
    super({ type: "document", ...e }), this.nodes || (this.nodes = []);
  }
  toResult(e = {}) {
    return new bn(new Cn(), this, e).stringify();
  }
};
Qe.registerLazyResult = (s) => {
  bn = s;
};
Qe.registerProcessor = (s) => {
  Cn = s;
};
var bs = Qe;
Qe.default = Qe;
let ii = {};
var vn = function(e) {
  ii[e] || (ii[e] = !0, typeof console < "u" && console.warn && console.warn(e));
};
let Vr = class {
  constructor(e, t = {}) {
    if (this.type = "warning", this.text = e, t.node && t.node.source) {
      let r = t.node.rangeBy(t);
      this.line = r.start.line, this.column = r.start.column, this.endLine = r.end.line, this.endColumn = r.end.column;
    }
    for (let r in t) this[r] = t[r];
  }
  toString() {
    return this.node ? this.node.error(this.text, {
      index: this.index,
      plugin: this.plugin,
      word: this.word
    }).message : this.plugin ? this.plugin + ": " + this.text : this.text;
  }
};
var In = Vr;
Vr.default = Vr;
let Sl = In, Gr = class {
  constructor(e, t, r) {
    this.processor = e, this.messages = [], this.root = t, this.opts = r, this.css = void 0, this.map = void 0;
  }
  toString() {
    return this.css;
  }
  warn(e, t = {}) {
    t.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (t.plugin = this.lastPlugin.postcssPlugin);
    let r = new Sl(e, t);
    return this.messages.push(r), r;
  }
  warnings() {
    return this.messages.filter((e) => e.type === "warning");
  }
  get content() {
    return this.css;
  }
};
var Cs = Gr;
Gr.default = Gr;
const Ir = 39, ni = 34, wt = 92, oi = 47, St = 10, We = 32, bt = 12, Ct = 9, vt = 13, bl = 91, Cl = 93, vl = 40, Il = 41, xl = 123, Rl = 125, Ol = 59, Al = 42, El = 58, Ml = 64, It = /[\t\n\f\r "#'()/;[\\\]{}]/g, xt = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, $l = /.[\r\n"'(/\\]/, ai = /[\da-f]/i;
var Nl = function(e, t = {}) {
  let r = e.css.valueOf(), i = t.ignoreErrors, n, o, l, a, u, c, h, d, m, g, p = r.length, f = 0, S = [], b = [];
  function y() {
    return f;
  }
  function C(_) {
    throw e.error("Unclosed " + _, f);
  }
  function $() {
    return b.length === 0 && f >= p;
  }
  function P(_) {
    if (b.length) return b.pop();
    if (f >= p) return;
    let W = _ ? _.ignoreUnclosed : !1;
    switch (n = r.charCodeAt(f), n) {
      case St:
      case We:
      case Ct:
      case vt:
      case bt: {
        o = f;
        do
          o += 1, n = r.charCodeAt(o);
        while (n === We || n === St || n === Ct || n === vt || n === bt);
        g = ["space", r.slice(f, o)], f = o - 1;
        break;
      }
      case bl:
