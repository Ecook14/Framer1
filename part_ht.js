    if (e.index)
      r = this.positionInside(e.index, t);
    else if (e.word) {
      t = this.toString();
      let i = t.indexOf(e.word);
      i !== -1 && (r = this.positionInside(i, t));
    }
    return r;
  }
  positionInside(e, t) {
    let r = t || this.toString(), i = this.source.start.column, n = this.source.start.line;
    for (let o = 0; o < e; o++)
      r[o] === `
` ? (i = 1, n += 1) : i += 1;
    return { column: i, line: n };
  }
  prev() {
    if (!this.parent) return;
    let e = this.parent.index(this);
    return this.parent.nodes[e - 1];
  }
  rangeBy(e) {
    let t = {
      column: this.source.start.column,
      line: this.source.start.line
    }, r = this.source.end ? {
      column: this.source.end.column + 1,
      line: this.source.end.line
    } : {
      column: t.column + 1,
      line: t.line
    };
    if (e.word) {
      let i = this.toString(), n = i.indexOf(e.word);
      n !== -1 && (t = this.positionInside(n, i), r = this.positionInside(n + e.word.length, i));
    } else
      e.start ? t = {
        column: e.start.column,
        line: e.start.line
      } : e.index && (t = this.positionInside(e.index)), e.end ? r = {
        column: e.end.column,
        line: e.end.line
      } : typeof e.endIndex == "number" ? r = this.positionInside(e.endIndex) : e.index && (r = this.positionInside(e.index + 1));
    return (r.line < t.line || r.line === t.line && r.column <= t.column) && (r = { column: t.column + 1, line: t.line }), { end: r, start: t };
  }
  raw(e, t) {
    return new Vu().raw(this, e, t);
  }
  remove() {
    return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
  }
  replaceWith(...e) {
    if (this.parent) {
      let t = this, r = !1;
      for (let i of e)
        i === this ? r = !0 : r ? (this.parent.insertAfter(t, i), t = i) : this.parent.insertBefore(t, i);
      r || this.remove();
    }
    return this;
  }
  root() {
    let e = this;
    for (; e.parent && e.parent.type !== "document"; )
      e = e.parent;
    return e;
  }
  toJSON(e, t) {
    let r = {}, i = t == null;
    t = t || /* @__PURE__ */ new Map();
    let n = 0;
    for (let o in this) {
      if (!Object.prototype.hasOwnProperty.call(this, o) || o === "parent" || o === "proxyCache") continue;
      let l = this[o];
      if (Array.isArray(l))
        r[o] = l.map((a) => typeof a == "object" && a.toJSON ? a.toJSON(null, t) : a);
      else if (typeof l == "object" && l.toJSON)
        r[o] = l.toJSON(null, t);
      else if (o === "source") {
        let a = t.get(l.input);
        a == null && (a = n, t.set(l.input, n), n++), r[o] = {
          end: l.end,
          inputId: a,
          start: l.start
        };
      } else
        r[o] = l;
    }
    return i && (r.inputs = [...t.keys()].map((o) => o.toJSON())), r;
  }
  toProxy() {
    return this.proxyCache || (this.proxyCache = new Proxy(this, this.getProxyProcessor())), this.proxyCache;
  }
  toString(e = Gu) {
    e.stringify && (e = e.stringify);
    let t = "";
    return e(this, (r) => {
      t += r;
    }), t;
  }
  warn(e, t, r) {
