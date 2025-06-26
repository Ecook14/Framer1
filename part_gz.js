  withContent() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  }
};
var nn = Ur;
Ur.default = Ur;
let { SourceMapConsumer: al, SourceMapGenerator: ll } = ie, { fileURLToPath: ei, pathToFileURL: yt } = ie, { isAbsolute: Br, resolve: zr } = ie, { nanoid: ul } = rl, Cr = ie, ti = ys, cl = nn, vr = Symbol("fromOffsetCache"), hl = !!(al && ll), ri = !!(zr && Br), Ht = class {
  constructor(e, t = {}) {
    if (e === null || typeof e > "u" || typeof e == "object" && !e.toString)
      throw new Error(`PostCSS received ${e} instead of CSS string`);
    if (this.css = e.toString(), this.css[0] === "\uFEFF" || this.css[0] === "￾" ? (this.hasBOM = !0, this.css = this.css.slice(1)) : this.hasBOM = !1, t.from && (!ri || /^\w+:\/\//.test(t.from) || Br(t.from) ? this.file = t.from : this.file = zr(t.from)), ri && hl) {
      let r = new cl(this.css, t);
      if (r.text) {
        this.map = r;
        let i = r.consumer().file;
        !this.file && i && (this.file = this.mapResolve(i));
      }
    }
    this.file || (this.id = "<input css " + ul(6) + ">"), this.map && (this.map.file = this.from);
  }
  error(e, t, r, i = {}) {
    let n, o, l;
    if (t && typeof t == "object") {
      let u = t, c = r;
      if (typeof u.offset == "number") {
        let h = this.fromOffset(u.offset);
        t = h.line, r = h.col;
      } else
        t = u.line, r = u.column;
      if (typeof c.offset == "number") {
        let h = this.fromOffset(c.offset);
        o = h.line, l = h.col;
      } else
        o = c.line, l = c.column;
    } else if (!r) {
      let u = this.fromOffset(t);
      t = u.line, r = u.col;
    }
    let a = this.origin(t, r, o, l);
    return a ? n = new ti(
      e,
      a.endLine === void 0 ? a.line : { column: a.column, line: a.line },
      a.endLine === void 0 ? a.column : { column: a.endColumn, line: a.endLine },
      a.source,
      a.file,
      i.plugin
    ) : n = new ti(
      e,
      o === void 0 ? t : { column: r, line: t },
      o === void 0 ? r : { column: l, line: o },
      this.css,
      this.file,
      i.plugin
    ), n.input = { column: r, endColumn: l, endLine: o, line: t, source: this.css }, this.file && (yt && (n.input.url = yt(this.file).toString()), n.input.file = this.file), n;
  }
  fromOffset(e) {
    let t, r;
    if (this[vr])
      r = this[vr];
    else {
      let n = this.css.split(`
`);
      r = new Array(n.length);
      let o = 0;
      for (let l = 0, a = n.length; l < a; l++)
        r[l] = o, o += n[l].length + 1;
      this[vr] = r;
    }
    t = r[r.length - 1];
    let i = 0;
    if (e >= t)
      i = r.length - 1;
    else {
      let n = r.length - 2, o;
      for (; i < n; )
        if (o = i + (n - i >> 1), e < r[o])
          n = o - 1;
        else if (e >= r[o + 1])
          i = o + 1;
        else {
          i = o;
          break;
        }
    }
    return {
      col: e - r[i] + 1,
      line: i + 1
    };
  }
  mapResolve(e) {
    return /^\w+:\/\//.test(e) ? e : zr(this.map.consumer().sourceRoot || this.map.root || ".", e);
  }
  origin(e, t, r, i) {
    if (!this.map) return !1;
    let n = this.map.consumer(), o = n.originalPositionFor({ column: t, line: e });
    if (!o.source) return !1;
    let l;
    typeof r == "number" && (l = n.originalPositionFor({ column: i, line: r }));
    let a;
    Br(o.source) ? a = yt(o.source) : a = new URL(
