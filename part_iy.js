}
function ef({
  mediaInteractionCb: s,
  blockClass: e,
  blockSelector: t,
  mirror: r,
  sampling: i,
  doc: n
}) {
  const o = x(
    (a) => ot(
      x((u) => {
        const c = ht(u);
        if (!c || J(c, e, t, !0))
          return;
        const { currentTime: h, volume: d, muted: m, playbackRate: g, loop: p } = c;
        s({
          type: a,
          id: r.getId(c),
          currentTime: h,
          volume: d,
          muted: m,
          playbackRate: g,
          loop: p
        });
      }),
      i.media || 500
    )
  ), l = [
    Z("play", o(Ae.Play), n),
    Z("pause", o(Ae.Pause), n),
    Z("seeked", o(Ae.Seeked), n),
    Z("volumechange", o(Ae.VolumeChange), n),
    Z("ratechange", o(Ae.RateChange), n)
  ];
  return x(() => {
    l.forEach((a) => a());
  });
}
function tf({ fontCb: s, doc: e }) {
  const t = e.defaultView;
  if (!t)
    return () => {
    };
  const r = [], i = /* @__PURE__ */ new WeakMap(), n = t.FontFace;
  t.FontFace = function(a, u, c) {
    const h = new n(a, u, c);
    return i.set(h, {
      family: a,
      buffer: typeof u != "string",
      descriptors: c,
      fontSource: typeof u == "string" ? u : JSON.stringify(Array.from(new Uint8Array(u)))
    }), h;
  };
  const o = Ue(
    e.fonts,
    "add",
    function(l) {
      return function(a) {
        return setTimeout(
          x(() => {
            const u = i.get(a);
            u && (s(u), i.delete(a));
          }),
          0
        ), l.apply(this, [a]);
      };
    }
  );
  return r.push(() => {
    t.FontFace = n;
  }), r.push(o), x(() => {
    r.forEach((l) => l());
  });
}
function rf(s) {
  const { doc: e, mirror: t, blockClass: r, blockSelector: i, selectionCb: n } = s;
  let o = !0;
  const l = x(() => {
    const a = e.getSelection();
    if (!a || o && (a != null && a.isCollapsed)) return;
    o = a.isCollapsed || !1;
    const u = [], c = a.rangeCount || 0;
    for (let h = 0; h < c; h++) {
      const d = a.getRangeAt(h), { startContainer: m, startOffset: g, endContainer: p, endOffset: f } = d;
      J(m, r, i, !0) || J(p, r, i, !0) || u.push({
        start: t.getId(m),
        startOffset: g,
        end: t.getId(p),
        endOffset: f
      });
    }
    n({ ranges: u });
  });
  return l(), Z("selectionchange", l);
}
function sf({
  doc: s,
  customElementCb: e
}) {
