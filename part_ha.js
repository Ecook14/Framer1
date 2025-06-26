      o.source,
      this.map.consumer().sourceRoot || yt(this.map.mapFile)
    );
    let u = {
      column: o.column,
      endColumn: l && l.column,
      endLine: l && l.line,
      line: o.line,
      url: a.toString()
    };
    if (a.protocol === "file:")
      if (ei)
        u.file = ei(a);
      else
        throw new Error("file: protocol is not available in this PostCSS build");
    let c = n.sourceContentFor(o.source);
    return c && (u.source = c), u;
  }
  toJSON() {
    let e = {};
    for (let t of ["hasBOM", "css", "file", "id"])
      this[t] != null && (e[t] = this[t]);
    return this.map && (e.map = { ...this.map }, e.map.consumerCache && (e.map.consumerCache = void 0)), e;
  }
  get from() {
    return this.file || this.id;
  }
};
var or = Ht;
Ht.default = Ht;
Cr && Cr.registerInput && Cr.registerInput(Ht);
let { SourceMapConsumer: on, SourceMapGenerator: Ft } = ie, { dirname: Ut, relative: an, resolve: ln, sep: un } = ie, { pathToFileURL: si } = ie, fl = or, pl = !!(on && Ft), dl = !!(Ut && ln && an && un), ml = class {
  constructor(e, t, r, i) {
    this.stringify = e, this.mapOpts = r.map || {}, this.root = t, this.opts = r, this.css = i, this.originalCSS = i, this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute, this.memoizedFileURLs = /* @__PURE__ */ new Map(), this.memoizedPaths = /* @__PURE__ */ new Map(), this.memoizedURLs = /* @__PURE__ */ new Map();
  }
  addAnnotation() {
    let e;
    this.isInline() ? e = "data:application/json;base64," + this.toBase64(this.map.toString()) : typeof this.mapOpts.annotation == "string" ? e = this.mapOpts.annotation : typeof this.mapOpts.annotation == "function" ? e = this.mapOpts.annotation(this.opts.to, this.root) : e = this.outputFile() + ".map";
    let t = `
`;
    this.css.includes(`\r
`) && (t = `\r
`), this.css += t + "/*# sourceMappingURL=" + e + " */";
  }
  applyPrevMaps() {
    for (let e of this.previous()) {
      let t = this.toUrl(this.path(e.file)), r = e.root || Ut(e.file), i;
      this.mapOpts.sourcesContent === !1 ? (i = new on(e.text), i.sourcesContent && (i.sourcesContent = null)) : i = e.consumer(), this.map.applySourceMap(i, t, this.toUrl(this.path(r)));
    }
  }
  clearAnnotation() {
    if (this.mapOpts.annotation !== !1)
      if (this.root) {
        let e;
        for (let t = this.root.nodes.length - 1; t >= 0; t--)
          e = this.root.nodes[t], e.type === "comment" && e.text.indexOf("# sourceMappingURL=") === 0 && this.root.removeChild(t);
      } else this.css && (this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, ""));
  }
  generate() {
    if (this.clearAnnotation(), dl && pl && this.isMap())
      return this.generateMap();
    {
      let e = "";
      return this.stringify(this.root, (t) => {
        e += t;
      }), [e];
    }
  }
  generateMap() {
    if (this.root)
      this.generateString();
    else if (this.previous().length === 1) {
      let e = this.previous()[0].consumer();
      e.file = this.outputFile(), this.map = Ft.fromSourceMap(e, {
        ignoreInvalidMapping: !0
      });
    } else
      this.map = new Ft({
        file: this.outputFile(),
        ignoreInvalidMapping: !0
      }), this.map.addMapping({
        generated: { column: 0, line: 1 },
        original: { column: 0, line: 1 },
        source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
      });
    return this.isSourcesContent() && this.setSourcesContent(), this.root && this.previous().length > 0 && this.applyPrevMaps(), this.isAnnotation() && this.addAnnotation(), this.isInline() ? [this.css] : [this.css, this.map];
  }
  generateString() {
    this.css = "", this.map = new Ft({
      file: this.outputFile(),
      ignoreInvalidMapping: !0
    });
    let e = 1, t = 1, r = "<no source>", i = {
      generated: { column: 0, line: 0 },
      original: { column: 0, line: 0 },
      source: ""
    }, n, o;
    this.stringify(this.root, (l, a, u) => {
      if (this.css += l, a && u !== "end" && (i.generated.line = e, i.generated.column = t - 1, a.source && a.source.start ? (i.source = this.sourcePath(a), i.original.line = a.source.start.line, i.original.column = a.source.start.column - 1, this.map.addMapping(i)) : (i.source = r, i.original.line = 1, i.original.column = 0, this.map.addMapping(i))), n = l.match(/\n/g), n ? (e += n.length, o = l.lastIndexOf(`
`), t = l.length - o) : t += l.length, a && u !== "start") {
