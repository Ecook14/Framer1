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
    return new On(new An(), this, e).stringify();
  }
};
Ne.registerLazyResult = (s) => {
  On = s;
};
Ne.registerProcessor = (s) => {
  An = s;
};
var lt = Ne;
Ne.default = Ne;
Rn.registerRoot(Ne);
let qe = {
  comma(s) {
    return qe.split(s, [","], !0);
  },
  space(s) {
    let e = [" ", `
`, "	"];
    return qe.split(s, e);
  },
  split(s, e, t) {
    let r = [], i = "", n = !1, o = 0, l = !1, a = "", u = !1;
    for (let c of s)
      u ? u = !1 : c === "\\" ? u = !0 : l ? c === a && (l = !1) : c === '"' || c === "'" ? (l = !0, a = c) : c === "(" ? o += 1 : c === ")" ? o > 0 && (o -= 1) : o === 0 && e.includes(c) && (n = !0), n ? (i !== "" && r.push(i.trim()), i = "", n = !1) : i += c;
    return (t || i !== "") && r.push(i.trim()), r;
  }
};
var En = qe;
qe.default = qe;
let Mn = Ie, kl = En, Zt = class extends Mn {
  constructor(e) {
    super(e), this.type = "rule", this.nodes || (this.nodes = []);
  }
  get selectors() {
    return kl.comma(this.selector);
  }
  set selectors(e) {
    let t = this.selector ? this.selector.match(/,\s*/) : null, r = t ? t[0] : "," + this.raw("between", "beforeOpen");
    this.selector = e.join(r);
  }
};
var Is = Zt;
Zt.default = Zt;
Mn.registerRule(Zt);
let Pl = nr, Tl = Nl, Dl = ar, _l = vs, Ll = lt, li = Is;
const ui = {
  empty: !0,
  space: !0
};
function Fl(s) {
  for (let e = s.length - 1; e >= 0; e--) {
    let t = s[e], r = t[3] || t[2];
    if (r) return r;
  }
}
let Ul = class {
  constructor(e) {
    this.input = e, this.root = new Ll(), this.current = this.root, this.spaces = "", this.semicolon = !1, this.createTokenizer(), this.root.source = { input: e, start: { column: 1, line: 1, offset: 0 } };
  }
  atrule(e) {
    let t = new _l();
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
        break;
      }
    }
    t.raws.between = this.spacesAndCommentsFromEnd(a), a.length ? (t.raws.afterName = this.spacesAndCommentsFromStart(a), this.raw(t, "params", a), o && (e = a[a.length - 1], t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++, this.spaces = t.raws.between, t.raws.between = "")) : (t.raws.afterName = "", t.params = ""), l && (t.nodes = [], this.current = t);
