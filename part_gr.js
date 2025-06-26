    doc: t,
    mirror: r,
    blockClass: i,
    blockSelector: n,
    needsMask: W,
    inlineStylesheet: u,
    maskInputOptions: c,
    maskTextFn: h,
    maskInputFn: d,
    dataURLOptions: g,
    inlineImages: p,
    recordCanvas: f,
    keepIframeSrcFn: P,
    newlyAddedElement: j,
    cssCaptured: _
  });
  if (!Q)
    return console.warn(s, "not serialized"), null;
  let oe;
  r.hasNode(s) ? oe = r.getId(s) : Ba(Q, m) || !H && Q.type === G.Text && !Q.textContent.replace(/^\s+|\s+$/gm, "").length ? oe = Ke : oe = Ki();
  const O = Object.assign(Q, { id: oe });
  if (r.add(s, O), oe === Ke)
    return null;
  S && S(s);
  let Be = !a;
  if (O.type === G.Element) {
    Be = Be && !O.needBlock, delete O.needBlock;
    const V = Y.shadowRoot(s);
    V && Ze(V) && (O.isShadowHost = !0);
  }
  if ((O.type === G.Document || O.type === G.Element) && Be) {
    m.headWhitespace && O.type === G.Element && O.tagName === "head" && (H = !1);
    const V = {
      doc: t,
      mirror: r,
      blockClass: i,
      blockSelector: n,
      needsMask: W,
      maskTextClass: o,
      maskTextSelector: l,
      skipChild: a,
      inlineStylesheet: u,
      maskInputOptions: c,
      maskTextFn: h,
      maskInputFn: d,
      slimDOMOptions: m,
      dataURLOptions: g,
      inlineImages: p,
      recordCanvas: f,
      preserveWhiteSpace: H,
      onSerialize: S,
      onIframeLoad: b,
      iframeLoadTimeout: y,
      onStylesheetLoad: C,
      stylesheetLoadTimeout: $,
      keepIframeSrcFn: P,
      cssCaptured: !1
    };
    if (!(O.type === G.Element && O.tagName === "textarea" && O.attributes.value !== void 0)) {
      O.type === G.Element && O.attributes._cssText !== void 0 && typeof O.attributes._cssText == "string" && (V.cssCaptured = !0);
      for (const ye of Array.from(Y.childNodes(s))) {
        const ae = Me(ye, V);
        ae && O.childNodes.push(ae);
      }
    }
    let q = null;
    if (Yi(s) && (q = Y.shadowRoot(s)))
      for (const ye of Array.from(Y.childNodes(q))) {
        const ae = Me(ye, V);
        ae && (Ze(q) && (ae.isShadow = !0), O.childNodes.push(ae));
      }
  }
  const ze = Y.parentNode(s);
  return ze && Ye(ze) && Ze(ze) && (O.isShadow = !0), O.type === G.Element && O.tagName === "iframe" && Ta(
    s,
    () => {
      const V = s.contentDocument;
      if (V && b) {
        const q = Me(V, {
          doc: V,
          mirror: r,
          blockClass: i,
          blockSelector: n,
          needsMask: W,
          maskTextClass: o,
          maskTextSelector: l,
          skipChild: !1,
          inlineStylesheet: u,
          maskInputOptions: c,
          maskTextFn: h,
          maskInputFn: d,
          slimDOMOptions: m,
          dataURLOptions: g,
          inlineImages: p,
          recordCanvas: f,
          preserveWhiteSpace: H,
          onSerialize: S,
          onIframeLoad: b,
          iframeLoadTimeout: y,
          onStylesheetLoad: C,
