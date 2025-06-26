    maskTextSelector: u = null,
    inlineStylesheet: c = !0,
    maskAllInputs: h,
    maskInputOptions: d,
    slimDOMOptions: m,
    maskInputFn: g,
    maskTextFn: p,
    hooks: f,
    packFn: S,
    sampling: b = {},
    dataURLOptions: y = {},
    mousemoveWait: C,
    recordDOM: $ = !0,
    recordCanvas: P = !1,
    recordCrossOriginIframes: j = !1,
    recordAfter: _ = s.recordAfter === "DOMContentLoaded" ? s.recordAfter : "load",
    userTriggeredOnInput: W = !1,
    collectFonts: H = !1,
    inlineImages: Q = !1,
    plugins: oe,
    keepIframeSrcFn: O = () => !1,
    ignoreCSSAttributes: Be = /* @__PURE__ */ new Set([]),
    errorHandler: ze
  } = s;
  jh(ze);
  const V = j ? window.parent === window : !0;
  let q = !1;
  if (!V)
    try {
      window.parent.document && (q = !1);
    } catch {
      q = !0;
    }
  if (V && !e)
    throw new Error("emit function is required");
  if (!V && !q)
    return () => {
    };
  C !== void 0 && b.mousemove === void 0 && (b.mousemove = C), se.reset();
  const ye = h === !0 ? {
    color: !0,
    date: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
    textarea: !0,
    select: !0,
    password: !0
  } : d !== void 0 ? d : { password: !0 }, ae = m === !0 || m === "all" ? {
    script: !0,
    comment: !0,
    headFavicon: !0,
    headWhitespace: !0,
    headMetaSocial: !0,
    headMetaRobots: !0,
    headMetaHttpEquiv: !0,
    headMetaVerification: !0,
    // the following are off for slimDOMOptions === true,
    // as they destroy some (hidden) info:
    headMetaAuthorship: m === "all",
    headMetaDescKeywords: m === "all",
    headTitleMutations: m === "all"
  } : m || {};
  Lh();
  let Fs, dr = 0;
  const Us = (A) => {
    for (const re of oe || [])
      re.eventProcessor && (A = re.eventProcessor(A));
    return S && // Disable packing events which will be emitted to parent frames.
    !q && (A = S(A)), A;
  };
  z = (A, re) => {
    var U;
    const B = A;
    if (B.timestamp = er(), (U = Ce[0]) != null && U.isFrozen() && B.type !== R.FullSnapshot && !(B.type === R.IncrementalSnapshot && B.data.source === I.Mutation) && Ce.forEach((le) => le.unfreeze()), V)
      e == null || e(Us(B), re);
    else if (q) {
      const le = {
        type: "rrweb",
        event: Us(B),
        origin: window.location.origin,
        isCheckout: re
      };
      window.parent.postMessage(le, "*");
    }
    if (B.type === R.FullSnapshot)
      Fs = B, dr = 0;
    else if (B.type === R.IncrementalSnapshot) {
      if (B.data.source === I.Mutation && B.data.isAttachIframe)
        return;
      dr++;
      const le = r && dr >= r, N = t && B.timestamp - Fs.timestamp > t;
