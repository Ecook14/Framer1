    const t = {
      value: e,
      previous: null,
      next: null
    };
    if (e.__ln = t, e.previousSibling && ki(e.previousSibling)) {
      const r = e.previousSibling.__ln.next;
      t.next = r, t.previous = e.previousSibling.__ln, e.previousSibling.__ln.next = t, r && (r.previous = t);
    } else if (e.nextSibling && ki(e.nextSibling) && e.nextSibling.__ln.previous) {
      const r = e.nextSibling.__ln.previous;
      t.previous = r, t.next = e.nextSibling.__ln, e.nextSibling.__ln.previous = t, r && (r.next = t);
    } else
      this.head && (this.head.previous = t), t.next = this.head, this.head = t;
    t.next === null && (this.tail = t), this.length++;
  }
  removeNode(e) {
    const t = e.__ln;
    this.head && (t.previous ? (t.previous.next = t.next, t.next ? t.next.previous = t.previous : this.tail = t.previous) : (this.head = t.next, this.head ? this.head.previous = null : this.tail = null), e.__ln && delete e.__ln, this.length--);
  }
}
const Pi = (s, e) => `${s}@${e}`;
class Wh {
  constructor() {
    w(this, "frozen", !1), w(this, "locked", !1), w(this, "texts", []), w(this, "attributes", []), w(this, "attributeMap", /* @__PURE__ */ new WeakMap()), w(this, "removes", []), w(this, "mapRemoves", []), w(this, "movedMap", {}), w(this, "addedSet", /* @__PURE__ */ new Set()), w(this, "movedSet", /* @__PURE__ */ new Set()), w(this, "droppedSet", /* @__PURE__ */ new Set()), w(this, "removesSubTreeCache", /* @__PURE__ */ new Set()), w(this, "mutationCb"), w(this, "blockClass"), w(this, "blockSelector"), w(this, "maskTextClass"), w(this, "maskTextSelector"), w(this, "inlineStylesheet"), w(this, "maskInputOptions"), w(this, "maskTextFn"), w(this, "maskInputFn"), w(this, "keepIframeSrcFn"), w(this, "recordCanvas"), w(this, "inlineImages"), w(this, "slimDOMOptions"), w(this, "dataURLOptions"), w(this, "doc"), w(this, "mirror"), w(this, "iframeManager"), w(this, "stylesheetManager"), w(this, "shadowDomManager"), w(this, "canvasManager"), w(this, "processedNodeManager"), w(this, "unattachedDoc"), w(this, "processMutations", (e) => {
      e.forEach(this.processMutation), this.emit();
    }), w(this, "emit", () => {
      if (this.frozen || this.locked)
        return;
      const e = [], t = /* @__PURE__ */ new Set(), r = new zh(), i = (a) => {
        let u = a, c = Ke;
        for (; c === Ke; )
          u = u && u.nextSibling, c = u && this.mirror.getId(u);
        return c;
      }, n = (a) => {
        const u = v.parentNode(a);
        if (!u || !Po(a))
          return;
        let c = !1;
        if (a.nodeType === Node.TEXT_NODE) {
          const g = u.tagName;
          if (g === "TEXTAREA")
            return;
          g === "STYLE" && this.addedSet.has(u) && (c = !0);
        }
        const h = Ye(u) ? this.mirror.getId(ko(a)) : this.mirror.getId(u), d = i(a);
        if (h === -1 || d === -1)
          return r.addNode(a);
        const m = Me(a, {
          doc: this.doc,
          mirror: this.mirror,
          blockClass: this.blockClass,
          blockSelector: this.blockSelector,
          maskTextClass: this.maskTextClass,
          maskTextSelector: this.maskTextSelector,
          skipChild: !0,
          newlyAddedElement: !0,
          inlineStylesheet: this.inlineStylesheet,
          maskInputOptions: this.maskInputOptions,
          maskTextFn: this.maskTextFn,
          maskInputFn: this.maskInputFn,
          slimDOMOptions: this.slimDOMOptions,
          dataURLOptions: this.dataURLOptions,
          recordCanvas: this.recordCanvas,
          inlineImages: this.inlineImages,
          onSerialize: (g) => {
            $o(g, this.mirror) && this.iframeManager.addIframe(g), No(g, this.mirror) && this.stylesheetManager.trackLinkElement(
              g
            ), cs(a) && this.shadowDomManager.addShadowRoot(v.shadowRoot(a), this.doc);
          },
          onIframeLoad: (g, p) => {
            this.iframeManager.attachIframe(g, p), this.shadowDomManager.observeAttachShadow(g);
          },
          onStylesheetLoad: (g, p) => {
            this.stylesheetManager.attachLinkElement(g, p);
          },
          cssCaptured: c
        });
        m && (e.push({
          parentId: h,
          nextId: d,
          node: m
        }), t.add(m.id));
      };
      for (; this.mapRemoves.length; )
        this.mirror.removeNodeFromMap(this.mapRemoves.shift());
      for (const a of this.movedSet)
        Ti(this.removesSubTreeCache, a, this.mirror) && !this.movedSet.has(v.parentNode(a)) || n(a);
      for (const a of this.addedSet)
        !Di(this.droppedSet, a) && !Ti(this.removesSubTreeCache, a, this.mirror) || Di(this.movedSet, a) ? n(a) : this.droppedSet.add(a);
      let o = null;
      for (; r.length; ) {
        let a = null;
        if (o) {
          const u = this.mirror.getId(v.parentNode(o.value)), c = i(o.value);
          u !== -1 && c !== -1 && (a = o);
        }
        if (!a) {
          let u = r.tail;
          for (; u; ) {
            const c = u;
