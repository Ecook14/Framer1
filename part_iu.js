  const o = x(
    ot(
      x((l) => {
        const a = ht(l);
        if (!a || J(a, r, i, !0))
          return;
        const u = t.getId(a);
        if (a === e && e.defaultView) {
          const c = Ro(e.defaultView);
          s({
            id: u,
            x: c.left,
            y: c.top
          });
        } else
          s({
            id: u,
            x: a.scrollLeft,
            y: a.scrollTop
          });
      }),
      n.scroll || 100
    )
  );
  return Z("scroll", o, e);
}
function Jh({ viewportResizeCb: s }, { win: e }) {
  let t = -1, r = -1;
  const i = x(
    ot(
      x(() => {
        const n = Oo(), o = Ao();
        (t !== n || r !== o) && (s({
          width: Number(o),
          height: Number(n)
        }), t = n, r = o);
      }),
      200
    )
  );
  return Z("resize", i, e);
}
const Xh = ["INPUT", "TEXTAREA", "SELECT"], _i = /* @__PURE__ */ new WeakMap();
function Kh({
  inputCb: s,
  doc: e,
  mirror: t,
  blockClass: r,
  blockSelector: i,
  ignoreClass: n,
  ignoreSelector: o,
  maskInputOptions: l,
  maskInputFn: a,
  sampling: u,
  userTriggeredOnInput: c
}) {
  function h(b) {
    let y = ht(b);
    const C = b.isTrusted, $ = y && y.tagName;
    if (y && $ === "OPTION" && (y = v.parentElement(y)), !y || !$ || Xh.indexOf($) < 0 || J(y, r, i, !0) || y.classList.contains(n) || o && y.matches(o))
      return;
    let P = y.value, j = !1;
    const _ = ds(y) || "";
    _ === "radio" || _ === "checkbox" ? j = y.checked : (l[$.toLowerCase()] || l[_]) && (P = ps({
      element: y,
      maskInputOptions: l,
      tagName: $,
      type: _,
      value: P,
      maskInputFn: a
    })), d(
      y,
      c ? { text: P, isChecked: j, userTriggered: C } : { text: P, isChecked: j }
    );
    const W = y.name;
    _ === "radio" && W && j && e.querySelectorAll(`input[type="radio"][name="${W}"]`).forEach((H) => {
      if (H !== y) {
        const Q = H.value;
        d(
          H,
          c ? { text: Q, isChecked: !j, userTriggered: !1 } : { text: Q, isChecked: !j }
        );
      }
    });
  }
  function d(b, y) {
    const C = _i.get(b);
    if (!C || C.text !== y.text || C.isChecked !== y.isChecked) {
      _i.set(b, y);
      const $ = t.getId(b);
      x(s)({
        ...y,
        id: $
      });
    }
  }
  const g = (u.input === "last" ? ["change"] : ["input", "change"]).map(
    (b) => Z(b, x(h), e)
  ), p = e.defaultView;
  if (!p)
