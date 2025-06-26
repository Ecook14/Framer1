  Once: !0,
  OnceExit: !0,
  postcssPlugin: !0,
  prepare: !0,
  Root: !0,
  RootExit: !0,
  Rule: !0,
  RuleExit: !0
}, Hc = {
  Once: !0,
  postcssPlugin: !0,
  prepare: !0
}, De = 0;
function je(s) {
  return typeof s == "object" && typeof s.then == "function";
}
function po(s) {
  let e = !1, t = Gc[s.type];
  return s.type === "decl" ? e = s.prop.toLowerCase() : s.type === "atrule" && (e = s.name.toLowerCase()), e && s.append ? [
    t,
    t + "-" + e,
    De,
    t + "Exit",
    t + "Exit-" + e
  ] : e ? [t, t + "-" + e, t + "Exit", t + "Exit-" + e] : s.append ? [t, De, t + "Exit"] : [t, t + "Exit"];
}
function Ei(s) {
  let e;
  return s.type === "document" ? e = ["Document", De, "DocumentExit"] : s.type === "root" ? e = ["Root", De, "RootExit"] : e = po(s), {
    eventIndex: 0,
    events: e,
    iterator: 0,
    node: s,
    visitorIndex: 0,
    visitors: []
  };
}
function os(s) {
  return s[ce] = !1, s.nodes && s.nodes.forEach((e) => os(e)), s;
}
let as = {}, _e = class mo {
  constructor(e, t, r) {
    this.stringified = !1, this.processed = !1;
    let i;
    if (typeof t == "object" && t !== null && (t.type === "root" || t.type === "document"))
      i = os(t);
    else if (t instanceof mo || t instanceof Ai)
      i = os(t.root), t.map && (typeof r.map > "u" && (r.map = {}), r.map.inline || (r.map.inline = !1), r.map.prev = t.map);
    else {
      let n = Wc;
      r.syntax && (n = r.syntax.parse), r.parser && (n = r.parser), n.parse && (n = n.parse);
      try {
        i = n(t, r);
      } catch (o) {
        this.processed = !0, this.error = o;
      }
      i && !i[_c] && Uc.rebuild(i);
    }
    this.result = new Ai(e, i, r), this.helpers = { ...as, postcss: as, result: this.result }, this.plugins = this.processor.plugins.map((n) => typeof n == "object" && n.prepare ? { ...n, ...n.prepare(this.result) } : n);
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
          if (!jc[r] && /^[A-Z]/.test(r))
            throw new Error(
              `Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
            );
