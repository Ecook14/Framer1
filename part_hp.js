E.AtRule = _n;
E.Result = Ou;
E.Input = Au;
E.Rule = Ln;
E.Root = Fn;
E.Node = $u;
Cu.registerPostcss(E);
var Nu = E;
E.default = E;
const L = /* @__PURE__ */ Wa(Nu);
L.stringify;
L.fromJSON;
L.plugin;
L.parse;
L.list;
L.document;
L.comment;
L.atRule;
L.rule;
L.decl;
L.root;
L.CssSyntaxError;
L.Declaration;
L.Container;
L.Processor;
L.Document;
L.Comment;
L.Warning;
L.AtRule;
L.Result;
L.Input;
L.Rule;
L.Root;
L.Node;
var ku = Object.defineProperty, Pu = (s, e, t) => e in s ? ku(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, ee = (s, e, t) => Pu(s, typeof e != "symbol" ? e + "" : e, t);
function Tu(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function Du(s) {
  if (s.__esModule) return s;
  var e = s.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(s).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(s, r);
    Object.defineProperty(t, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return s[r];
      }
    });
  }), t;
}
var Os = { exports: {} }, D = String, Un = function() {
  return { isColorSupported: !1, reset: D, bold: D, dim: D, italic: D, underline: D, inverse: D, hidden: D, strikethrough: D, black: D, red: D, green: D, yellow: D, blue: D, magenta: D, cyan: D, white: D, gray: D, bgBlack: D, bgRed: D, bgGreen: D, bgYellow: D, bgBlue: D, bgMagenta: D, bgCyan: D, bgWhite: D };
};
Os.exports = Un();
Os.exports.createColors = Un;
var _u = Os.exports;
const Lu = {}, Fu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lu
}, Symbol.toStringTag, { value: "Module" })), ne = /* @__PURE__ */ Du(Fu);
let fi = _u, pi = ne, Zr = class Bn extends Error {
  constructor(e, t, r, i, n, o) {
    super(e), this.name = "CssSyntaxError", this.reason = e, n && (this.file = n), i && (this.source = i), o && (this.plugin = o), typeof t < "u" && typeof r < "u" && (typeof t == "number" ? (this.line = t, this.column = r) : (this.line = t.line, this.column = t.column, this.endLine = r.line, this.endColumn = r.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, Bn);
  }
  setMessage() {
    this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
  }
  showSourceCode(e) {
    if (!this.source) return "";
    let t = this.source;
    e == null && (e = fi.isColorSupported), pi && e && (t = pi(t));
    let r = t.split(/\r?\n/), i = Math.max(this.line - 3, 0), n = Math.min(this.line + 2, r.length), o = String(n).length, l, a;
    if (e) {
      let { bold: u, gray: c, red: h } = fi.createColors(!0);
      l = (d) => u(h(d)), a = (d) => c(d);
    } else
      l = a = (u) => u;
    return r.slice(i, n).map((u, c) => {
      let h = i + 1 + c, d = " " + (" " + h).slice(-o) + " | ";
      if (h === this.line) {
        let m = a(d.replace(/\d/g, " ")) + u.slice(0, this.column - 1).replace(/[^\t]/g, " ");
        return l(">") + a(d) + u + `
 ` + m + l("^");
      }
      return " " + a(d) + u;
    }).join(`
`);
  }
  toString() {
    let e = this.showSourceCode();
    return e && (e = `

` + e + `
