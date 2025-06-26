}
class Li {
  constructor(e) {
    w(this, "iframeIdToRemoteIdMap", /* @__PURE__ */ new WeakMap()), w(this, "iframeRemoteIdToIdMap", /* @__PURE__ */ new WeakMap()), this.generateIdFn = e;
  }
  getId(e, t, r, i) {
    const n = r || this.getIdToRemoteIdMap(e), o = i || this.getRemoteIdToIdMap(e);
    let l = n.get(t);
    return l || (l = this.generateIdFn(), n.set(t, l), o.set(l, t)), l;
  }
  getIds(e, t) {
    const r = this.getIdToRemoteIdMap(e), i = this.getRemoteIdToIdMap(e);
    return t.map(
      (n) => this.getId(e, n, r, i)
    );
  }
  getRemoteId(e, t, r) {
    const i = r || this.getRemoteIdToIdMap(e);
    if (typeof t != "number") return t;
    const n = i.get(t);
    return n || -1;
  }
  getRemoteIds(e, t) {
    const r = this.getRemoteIdToIdMap(e);
    return t.map((i) => this.getRemoteId(e, i, r));
  }
  reset(e) {
    if (!e) {
      this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap(), this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
      return;
    }
    this.iframeIdToRemoteIdMap.delete(e), this.iframeRemoteIdToIdMap.delete(e);
  }
  getIdToRemoteIdMap(e) {
    let t = this.iframeIdToRemoteIdMap.get(e);
    return t || (t = /* @__PURE__ */ new Map(), this.iframeIdToRemoteIdMap.set(e, t)), t;
  }
  getRemoteIdToIdMap(e) {
    let t = this.iframeRemoteIdToIdMap.get(e);
    return t || (t = /* @__PURE__ */ new Map(), this.iframeRemoteIdToIdMap.set(e, t)), t;
  }
}
class af {
  constructor(e) {
    w(this, "iframes", /* @__PURE__ */ new WeakMap()), w(this, "crossOriginIframeMap", /* @__PURE__ */ new WeakMap()), w(this, "crossOriginIframeMirror", new Li(Ki)), w(this, "crossOriginIframeStyleMirror"), w(this, "crossOriginIframeRootIdMap", /* @__PURE__ */ new WeakMap()), w(this, "mirror"), w(this, "mutationCb"), w(this, "wrappedEmit"), w(this, "loadListener"), w(this, "stylesheetManager"), w(this, "recordCrossOriginIframes"), this.mutationCb = e.mutationCb, this.wrappedEmit = e.wrappedEmit, this.stylesheetManager = e.stylesheetManager, this.recordCrossOriginIframes = e.recordCrossOriginIframes, this.crossOriginIframeStyleMirror = new Li(
      this.stylesheetManager.styleMirror.generateId.bind(
        this.stylesheetManager.styleMirror
      )
    ), this.mirror = e.mirror, this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this));
  }
  addIframe(e) {
    this.iframes.set(e, !0), e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e);
  }
  addLoadListener(e) {
    this.loadListener = e;
  }
  attachIframe(e, t) {
    var r, i;
    this.mutationCb({
      adds: [
        {
          parentId: this.mirror.getId(e),
          nextId: null,
          node: t
        }
      ],
      removes: [],
      texts: [],
      attributes: [],
      isAttachIframe: !0
    }), this.recordCrossOriginIframes && ((r = e.contentWindow) == null || r.addEventListener(
      "message",
      this.handleMessage.bind(this)
    )), (i = this.loadListener) == null || i.call(this, e), e.contentDocument && e.contentDocument.adoptedStyleSheets && e.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(
      e.contentDocument.adoptedStyleSheets,
      this.mirror.getId(e.contentDocument)
    );
  }
  handleMessage(e) {
    const t = e;
    if (t.data.type !== "rrweb" || // To filter out the rrweb messages which are forwarded by some sites.
    t.origin !== t.data.origin || !e.source) return;
    const i = this.crossOriginIframeMap.get(e.source);
    if (!i) return;
    const n = this.transformCrossOriginEvent(
      i,
      t.data.event
    );
    n && this.wrappedEmit(
      n,
      t.data.isCheckout
    );
  }
  transformCrossOriginEvent(e, t) {
    var r;
    switch (t.type) {
      case R.FullSnapshot: {
        this.crossOriginIframeMirror.reset(e), this.crossOriginIframeStyleMirror.reset(e), this.replaceIdOnNode(t.data.node, e);
        const i = t.data.node.id;
        return this.crossOriginIframeRootIdMap.set(e, i), this.patchRootIdOnNode(t.data.node, i), {
