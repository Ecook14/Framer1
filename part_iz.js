  const t = s.defaultView;
  return !t || !t.customElements ? () => {
  } : Ue(
    t.customElements,
    "define",
    function(i) {
      return function(n, o, l) {
        try {
          e({
            define: {
              name: n
            }
          });
        } catch {
          console.warn(`Custom element callback failed for ${n}`);
        }
        return i.apply(this, [n, o, l]);
      };
    }
  );
}
function nf(s, e) {
  const {
    mutationCb: t,
    mousemoveCb: r,
    mouseInteractionCb: i,
    scrollCb: n,
    viewportResizeCb: o,
    inputCb: l,
    mediaInteractionCb: a,
    styleSheetRuleCb: u,
    styleDeclarationCb: c,
    canvasMutationCb: h,
    fontCb: d,
    selectionCb: m,
    customElementCb: g
  } = s;
  s.mutationCb = (...p) => {
    e.mutation && e.mutation(...p), t(...p);
  }, s.mousemoveCb = (...p) => {
    e.mousemove && e.mousemove(...p), r(...p);
  }, s.mouseInteractionCb = (...p) => {
    e.mouseInteraction && e.mouseInteraction(...p), i(...p);
  }, s.scrollCb = (...p) => {
    e.scroll && e.scroll(...p), n(...p);
  }, s.viewportResizeCb = (...p) => {
    e.viewportResize && e.viewportResize(...p), o(...p);
  }, s.inputCb = (...p) => {
    e.input && e.input(...p), l(...p);
  }, s.mediaInteractionCb = (...p) => {
    e.mediaInteaction && e.mediaInteaction(...p), a(...p);
  }, s.styleSheetRuleCb = (...p) => {
    e.styleSheetRule && e.styleSheetRule(...p), u(...p);
  }, s.styleDeclarationCb = (...p) => {
    e.styleDeclaration && e.styleDeclaration(...p), c(...p);
  }, s.canvasMutationCb = (...p) => {
    e.canvasMutation && e.canvasMutation(...p), h(...p);
  }, s.fontCb = (...p) => {
    e.font && e.font(...p), d(...p);
  }, s.selectionCb = (...p) => {
    e.selection && e.selection(...p), m(...p);
  }, s.customElementCb = (...p) => {
    e.customElement && e.customElement(...p), g(...p);
  };
}
function of(s, e = {}) {
  const t = s.doc.defaultView;
  if (!t)
    return () => {
    };
  nf(s, e);
  let r;
  s.recordDOM && (r = _o(s, s.doc));
  const i = Yh(s), n = Zh(s), o = Lo(s), l = Jh(s, {
    win: t
  }), a = Kh(s), u = ef(s);
  let c = () => {
  }, h = () => {
  }, d = () => {
  }, m = () => {
  };
  s.recordDOM && (c = Qh(s, { win: t }), h = Fo(s, s.doc), d = qh(s, {
    win: t
  }), s.collectFonts && (m = tf(s)));
  const g = rf(s), p = sf(s), f = [];
  for (const S of s.plugins)
    f.push(
      S.observer(S.callback, t, S.options)
    );
  return x(() => {
    Ce.forEach((S) => S.reset()), r == null || r.disconnect(), i(), n(), o(), l(), a(), u(), c(), h(), d(), m(), g(), p(), f.forEach((S) => S());
  });
}
function Dt(s) {
  return typeof window[s] < "u";
}
function _t(s) {
  return !!(typeof window[s] < "u" && // Note: Generally, this check _shouldn't_ be necessary
  // However, in some scenarios (e.g. jsdom) this can sometimes fail, so we check for it here
  window[s].prototype && "insertRule" in window[s].prototype && "deleteRule" in window[s].prototype);
