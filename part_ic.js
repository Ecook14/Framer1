    if (t) {
      if (r === "prepend")
        this.nodes.length > 1 ? t.raws.before = this.nodes[1].raws.before : delete t.raws.before;
      else if (this.first !== t)
        for (let n of i)
          n.raws.before = t.raws.before;
    }
    return i;
  }
  removeChild(e, t) {
    let r = this.index(e);
    return !t && r === 0 && this.nodes.length > 1 && (this.nodes[1].raws.before = this.nodes[r].raws.before), super.removeChild(e);
  }
  toResult(e = {}) {
    return new uo(new co(), this, e).stringify();
  }
};
Te.registerLazyResult = (s) => {
  uo = s;
};
Te.registerProcessor = (s) => {
  co = s;
};
var ct = Te;
Te.default = Te;
lo.registerRoot(Te);
let st = {
  comma(s) {
    return st.split(s, [","], !0);
  },
  space(s) {
    let e = [" ", `
`, "	"];
    return st.split(s, e);
  },
  split(s, e, t) {
    let r = [], i = "", n = !1, o = 0, l = !1, a = "", u = !1;
    for (let c of s)
      u ? u = !1 : c === "\\" ? u = !0 : l ? c === a && (l = !1) : c === '"' || c === "'" ? (l = !0, a = c) : c === "(" ? o += 1 : c === ")" ? o > 0 && (o -= 1) : o === 0 && e.includes(c) && (n = !0), n ? (i !== "" && r.push(i.trim()), i = "", n = !1) : i += c;
    return (t || i !== "") && r.push(i.trim()), r;
  }
};
var ho = st;
st.default = st;
let fo = xe, xc = ho, Qt = class extends fo {
  constructor(e) {
    super(e), this.type = "rule", this.nodes || (this.nodes = []);
  }
  get selectors() {
    return xc.comma(this.selector);
  }
  set selectors(e) {
    let t = this.selector ? this.selector.match(/,\s*/) : null, r = t ? t[0] : "," + this.raw("between", "beforeOpen");
    this.selector = e.join(r);
  }
};
var Ps = Qt;
Qt.default = Qt;
fo.registerRule(Qt);
let Rc = cr, Oc = Ic, Ac = fr, Ec = ks, Mc = ct, Ri = Ps;
const Oi = {
  empty: !0,
  space: !0
};
function $c(s) {
  for (let e = s.length - 1; e >= 0; e--) {
    let t = s[e], r = t[3] || t[2];
    if (r) return r;
  }
}
let Nc = class {
  constructor(e) {
    this.input = e, this.root = new Mc(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = { input: e, start: { column: 1, line: 1, offset: 0 } };
  }
  atrule(e) {
    let t = new Ec();
    t.name = e[1].slice(1), t.name === "" && this.unnamedAtrule(t, e), this.init(t, e[2]);
    let r, i, n, o = !1, l = !1, a = [], u = [];
    for (; !this.tokenizer.endOfFile(); ) {
      if (e = this.tokenizer.nextToken(), r = e[0], r === "(" || r === "[" ? u.push(r === "(" ? ")" : "]") : r === "{" && u.length > 0 ? u.push("}") : r === u[u.length - 1] && u.pop(), u.length === 0)
        if (r === ";") {
          t.source.end = this.getPosition(e[2]), t.source.end.offset++, this.semicolon = !0;
          break;
        } else if (r === "{") {
          l = !0;
          break;
        } else if (r === "}") {
          if (a.length > 0) {
            for (n = a.length - 1, i = a[n]; i && i[0] === "space"; )
              i = a[--n];
            i && (t.source.end = this.getPosition(i[3] || i[2]), t.source.end.offset++);
          }
          this.end(e);
          break;
        } else
          a.push(e);
      else
        a.push(e);
      if (this.tokenizer.endOfFile()) {
        o = !0;
