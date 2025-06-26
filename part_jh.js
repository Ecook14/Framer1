    this.pendingCanvasMutations.forEach(
      (e, t) => {
        const r = this.mirror.getId(t);
        this.flushPendingCanvasMutationFor(t, r);
      }
    ), requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  flushPendingCanvasMutationFor(e, t) {
    if (this.frozen || this.locked)
      return;
    const r = this.pendingCanvasMutations.get(e);
    if (!r || t === -1) return;
    const i = r.map((o) => {
      const { type: l, ...a } = o;
      return a;
    }), { type: n } = r[0];
    this.mutationCb({ id: t, type: n, commands: i }), this.pendingCanvasMutations.delete(e);
  }
}
class wf {
  constructor(e) {
    w(this, "trackedLinkElements", /* @__PURE__ */ new WeakSet()), w(this, "mutationCb"), w(this, "adoptedStyleSheetCb"), w(this, "styleMirror", new Fh()), this.mutationCb = e.mutationCb, this.adoptedStyleSheetCb = e.adoptedStyleSheetCb;
  }
  attachLinkElement(e, t) {
    "_cssText" in t.attributes && this.mutationCb({
      adds: [],
      removes: [],
      texts: [],
      attributes: [
        {
          id: t.id,
          attributes: t.attributes
        }
      ]
    }), this.trackLinkElement(e);
  }
  trackLinkElement(e) {
    this.trackedLinkElements.has(e) || (this.trackedLinkElements.add(e), this.trackStylesheetInLinkElement(e));
  }
  adoptStyleSheets(e, t) {
    if (e.length === 0) return;
    const r = {
      id: t,
      styleIds: []
    }, i = [];
    for (const n of e) {
      let o;
      this.styleMirror.has(n) ? o = this.styleMirror.getId(n) : (o = this.styleMirror.add(n), i.push({
        styleId: o,
        rules: Array.from(n.rules || CSSRule, (l, a) => ({
          rule: Zi(l, n.href),
          index: a
        }))
      })), r.styleIds.push(o);
    }
    i.length > 0 && (r.styles = i), this.adoptedStyleSheetCb(r);
  }
  reset() {
    this.styleMirror.reset(), this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
  }
  // TODO: take snapshot on stylesheet reload by applying event listener
  trackStylesheetInLinkElement(e) {
  }
}
class Sf {
  constructor() {
    w(this, "nodeMap", /* @__PURE__ */ new WeakMap()), w(this, "active", !1);
  }
  inOtherBuffer(e, t) {
    const r = this.nodeMap.get(e);
    return r && Array.from(r).some((i) => i !== t);
  }
  add(e, t) {
    this.active || (this.active = !0, requestAnimationFrame(() => {
      this.nodeMap = /* @__PURE__ */ new WeakMap(), this.active = !1;
    })), this.nodeMap.set(e, (this.nodeMap.get(e) || /* @__PURE__ */ new Set()).add(t));
  }
  destroy() {
  }
}
let z, Vt, Nr, rr = !1;
try {
  if (Array.from([1], (s) => s * 2)[0] !== 2) {
    const s = document.createElement("iframe");
    document.body.appendChild(s), Array.from = ((Ws = s.contentWindow) == null ? void 0 : Ws.Array.from) || Array.from, document.body.removeChild(s);
  }
} catch (s) {
  console.debug("Unable to override Array.from", s);
}
const se = ya();
function ft(s = {}) {
  const {
    emit: e,
    checkoutEveryNms: t,
    checkoutEveryNth: r,
    blockClass: i = "rr-block",
    blockSelector: n = null,
    ignoreClass: o = "rr-ignore",
    ignoreSelector: l = null,
    maskTextClass: a = "rr-mask",
