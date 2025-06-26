          stylesheetLoadTimeout: $,
          keepIframeSrcFn: P
        });
        q && b(
          s,
          q
        );
      }
    },
    y
  ), O.type === G.Element && O.tagName === "link" && typeof O.attributes.rel == "string" && (O.attributes.rel === "stylesheet" || O.attributes.rel === "preload" && typeof O.attributes.href == "string" && Xi(O.attributes.href) === "css") && Da(
    s,
    () => {
      if (C) {
        const V = Me(s, {
          doc: t,
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
          stylesheetLoadTimeout: $,
          keepIframeSrcFn: P
        });
        V && C(
          s,
          V
        );
      }
    },
    $
  ), O;
}
function za(s, e) {
  const {
    mirror: t = new Ji(),
    blockClass: r = "rr-block",
    blockSelector: i = null,
    maskTextClass: n = "rr-mask",
    maskTextSelector: o = null,
    inlineStylesheet: l = !0,
    inlineImages: a = !1,
    recordCanvas: u = !1,
    maskAllInputs: c = !1,
    maskTextFn: h,
    maskInputFn: d,
    slimDOM: m = !1,
    dataURLOptions: g,
    preserveWhiteSpace: p,
    onSerialize: f,
    onIframeLoad: S,
    iframeLoadTimeout: b,
    onStylesheetLoad: y,
    stylesheetLoadTimeout: C,
    keepIframeSrcFn: $ = () => !1
  } = e || {};
  return Me(s, {
    doc: s,
    mirror: t,
    blockClass: r,
    blockSelector: i,
    maskTextClass: n,
    maskTextSelector: o,
    skipChild: !1,
    inlineStylesheet: l,
    maskInputOptions: c === !0 ? {
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
    } : c === !1 ? {
      password: !0
    } : c,
