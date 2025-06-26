        if (i = a.raws[t], typeof i < "u") return !1;
      });
    }
    return typeof i > "u" && (i = di[r]), o.rawCache[r] = i, i;
  }
  rawBeforeClose(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length > 0 && typeof r.raws.after < "u")
        return t = r.raws.after, t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")), !1;
    }), t && (t = t.replace(/\S/g, "")), t;
  }
  rawBeforeComment(e, t) {
    let r;
    return e.walkComments((i) => {
      if (typeof i.raws.before < "u")
        return r = i.raws.before, r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")), !1;
    }), typeof r > "u" ? r = this.raw(t, null, "beforeDecl") : r && (r = r.replace(/\S/g, "")), r;
  }
  rawBeforeDecl(e, t) {
    let r;
    return e.walkDecls((i) => {
      if (typeof i.raws.before < "u")
        return r = i.raws.before, r.includes(`
`) && (r = r.replace(/[^\n]+$/, "")), !1;
    }), typeof r > "u" ? r = this.raw(t, null, "beforeRule") : r && (r = r.replace(/\S/g, "")), r;
  }
  rawBeforeOpen(e) {
    let t;
    return e.walk((r) => {
      if (r.type !== "decl" && (t = r.raws.between, typeof t < "u"))
        return !1;
    }), t;
  }
  rawBeforeRule(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && (r.parent !== e || e.first !== r) && typeof r.raws.before < "u")
        return t = r.raws.before, t.includes(`
`) && (t = t.replace(/[^\n]+$/, "")), !1;
    }), t && (t = t.replace(/\S/g, "")), t;
  }
  rawColon(e) {
    let t;
    return e.walkDecls((r) => {
      if (typeof r.raws.between < "u")
        return t = r.raws.between.replace(/[^\s:]/g, ""), !1;
    }), t;
  }
  rawEmptyBody(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length === 0 && (t = r.raws.after, typeof t < "u"))
        return !1;
    }), t;
  }
  rawIndent(e) {
    if (e.raws.indent) return e.raws.indent;
    let t;
    return e.walk((r) => {
      let i = r.parent;
      if (i && i !== e && i.parent && i.parent === e && typeof r.raws.before < "u") {
        let n = r.raws.before.split(`
`);
        return t = n[n.length - 1], t = t.replace(/\S/g, ""), !1;
      }
    }), t;
  }
  rawSemicolon(e) {
    let t;
    return e.walk((r) => {
      if (r.nodes && r.nodes.length && r.last.type === "decl" && (t = r.raws.semicolon, typeof t < "u"))
        return !1;
    }), t;
  }
  rawValue(e, t) {
    let r = e[t], i = e.raws[t];
    return i && i.value === r ? i.raw : r;
  }
  root(e) {
    this.body(e), e.raws.after && this.builder(e.raws.after);
  }
  rule(e) {
    this.block(e, this.rawValue(e, "selector")), e.raws.ownSemicolon && this.builder(e.raws.ownSemicolon, e, "end");
  }
  stringify(e, t) {
    if (!this[e.type])
      throw new Error(
        "Unknown AST node type " + e.type + ". Maybe you need to change PostCSS stringifier."
      );
    this[e.type](e, t);
  }
};
var zn = Jr;
Jr.default = Jr;
let Bu = zn;
function Xr(s, e) {
  new Bu(e).stringify(s);
