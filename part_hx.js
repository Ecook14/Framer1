    }, n, o;
    this.stringify(this.root, (l, a, u) => {
      if (this.css += l, a && u !== "end" && (i.generated.line = e, i.generated.column = t - 1, a.source && a.source.start ? (i.source = this.sourcePath(a), i.original.line = a.source.start.line, i.original.column = a.source.start.column - 1, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, this.map.addMapping(i))), n = l.match(/\n/g), n ? (e += n.length, o = l.lastIndexOf(`
`), t = l.length - o) : t += l.length, a && u !== "start") {
        let c = a.parent || { raws: {} };
        (!(a.type === "decl" || a.type === "atrule" && !a.nodes) || a !== c.last || c.raws.semicolon) && (a.source && a.source.end ? (i.source = this.sourcePath(a), i.original.line = a.source.end.line, i.original.column = a.source.end.column - 1, i.generated.line = e, i.generated.column = t - 2, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, i.generated.line = e, i.generated.column = t - 1, this.map.addMapping(i)));
      }
    });
  }
  isAnnotation() {
    return this.isInline() ? !0 : typeof this.mapOpts.annotation < "u" ? this.mapOpts.annotation : this.previous().length ? this.previous().some((e) => e.annotation) : !0;
  }
  isInline() {
    if (typeof this.mapOpts.inline < "u")
      return this.mapOpts.inline;
    let e = this.mapOpts.annotation;
    return typeof e < "u" && e !== !0 ? !1 : this.previous().length ? this.previous().some((t) => t.inline) : !0;
  }
  isMap() {
    return typeof this.opts.map < "u" ? !!this.opts.map : this.previous().length > 0;
  }
  isSourcesContent() {
    return typeof this.mapOpts.sourcesContent < "u" ? this.mapOpts.sourcesContent : this.previous().length ? this.previous().some((e) => e.withContent()) : !0;
  }
  outputFile() {
    return this.opts.to ? this.path(this.opts.to) : this.opts.from ? this.path(this.opts.from) : "to.css";
  }
  path(e) {
    if (this.mapOpts.absolute || e.charCodeAt(0) === 60 || /^\w+:\/\//.test(e)) return e;
    let t = this.memoizedPaths.get(e);
    if (t) return t;
    let r = this.opts.to ? zt(this.opts.to) : ".";
    typeof this.mapOpts.annotation == "string" && (r = zt(jn(r, this.mapOpts.annotation)));
    let i = Gn(r, e);
    return this.memoizedPaths.set(e, i), i;
  }
  previous() {
    if (!this.previousMaps)
      if (this.previousMaps = [], this.root)
        this.root.walk((e) => {
          if (e.source && e.source.input.map) {
            let t = e.source.input.map;
            this.previousMaps.includes(t) || this.previousMaps.push(t);
          }
        });
      else {
        let e = new ic(this.originalCSS, this.opts);
        e.map && this.previousMaps.push(e.map);
      }
    return this.previousMaps;
  }
  setSourcesContent() {
    let e = {};
    if (this.root)
      this.root.walk((t) => {
        if (t.source) {
          let r = t.source.input.from;
          if (r && !e[r]) {
            e[r] = !0;
            let i = this.usesFileUrls ? this.toFileUrl(r) : this.toUrl(this.path(r));
            this.map.setSourceContent(i, t.source.input.css);
          }
        }
      });
    else if (this.css) {
      let t = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
      this.map.setSourceContent(t, this.css);
    }
  }
  sourcePath(e) {
    return this.mapOpts.from ? this.toUrl(this.mapOpts.from) : this.usesFileUrls ? this.toFileUrl(e.source.input.from) : this.toUrl(this.path(e.source.input.from));
  }
  toBase64(e) {
    return Buffer ? Buffer.from(e).toString("base64") : window.btoa(unescape(encodeURIComponent(e)));
  }
  toFileUrl(e) {
    let t = this.memoizedFileURLs.get(e);
    if (t) return t;
    if (bi) {
      let r = bi(e).toString();
      return this.memoizedFileURLs.set(e, r), r;
    } else
      throw new Error(
        "`map.absolute` option is not available in this PostCSS build"
      );
  }
  toUrl(e) {
    let t = this.memoizedURLs.get(e);
    if (t) return t;
    Hn === "\\" && (e = e.replace(/\\/g, "/"));
    let r = encodeURI(e).replace(/[#?]/g, encodeURIComponent);
    return this.memoizedURLs.set(e, r), r;
  }
};
var Yn = ac;
let lc = ur, ss = class extends lc {
  constructor(e) {
    super(e), this.type = "comment";
  }
};
