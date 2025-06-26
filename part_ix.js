function Fo({
  mirror: s,
  stylesheetManager: e
}, t) {
  var r, i, n;
  let o = null;
  t.nodeName === "#document" ? o = s.getId(t) : o = s.getId(v.host(t));
  const l = t.nodeName === "#document" ? (r = t.defaultView) == null ? void 0 : r.Document : (n = (i = t.ownerDocument) == null ? void 0 : i.defaultView) == null ? void 0 : n.ShadowRoot, a = l != null && l.prototype ? Object.getOwnPropertyDescriptor(
    l == null ? void 0 : l.prototype,
    "adoptedStyleSheets"
  ) : void 0;
  return o === null || o === -1 || !l || !a ? () => {
  } : (Object.defineProperty(t, "adoptedStyleSheets", {
    configurable: a.configurable,
    enumerable: a.enumerable,
    get() {
      var u;
      return (u = a.get) == null ? void 0 : u.call(this);
    },
    set(u) {
      var c;
      const h = (c = a.set) == null ? void 0 : c.call(this, u);
      if (o !== null && o !== -1)
        try {
          e.adoptStyleSheets(u, o);
        } catch {
        }
      return h;
    }
  }), x(() => {
    Object.defineProperty(t, "adoptedStyleSheets", {
      configurable: a.configurable,
      enumerable: a.enumerable,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      get: a.get,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      set: a.set
    });
  }));
}
function qh({
  styleDeclarationCb: s,
  mirror: e,
  ignoreCSSAttributes: t,
  stylesheetManager: r
}, { win: i }) {
  const n = i.CSSStyleDeclaration.prototype.setProperty;
  i.CSSStyleDeclaration.prototype.setProperty = new Proxy(n, {
    apply: x(
      (l, a, u) => {
        var c;
        const [h, d, m] = u;
        if (t.has(h))
          return n.apply(a, [h, d, m]);
        const { id: g, styleId: p } = de(
          (c = a.parentRule) == null ? void 0 : c.parentStyleSheet,
          e,
          r.styleMirror
        );
        return (g && g !== -1 || p && p !== -1) && s({
          id: g,
          styleId: p,
          set: {
            property: h,
            value: d,
            priority: m
          },
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          index: tr(a.parentRule)
        }), l.apply(a, u);
      }
    )
  });
  const o = i.CSSStyleDeclaration.prototype.removeProperty;
  return i.CSSStyleDeclaration.prototype.removeProperty = new Proxy(o, {
    apply: x(
      (l, a, u) => {
        var c;
        const [h] = u;
        if (t.has(h))
          return o.apply(a, [h]);
        const { id: d, styleId: m } = de(
          (c = a.parentRule) == null ? void 0 : c.parentStyleSheet,
          e,
          r.styleMirror
        );
        return (d && d !== -1 || m && m !== -1) && s({
          id: d,
          styleId: m,
          remove: {
            property: h
          },
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          index: tr(a.parentRule)
        }), l.apply(a, u);
      }
    )
  }), x(() => {
    i.CSSStyleDeclaration.prototype.setProperty = n, i.CSSStyleDeclaration.prototype.removeProperty = o;
  });
