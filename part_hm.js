    return this.result;
  }
  then(e, t) {
    return process.env.NODE_ENV !== "production" && ("from" in this.opts || Jl(
      "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
    )), this.async().then(e, t);
  }
  toString() {
    return this.css;
  }
  visitSync(e, t) {
    for (let [r, i] of e) {
      this.result.lastPlugin = r;
      let n;
      try {
        n = i(t, this.helpers);
      } catch (o) {
        throw this.handleError(o, t.proxyOf);
      }
      if (t.type !== "root" && t.type !== "document" && !t.parent)
        return !0;
      if (Ve(n))
        throw this.getAsyncError();
    }
  }
  visitTick(e) {
    let t = e[e.length - 1], { node: r, visitors: i } = t;
    if (r.type !== "root" && r.type !== "document" && !r.parent) {
      e.pop();
      return;
    }
    if (i.length > 0 && t.visitorIndex < i.length) {
      let [o, l] = i[t.visitorIndex];
      t.visitorIndex += 1, t.visitorIndex === i.length && (t.visitors = [], t.visitorIndex = 0), this.result.lastPlugin = o;
      try {
        return l(r.toProxy(), this.helpers);
      } catch (a) {
        throw this.handleError(a, r);
      }
    }
    if (t.iterator !== 0) {
      let o = t.iterator, l;
      for (; l = r.nodes[r.indexes[o]]; )
        if (r.indexes[o] += 1, !l[ue]) {
          l[ue] = !0, e.push(hi(l));
          return;
        }
      t.iterator = 0, delete r.indexes[o];
    }
    let n = t.events;
    for (; t.eventIndex < n.length; ) {
      let o = n[t.eventIndex];
      if (t.eventIndex += 1, o === ke) {
        r.nodes && r.nodes.length && (r[ue] = !0, t.iterator = r.getIterator());
        return;
      } else if (this.listeners[o]) {
        t.visitors = this.listeners[o];
        return;
      }
    }
    e.pop();
  }
  walkSync(e) {
    e[ue] = !0;
    let t = $n(e);
    for (let r of t)
      if (r === ke)
        e.nodes && e.each((i) => {
          i[ue] || this.walkSync(i);
        });
      else {
        let i = this.listeners[r];
        if (i && this.visitSync(i, e.toProxy()))
          return;
      }
  }
  warnings() {
    return this.sync().warnings();
  }
  get content() {
    return this.stringify().content;
  }
  get css() {
    return this.stringify().css;
  }
  get map() {
    return this.stringify().map;
  }
  get messages() {
    return this.sync().messages;
  }
  get opts() {
    return this.result.opts;
  }
  get processor() {
    return this.result.processor;
  }
  get root() {
    return this.sync().root;
  }
