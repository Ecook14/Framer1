    return e.map((i) => (i[Jn] || ro.rebuild(i), i = i.proxyOf, i.parent && i.parent.removeChild(i), i[Zn] && to(i), typeof i.raws.before > "u" && t && typeof t.raws.before < "u" && (i.raws.before = t.raws.before.replace(/\S/g, "")), i.parent = this.proxyOf, i));
  }
  prepend(...e) {
    e = e.reverse();
    for (let t of e) {
      let r = this.normalize(t, this.first, "prepend").reverse();
      for (let i of r) this.proxyOf.nodes.unshift(i);
      for (let i in this.indexes)
        this.indexes[i] = this.indexes[i] + r.length;
    }
    return this.markDirty(), this;
  }
  push(e) {
    return e.parent = this, this.proxyOf.nodes.push(e), this;
  }
  removeAll() {
    for (let e of this.proxyOf.nodes) e.parent = void 0;
    return this.proxyOf.nodes = [], this.markDirty(), this;
  }
  removeChild(e) {
    e = this.index(e), this.proxyOf.nodes[e].parent = void 0, this.proxyOf.nodes.splice(e, 1);
    let t;
    for (let r in this.indexes)
      t = this.indexes[r], t >= e && (this.indexes[r] = t - 1);
    return this.markDirty(), this;
  }
  replaceValues(e, t, r) {
    return r || (r = t, t = {}), this.walkDecls((i) => {
      t.props && !t.props.includes(i.prop) || t.fast && !i.value.includes(t.fast) || (i.value = i.value.replace(e, r));
    }), this.markDirty(), this;
  }
  some(e) {
    return this.nodes.some(e);
  }
  walk(e) {
    return this.each((t, r) => {
      let i;
      try {
        i = e(t, r);
      } catch (n) {
        throw t.addToError(n);
      }
      return i !== !1 && t.walk && (i = t.walk(e)), i;
    });
  }
  walkAtRules(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, i) => {
      if (r.type === "atrule" && e.test(r.name))
        return t(r, i);
    }) : this.walk((r, i) => {
      if (r.type === "atrule" && r.name === e)
        return t(r, i);
    }) : (t = e, this.walk((r, i) => {
      if (r.type === "atrule")
        return t(r, i);
    }));
  }
  walkComments(e) {
    return this.walk((t, r) => {
      if (t.type === "comment")
        return e(t, r);
    });
  }
  walkDecls(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, i) => {
      if (r.type === "decl" && e.test(r.prop))
        return t(r, i);
    }) : this.walk((r, i) => {
      if (r.type === "decl" && r.prop === e)
        return t(r, i);
    }) : (t = e, this.walk((r, i) => {
      if (r.type === "decl")
        return t(r, i);
    }));
  }
  walkRules(e, t) {
    return t ? e instanceof RegExp ? this.walk((r, i) => {
      if (r.type === "rule" && e.test(r.selector))
        return t(r, i);
    }) : this.walk((r, i) => {
      if (r.type === "rule" && r.selector === e)
        return t(r, i);
    }) : (t = e, this.walk((r, i) => {
      if (r.type === "rule")
        return t(r, i);
    }));
  }
  get first() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[0];
  }
  get last() {
    if (this.proxyOf.nodes)
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
  }
};
pe.registerParse = (s) => {
  Qn = s;
};
pe.registerRule = (s) => {
