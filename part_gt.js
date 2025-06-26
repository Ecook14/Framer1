    maskTextFn: h,
    maskInputFn: d,
    slimDOMOptions: m === !0 || m === "all" ? (
      // if true: set of sensible options that should not throw away any information
      {
        script: !0,
        comment: !0,
        headFavicon: !0,
        headWhitespace: !0,
        headMetaDescKeywords: m === "all",
        // destructive
        headMetaSocial: !0,
        headMetaRobots: !0,
        headMetaHttpEquiv: !0,
        headMetaAuthorship: !0,
        headMetaVerification: !0
      }
    ) : m === !1 ? {} : m,
    dataURLOptions: g,
    inlineImages: a,
    recordCanvas: u,
    preserveWhiteSpace: p,
    onSerialize: f,
    onIframeLoad: S,
    iframeLoadTimeout: b,
    onStylesheetLoad: y,
    stylesheetLoadTimeout: C,
    keepIframeSrcFn: $,
    newlyAddedElement: !1
  });
}
function Wa(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function Va(s) {
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
var gs = { exports: {} }, T = String, tn = function() {
  return { isColorSupported: !1, reset: T, bold: T, dim: T, italic: T, underline: T, inverse: T, hidden: T, strikethrough: T, black: T, red: T, green: T, yellow: T, blue: T, magenta: T, cyan: T, white: T, gray: T, bgBlack: T, bgRed: T, bgGreen: T, bgYellow: T, bgBlue: T, bgMagenta: T, bgCyan: T, bgWhite: T };
};
gs.exports = tn();
gs.exports.createColors = tn;
var Ga = gs.exports;
const ja = {}, Ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ja
}, Symbol.toStringTag, { value: "Module" })), ie = /* @__PURE__ */ Va(Ha);
let Js = Ga, Xs = ie, Pr = class rn extends Error {
  constructor(e, t, r, i, n, o) {
    super(e), this.name = "CssSyntaxError", this.reason = e, n && (this.file = n), i && (this.source = i), o && (this.plugin = o), typeof t < "u" && typeof r < "u" && (typeof t == "number" ? (this.line = t, this.column = r) : (this.line = t.line, this.column = t.column, this.endLine = r.line, this.endColumn = r.column)), this.setMessage(), Error.captureStackTrace && Error.captureStackTrace(this, rn);
  }
  setMessage() {
    this.message = this.plugin ? this.plugin + ": " : "", this.message += this.file ? this.file : "<css input>", typeof this.line < "u" && (this.message += ":" + this.line + ":" + this.column), this.message += ": " + this.reason;
  }
  showSourceCode(e) {
    if (!this.source) return "";
    let t = this.source;
    e == null && (e = Js.isColorSupported), Xs && e && (t = Xs(t));
    let r = t.split(/\r?\n/), i = Math.max(this.line - 3, 0), n = Math.min(this.line + 2, r.length), o = String(n).length, l, a;
    if (e) {
      let { bold: u, gray: c, red: h } = Js.createColors(!0);
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
`), this.name + ": " + this.message + e;
  }
};
var ys = Pr;
