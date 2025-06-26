        t = t.concat(r.plugins);
      else if (typeof r == "object" && r.postcssPlugin)
        t.push(r);
      else if (typeof r == "function")
        t.push(r);
      else if (typeof r == "object" && (r.parse || r.stringify)) {
        if (process.env.NODE_ENV !== "production")
          throw new Error(
            "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
          );
      } else
        throw new Error(r + " is not a PostCSS plugin");
    return t;
  }
  process(e, t = {}) {
    return !this.plugins.length && !t.parser && !t.stringifier && !t.syntax ? new au(this, e, t) : new lu(this, e, t);
  }
  use(e) {
    return this.plugins = this.plugins.concat(this.normalize([e])), this;
  }
};
var hu = et;
et.default = et;
cu.registerProcessor(et);
uu.registerProcessor(et);
let fu = nr, pu = nn, du = ar, mu = vs, gu = or, yu = lt, wu = Is;
function tt(s, e) {
  if (Array.isArray(s)) return s.map((i) => tt(i));
  let { inputs: t, ...r } = s;
  if (t) {
    e = [];
    for (let i of t) {
      let n = { ...i, __proto__: gu.prototype };
      n.map && (n.map = {
        ...n.map,
        __proto__: pu.prototype
      }), e.push(n);
    }
  }
  if (r.nodes && (r.nodes = s.nodes.map((i) => tt(i, e))), r.source) {
    let { inputId: i, ...n } = r.source;
    r.source = n, i != null && (r.source.input = e[i]);
  }
  if (r.type === "root")
    return new yu(r);
  if (r.type === "decl")
    return new fu(r);
  if (r.type === "rule")
    return new wu(r);
  if (r.type === "comment")
    return new du(r);
  if (r.type === "atrule")
    return new mu(r);
  throw new Error("Unknown node type: " + s.type);
}
var Su = tt;
tt.default = tt;
let bu = ys, Pn = nr, Cu = kn, vu = Ie, Rs = hu, Iu = sr, xu = Su, Tn = bs, Ru = In, Dn = ar, _n = vs, Ou = Cs, Au = or, Eu = xs, Mu = En, Ln = Is, Fn = lt, $u = ir;
function E(...s) {
  return s.length === 1 && Array.isArray(s[0]) && (s = s[0]), new Rs(s);
}
E.plugin = function(e, t) {
  let r = !1;
  function i(...o) {
    console && console.warn && !r && (r = !0, console.warn(
      e + `: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`
    ), process.env.LANG && process.env.LANG.startsWith("cn") && console.warn(
      e + `: 里面 postcss.plugin 被弃用. 迁移指南:
https://www.w3ctech.com/topic/2226`
    ));
    let l = t(...o);
    return l.postcssPlugin = e, l.postcssVersion = new Rs().version, l;
  }
  let n;
  return Object.defineProperty(i, "postcss", {
    get() {
      return n || (n = i()), n;
    }
  }), i.process = function(o, l, a) {
    return E([i(a)]).process(o, l);
  }, i;
};
E.stringify = Iu;
E.parse = Eu;
E.fromJSON = xu;
E.list = Mu;
E.comment = (s) => new Dn(s);
E.atRule = (s) => new _n(s);
E.decl = (s) => new Pn(s);
E.rule = (s) => new Ln(s);
E.root = (s) => new Fn(s);
E.document = (s) => new Tn(s);
E.CssSyntaxError = bu;
E.Declaration = Pn;
E.Container = vu;
E.Processor = Rs;
E.Document = Tn;
E.Comment = Dn;
E.Warning = Ru;
