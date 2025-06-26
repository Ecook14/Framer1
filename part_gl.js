}
function ga(s) {
  return "selectorText" in s;
}
class Ji {
  constructor() {
    Vs(this, "idNodeMap", /* @__PURE__ */ new Map()), Vs(this, "nodeMetaMap", /* @__PURE__ */ new WeakMap());
  }
  getId(e) {
    var t;
    return e ? ((t = this.getMeta(e)) == null ? void 0 : t.id) ?? -1 : -1;
  }
  getNode(e) {
    return this.idNodeMap.get(e) || null;
  }
  getIds() {
    return Array.from(this.idNodeMap.keys());
  }
  getMeta(e) {
    return this.nodeMetaMap.get(e) || null;
  }
  // removes the node from idNodeMap
  // doesn't remove the node from nodeMetaMap
  removeNodeFromMap(e) {
    const t = this.getId(e);
    this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach(
      (r) => this.removeNodeFromMap(r)
    );
  }
  has(e) {
    return this.idNodeMap.has(e);
  }
  hasNode(e) {
    return this.nodeMetaMap.has(e);
  }
  add(e, t) {
    const r = t.id;
    this.idNodeMap.set(r, e), this.nodeMetaMap.set(e, t);
  }
  replace(e, t) {
    const r = this.getNode(e);
    if (r) {
      const i = this.nodeMetaMap.get(r);
      i && this.nodeMetaMap.set(t, i);
    }
    this.idNodeMap.set(e, t);
  }
  reset() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
}
function ya() {
  return new Ji();
}
function ps({
  element: s,
  maskInputOptions: e,
  tagName: t,
  type: r,
  value: i,
  maskInputFn: n
}) {
  let o = i || "";
  const l = r && ve(r);
  return (e[t.toLowerCase()] || l && e[l]) && (n ? o = n(o, s) : o = "*".repeat(o.length)), o;
}
function ve(s) {
  return s.toLowerCase();
}
const Hs = "__rrweb_original__";
function wa(s) {
  const e = s.getContext("2d");
  if (!e) return !0;
  const t = 50;
  for (let r = 0; r < s.width; r += t)
    for (let i = 0; i < s.height; i += t) {
      const n = e.getImageData, o = Hs in n ? n[Hs] : n;
      if (new Uint32Array(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        o.call(
          e,
          r,
          i,
          Math.min(t, s.width - r),
          Math.min(t, s.height - i)
        ).data.buffer
      ).some((a) => a !== 0)) return !1;
    }
  return !0;
}
function ds(s) {
  const e = s.type;
  return s.hasAttribute("data-rr-is-password") ? "password" : e ? (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    ve(e)
  ) : null;
}
function Xi(s, e) {
  let t;
  try {
