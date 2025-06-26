`), this.name + ": " + this.message + e;
  }
};
var As = Zr;
Zr.default = Zr;
var ut = {};
ut.isClean = Symbol("isClean");
ut.my = Symbol("my");
const di = {
  after: `
`,
  beforeClose: `
`,
  beforeComment: `
`,
  beforeDecl: `
`,
  beforeOpen: " ",
  beforeRule: `
`,
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: !1
};
function Uu(s) {
  return s[0].toUpperCase() + s.slice(1);
}
let Jr = class {
  constructor(e) {
    this.builder = e;
  }
  atrule(e, t) {
    let r = "@" + e.name, i = e.params ? this.rawValue(e, "params") : "";
    if (typeof e.raws.afterName < "u" ? r += e.raws.afterName : i && (r += " "), e.nodes)
      this.block(e, r + i);
    else {
      let n = (e.raws.between || "") + (t ? ";" : "");
      this.builder(r + i + n, e);
    }
  }
  beforeAfter(e, t) {
    let r;
    e.type === "decl" ? r = this.raw(e, null, "beforeDecl") : e.type === "comment" ? r = this.raw(e, null, "beforeComment") : t === "before" ? r = this.raw(e, null, "beforeRule") : r = this.raw(e, null, "beforeClose");
    let i = e.parent, n = 0;
    for (; i && i.type !== "root"; )
      n += 1, i = i.parent;
    if (r.includes(`
`)) {
      let o = this.raw(e, null, "indent");
      if (o.length)
        for (let l = 0; l < n; l++) r += o;
    }
    return r;
  }
  block(e, t) {
    let r = this.raw(e, "between", "beforeOpen");
    this.builder(t + r + "{", e, "start");
    let i;
    e.nodes && e.nodes.length ? (this.body(e), i = this.raw(e, "after")) : i = this.raw(e, "after", "emptyBody"), i && this.builder(i), this.builder("}", e, "end");
  }
  body(e) {
    let t = e.nodes.length - 1;
    for (; t > 0 && e.nodes[t].type === "comment"; )
      t -= 1;
    let r = this.raw(e, "semicolon");
    for (let i = 0; i < e.nodes.length; i++) {
      let n = e.nodes[i], o = this.raw(n, "before");
      o && this.builder(o), this.stringify(n, t !== i || r);
    }
  }
  comment(e) {
    let t = this.raw(e, "left", "commentLeft"), r = this.raw(e, "right", "commentRight");
    this.builder("/*" + t + e.text + r + "*/", e);
  }
  decl(e, t) {
    let r = this.raw(e, "between", "colon"), i = e.prop + r + this.rawValue(e, "value");
    e.important && (i += e.raws.important || " !important"), t && (i += ";"), this.builder(i, e);
  }
  document(e) {
    this.body(e);
  }
  raw(e, t, r) {
    let i;
    if (r || (r = t), t && (i = e.raws[t], typeof i < "u"))
      return i;
    let n = e.parent;
    if (r === "before" && (!n || n.type === "root" && n.first === e || n && n.type === "document"))
      return "";
    if (!n) return di[r];
    let o = e.root();
    if (o.rawCache || (o.rawCache = {}), typeof o.rawCache[r] < "u")
      return o.rawCache[r];
    if (r === "before" || r === "after")
      return this.beforeAfter(e, r);
    {
      let l = "raw" + Uu(r);
      this[l] ? i = this[l](o, e) : o.walk((a) => {
