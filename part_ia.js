  Es = s;
};
pe.registerAtRule = (s) => {
  Ms = s;
};
pe.registerRoot = (s) => {
  qn = s;
};
var xe = pe;
pe.default = pe;
pe.rebuild = (s) => {
  s.type === "atrule" ? Object.setPrototypeOf(s, Ms.prototype) : s.type === "rule" ? Object.setPrototypeOf(s, Es.prototype) : s.type === "decl" ? Object.setPrototypeOf(s, Xn.prototype) : s.type === "comment" ? Object.setPrototypeOf(s, Kn.prototype) : s.type === "root" && Object.setPrototypeOf(s, qn.prototype), s[Jn] = !0, s.nodes && s.nodes.forEach((e) => {
    pe.rebuild(e);
  });
};
let cc = xe, so, io, rt = class extends cc {
  constructor(e) {
    super({ type: "document", ...e }), this.nodes || (this.nodes = []);
  }
  toResult(e = {}) {
    return new so(new io(), this, e).stringify();
  }
};
rt.registerLazyResult = (s) => {
  so = s;
};
rt.registerProcessor = (s) => {
  io = s;
};
var $s = rt;
rt.default = rt;
let Ci = {};
var no = function(e) {
  Ci[e] || (Ci[e] = !0, typeof console < "u" && console.warn && console.warn(e));
};
let is = class {
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
var oo = is;
is.default = is;
let hc = oo, ns = class {
  constructor(e, t, r) {
    this.processor = e, this.messages = [], this.root = t, this.opts = r, this.css = void 0, this.map = void 0;
  }
  toString() {
    return this.css;
  }
  warn(e, t = {}) {
    t.plugin || this.lastPlugin && this.lastPlugin.postcssPlugin && (t.plugin = this.lastPlugin.postcssPlugin);
    let r = new hc(e, t);
    return this.messages.push(r), r;
  }
  warnings() {
    return this.messages.filter((e) => e.type === "warning");
  }
  get content() {
    return this.css;
  }
};
var Ns = ns;
ns.default = ns;
const Ar = 39, vi = 34, At = 92, Ii = 47, Et = 10, Ge = 32, Mt = 12, $t = 9, Nt = 13, fc = 91, pc = 93, dc = 40, mc = 41, gc = 123, yc = 125, wc = 59, Sc = 42, bc = 58, Cc = 64, kt = /[\t\n\f\r "#'()/;[\\\]{}]/g, Pt = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g, vc = /.[\r\n"'(/\\]/, xi = /[\da-f]/i;
var Ic = function(e, t = {}) {
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
      case Et:
      case Ge:
      case $t:
      case Nt:
      case Mt: {
        o = f;
        do
          o += 1, n = r.charCodeAt(o);
        while (n === Ge || n === Et || n === $t || n === Nt || n === Mt);
