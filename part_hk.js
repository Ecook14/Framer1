  Root: !0,
  RootExit: !0,
  Rule: !0,
  RuleExit: !0
}, eu = {
  Once: !0,
  postcssPlugin: !0,
  prepare: !0
}, ke = 0;
function Ve(s) {
  return typeof s == "object" && typeof s.then == "function";
}
function $n(s) {
  let e = !1, t = Ql[s.type];
  return s.type === "decl" ? e = s.prop.toLowerCase() : s.type === "atrule" && (e = s.name.toLowerCase()), e && s.append ? [
    t,
    t + "-" + e,
    ke,
    t + "Exit",
    t + "Exit-" + e
  ] : e ? [t, t + "-" + e, t + "Exit", t + "Exit-" + e] : s.append ? [t, ke, t + "Exit"] : [t, t + "Exit"];
}
function hi(s) {
  let e;
  return s.type === "document" ? e = ["Document", ke, "DocumentExit"] : s.type === "root" ? e = ["Root", ke, "RootExit"] : e = $n(s), {
    eventIndex: 0,
    events: e,
    iterator: 0,
    node: s,
    visitorIndex: 0,
    visitors: []
  };
}
function jr(s) {
  return s[ue] = !1, s.nodes && s.nodes.forEach((e) => jr(e)), s;
}
let Hr = {}, Pe = class Nn {
  constructor(e, t, r) {
    this.stringified = !1, this.processed = !1;
    let i;
    if (typeof t == "object" && t !== null && (t.type === "root" || t.type === "document"))
      i = jr(t);
    else if (t instanceof Nn || t instanceof ci)
      i = jr(t.root), t.map && (typeof r.map > "u" && (r.map = {}), r.map.inline || (r.map.inline = !1), r.map.prev = t.map);
    else {
      let n = Xl;
      r.syntax && (n = r.syntax.parse), r.parser && (n = r.parser), n.parse && (n = n.parse);
      try {
        i = n(t, r);
      } catch (o) {
        this.processed = !0, this.error = o;
      }
      i && !i[Gl] && Yl.rebuild(i);
    }
    this.result = new ci(e, i, r), this.helpers = { ...Hr, postcss: Hr, result: this.result }, this.plugins = this.processor.plugins.map((n) => typeof n == "object" && n.prepare ? { ...n, ...n.prepare(this.result) } : n);
  }
  async() {
    return this.error ? Promise.reject(this.error) : this.processed ? Promise.resolve(this.result) : (this.processing || (this.processing = this.runAsync()), this.processing);
  }
  catch(e) {
    return this.async().catch(e);
  }
  finally(e) {
    return this.async().then(e, e);
  }
  getAsyncError() {
    throw new Error("Use process(css).then(cb) to work with async plugins");
  }
  handleError(e, t) {
    let r = this.result.lastPlugin;
    try {
      if (t && t.addToError(e), this.error = e, e.name === "CssSyntaxError" && !e.plugin)
        e.plugin = r.postcssPlugin, e.setMessage();
      else if (r.postcssVersion && process.env.NODE_ENV !== "production") {
        let i = r.postcssPlugin, n = r.postcssVersion, o = this.result.processor.version, l = n.split("."), a = o.split(".");
        (l[0] !== a[0] || parseInt(l[1]) > parseInt(a[1])) && console.error(
          "Unknown error from PostCSS plugin. Your current PostCSS version is " + o + ", but " + i + " uses " + n + ". Perhaps this is the source of the error below."
        );
      }
    } catch (i) {
      console && console.error && console.error(i);
    }
    return e;
  }
  prepareVisitors() {
    this.listeners = {};
    let e = (t, r, i) => {
      this.listeners[r] || (this.listeners[r] = []), this.listeners[r].push([t, i]);
    };
    for (let t of this.plugins)
      if (typeof t == "object")
        for (let r in t) {
          if (!ql[r] && /^[A-Z]/.test(r))
            throw new Error(
              `Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
            );
          if (!eu[r])
            if (typeof t[r] == "object")
              for (let i in t[r])
                i === "*" ? e(t, r, t[r][i]) : e(
