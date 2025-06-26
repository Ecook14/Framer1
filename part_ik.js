  normalize(e) {
    let t = [];
    for (let r of e)
      if (r.postcss === !0 ? r = r() : r.postcss && (r = r.postcss), typeof r == "object" && Array.isArray(r.plugins))
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
    return !this.plugins.length && !t.parser && !t.stringifier && !t.syntax ? new qc(this, e, t) : new eh(this, e, t);
  }
  use(e) {
    return this.plugins = this.plugins.concat(this.normalize([e])), this;
  }
};
var sh = it;
it.default = it;
rh.registerProcessor(it);
th.registerProcessor(it);
let ih = cr, nh = Wn, oh = fr, ah = ks, lh = hr, uh = ct, ch = Ps;
function nt(s, e) {
  if (Array.isArray(s)) return s.map((i) => nt(i));
  let { inputs: t, ...r } = s;
  if (t) {
    e = [];
    for (let i of t) {
      let n = { ...i, __proto__: lh.prototype };
      n.map && (n.map = {
        ...n.map,
        __proto__: nh.prototype
      }), e.push(n);
    }
  }
  if (r.nodes && (r.nodes = s.nodes.map((i) => nt(i, e))), r.source) {
    let { inputId: i, ...n } = r.source;
    r.source = n, i != null && (r.source.input = e[i]);
  }
  if (r.type === "root")
    return new uh(r);
  if (r.type === "decl")
    return new ih(r);
  if (r.type === "rule")
    return new ch(r);
  if (r.type === "comment")
    return new oh(r);
  if (r.type === "atrule")
    return new ah(r);
  throw new Error("Unknown node type: " + s.type);
}
var hh = nt;
nt.default = nt;
let fh = As, yo = cr, ph = go, dh = xe, Ds = sh, mh = lr, gh = hh, wo = $s, yh = oo, So = fr, bo = ks, wh = Ns, Sh = hr, bh = Ts, Ch = ho, Co = Ps, vo = ct, vh = ur;
function M(...s) {
  return s.length === 1 && Array.isArray(s[0]) && (s = s[0]), new Ds(s);
}
M.plugin = function(e, t) {
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
    return l.postcssPlugin = e, l.postcssVersion = new Ds().version, l;
  }
  let n;
  return Object.defineProperty(i, "postcss", {
    get() {
      return n || (n = i()), n;
    }
  }), i.process = function(o, l, a) {
    return M([i(a)]).process(o, l);
  }, i;
};
M.stringify = mh;
M.parse = bh;
M.fromJSON = gh;
M.list = Ch;
M.comment = (s) => new So(s);
M.atRule = (s) => new bo(s);
M.decl = (s) => new yo(s);
M.rule = (s) => new Co(s);
M.root = (s) => new vo(s);
M.document = (s) => new wo(s);
M.CssSyntaxError = fh;
M.Declaration = yo;
M.Container = dh;
