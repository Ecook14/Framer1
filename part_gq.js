    };
    y.complete && y.naturalWidth !== 0 ? P() : y.addEventListener("load", P);
  }
  if (p === "audio" || p === "video") {
    const y = f;
    y.rr_mediaState = s.paused ? "paused" : "played", y.rr_mediaCurrentTime = s.currentTime, y.rr_mediaPlaybackRate = s.playbackRate, y.rr_mediaMuted = s.muted, y.rr_mediaLoop = s.loop, y.rr_mediaVolume = s.volume;
  }
  if (d || (s.scrollLeft && (f.rr_scrollLeft = s.scrollLeft), s.scrollTop && (f.rr_scrollTop = s.scrollTop)), g) {
    const { width: y, height: C } = s.getBoundingClientRect();
    f = {
      class: f.class,
      rr_width: `${y}px`,
      rr_height: `${C}px`
    };
  }
  p === "iframe" && !h(f.src) && (s.contentDocument || (f.rr_src = f.src), delete f.src);
  let b;
  try {
    customElements.get(p) && (b = !0);
  } catch {
  }
  return {
    type: G.Element,
    tagName: p,
    attributes: f,
    childNodes: [],
    isSVG: ka(s) || void 0,
    needBlock: g,
    rootId: m,
    isCustom: b
  };
}
function k(s) {
  return s == null ? "" : s.toLowerCase();
}
function Ba(s, e) {
  if (e.comment && s.type === G.Comment)
    return !0;
  if (s.type === G.Element) {
    if (e.script && // script tag
    (s.tagName === "script" || // (module)preload link
    s.tagName === "link" && (s.attributes.rel === "preload" || s.attributes.rel === "modulepreload") && s.attributes.as === "script" || // prefetch link
    s.tagName === "link" && s.attributes.rel === "prefetch" && typeof s.attributes.href == "string" && Xi(s.attributes.href) === "js"))
      return !0;
    if (e.headFavicon && (s.tagName === "link" && s.attributes.rel === "shortcut icon" || s.tagName === "meta" && (k(s.attributes.name).match(
      /^msapplication-tile(image|color)$/
    ) || k(s.attributes.name) === "application-name" || k(s.attributes.rel) === "icon" || k(s.attributes.rel) === "apple-touch-icon" || k(s.attributes.rel) === "shortcut icon")))
      return !0;
    if (s.tagName === "meta") {
      if (e.headMetaDescKeywords && k(s.attributes.name).match(/^description|keywords$/))
        return !0;
      if (e.headMetaSocial && (k(s.attributes.property).match(/^(og|twitter|fb):/) || // og = opengraph (facebook)
      k(s.attributes.name).match(/^(og|twitter):/) || k(s.attributes.name) === "pinterest"))
        return !0;
      if (e.headMetaRobots && (k(s.attributes.name) === "robots" || k(s.attributes.name) === "googlebot" || k(s.attributes.name) === "bingbot"))
        return !0;
      if (e.headMetaHttpEquiv && s.attributes["http-equiv"] !== void 0)
        return !0;
      if (e.headMetaAuthorship && (k(s.attributes.name) === "author" || k(s.attributes.name) === "generator" || k(s.attributes.name) === "framework" || k(s.attributes.name) === "publisher" || k(s.attributes.name) === "progid" || k(s.attributes.property).match(/^article:/) || k(s.attributes.property).match(/^product:/)))
        return !0;
      if (e.headMetaVerification && (k(s.attributes.name) === "google-site-verification" || k(s.attributes.name) === "yandex-verification" || k(s.attributes.name) === "csrf-token" || k(s.attributes.name) === "p:domain_verify" || k(s.attributes.name) === "verify-v1" || k(s.attributes.name) === "verification" || k(s.attributes.name) === "shopify-checkout-api-token"))
        return !0;
    }
  }
  return !1;
}
function Me(s, e) {
  const {
    doc: t,
    mirror: r,
    blockClass: i,
    blockSelector: n,
    maskTextClass: o,
    maskTextSelector: l,
    skipChild: a = !1,
    inlineStylesheet: u = !0,
    maskInputOptions: c = {},
    maskTextFn: h,
    maskInputFn: d,
    slimDOMOptions: m,
    dataURLOptions: g = {},
    inlineImages: p = !1,
    recordCanvas: f = !1,
    onSerialize: S,
    onIframeLoad: b,
    iframeLoadTimeout: y = 5e3,
    onStylesheetLoad: C,
    stylesheetLoadTimeout: $ = 5e3,
    keepIframeSrcFn: P = () => !1,
    newlyAddedElement: j = !1,
    cssCaptured: _ = !1
  } = e;
  let { needsMask: W } = e, { preserveWhiteSpace: H = !0 } = e;
  W || (W = en(
    s,
    o,
    l,
    W === void 0
  ));
  const Q = _a(s, {
