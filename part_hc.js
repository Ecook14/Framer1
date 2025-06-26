  return s.map((e) => (e.nodes && (e.nodes = yn(e.nodes)), delete e.source, e));
}
function wn(s) {
  if (s[hn] = !1, s.proxyOf.nodes)
    for (let e of s.proxyOf.nodes)
      wn(e);
}
let fe = class Sn extends yl {
  append(...e) {
    for (let t of e) {
      let r = this.normalize(t, this.last);
      for (let i of r) this.proxyOf.nodes.push(i);
    }
    return this.markDirty(), this;
  }
  cleanRaws(e) {
    if (super.cleanRaws(e), this.nodes)
      for (let t of this.nodes) t.cleanRaws(e);
  }
  each(e) {
    if (!this.proxyOf.nodes) return;
    let t = this.getIterator(), r, i;
    for (; this.indexes[t] < this.proxyOf.nodes.length && (r = this.indexes[t], i = e(this.proxyOf.nodes[r], r), i !== !1); )
      this.indexes[t] += 1;
    return delete this.indexes[t], i;
  }
  every(e) {
    return this.nodes.every(e);
  }
  getIterator() {
    this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach += 1;
    let e = this.lastEach;
    return this.indexes[e] = 0, e;
  }
  getProxyProcessor() {
    return {
      get(e, t) {
        return t === "proxyOf" ? e : e[t] ? t === "each" || typeof t == "string" && t.startsWith("walk") ? (...r) => e[t](
          ...r.map((i) => typeof i == "function" ? (n, o) => i(n.toProxy(), o) : i)
        ) : t === "every" || t === "some" ? (r) => e[t](
          (i, ...n) => r(i.toProxy(), ...n)
        ) : t === "root" ? () => e.root().toProxy() : t === "nodes" ? e.nodes.map((r) => r.toProxy()) : t === "first" || t === "last" ? e[t].toProxy() : e[t] : e[t];
      },
      set(e, t, r) {
        return e[t] === r || (e[t] = r, (t === "name" || t === "params" || t === "selector") && e.markDirty()), !0;
      }
    };
  }
  index(e) {
    return typeof e == "number" ? e : (e.proxyOf && (e = e.proxyOf), this.proxyOf.nodes.indexOf(e));
  }
  insertAfter(e, t) {
    let r = this.index(e), i = this.normalize(t, this.proxyOf.nodes[r]).reverse();
    r = this.index(e);
    for (let o of i) this.proxyOf.nodes.splice(r + 1, 0, o);
    let n;
    for (let o in this.indexes)
      n = this.indexes[o], r < n && (this.indexes[o] = n + i.length);
    return this.markDirty(), this;
  }
  insertBefore(e, t) {
    let r = this.index(e), i = r === 0 ? "prepend" : !1, n = this.normalize(t, this.proxyOf.nodes[r], i).reverse();
    r = this.index(e);
    for (let l of n) this.proxyOf.nodes.splice(r, 0, l);
    let o;
    for (let l in this.indexes)
      o = this.indexes[l], r <= o && (this.indexes[l] = o + n.length);
    return this.markDirty(), this;
  }
  normalize(e, t) {
    if (typeof e == "string")
      e = yn(mn(e).nodes);
    else if (typeof e > "u")
      e = [];
    else if (Array.isArray(e)) {
      e = e.slice(0);
      for (let i of e)
        i.parent && i.parent.removeChild(i, "ignore");
    } else if (e.type === "root" && this.type !== "document") {
      e = e.nodes.slice(0);
      for (let i of e)
        i.parent && i.parent.removeChild(i, "ignore");
    } else if (e.type)
      e = [e];
    else if (e.prop) {
      if (typeof e.value > "u")
        throw new Error("Value field is missed in node creation");
      typeof e.value != "string" && (e.value = String(e.value)), e = [new pn(e)];
    } else if (e.selector)
      e = [new ws(e)];
    else if (e.name)
      e = [new Ss(e)];
    else if (e.text)
      e = [new dn(e)];
    else
      throw new Error("Unknown node type in node creation");
    return e.map((i) => (i[fn] || Sn.rebuild(i), i = i.proxyOf, i.parent && i.parent.removeChild(i), i[hn] && wn(i), typeof i.raws.before > "u" && t && typeof t.raws.before < "u" && (i.raws.before = t.raws.before.replace(/\S/g, "")), i.parent = this.proxyOf, i));
  }
  prepend(...e) {
    e = e.reverse();
