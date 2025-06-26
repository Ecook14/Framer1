    e.pop();
    let t = new li();
    this.init(t, e[0][2]), t.raws.between = this.spacesAndCommentsFromEnd(e), this.raw(t, "selector", e), this.current = t;
  }
  spacesAndCommentsFromEnd(e) {
    let t, r = "";
    for (; e.length && (t = e[e.length - 1][0], !(t !== "space" && t !== "comment")); )
      r = e.pop()[1] + r;
    return r;
  }
  // Errors
  spacesAndCommentsFromStart(e) {
    let t, r = "";
    for (; e.length && (t = e[0][0], !(t !== "space" && t !== "comment")); )
      r += e.shift()[1];
    return r;
  }
  spacesFromEnd(e) {
    let t, r = "";
    for (; e.length && (t = e[e.length - 1][0], t === "space"); )
      r = e.pop()[1] + r;
    return r;
  }
  stringFrom(e, t) {
    let r = "";
    for (let i = t; i < e.length; i++)
      r += e[i][1];
    return e.splice(t, e.length - t), r;
  }
  unclosedBlock() {
    let e = this.current.source.start;
    throw this.input.error("Unclosed block", e.line, e.column);
  }
  unclosedBracket(e) {
    throw this.input.error(
      "Unclosed bracket",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unexpectedClose(e) {
    throw this.input.error(
      "Unexpected }",
      { offset: e[2] },
      { offset: e[2] + 1 }
    );
  }
  unknownWord(e) {
    throw this.input.error(
      "Unknown word",
      { offset: e[0][2] },
      { offset: e[0][2] + e[0][1].length }
    );
  }
  unnamedAtrule(e, t) {
    throw this.input.error(
      "At-rule without name",
      { offset: t[2] },
      { offset: t[2] + t[1].length }
    );
  }
};
var Bl = Ul;
let zl = Ie, Wl = Bl, Vl = or;
function Jt(s, e) {
  let t = new Vl(s, e), r = new Wl(t);
  try {
    r.parse();
  } catch (i) {
    throw process.env.NODE_ENV !== "production" && i.name === "CssSyntaxError" && e && e.from && (/\.scss$/i.test(e.from) ? i.message += `
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser` : /\.sass/i.test(e.from) ? i.message += `
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser` : /\.less$/i.test(e.from) && (i.message += `
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)), i;
  }
  return r.root;
}
var xs = Jt;
Jt.default = Jt;
zl.registerParse(Jt);
let { isClean: ue, my: Gl } = at, jl = cn, Hl = sr, Yl = Ie, Zl = bs, Jl = vn, ci = Cs, Xl = xs, Kl = lt;
const Ql = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
}, ql = {
  AtRule: !0,
  AtRuleExit: !0,
  Comment: !0,
  CommentExit: !0,
  Declaration: !0,
  DeclarationExit: !0,
  Document: !0,
  DocumentExit: !0,
  Once: !0,
  OnceExit: !0,
  postcssPlugin: !0,
  prepare: !0,
