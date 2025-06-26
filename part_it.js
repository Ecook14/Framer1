        const d = ht(h), { clientX: m, clientY: g } = us(h) ? h.changedTouches[0] : h;
        l || (l = er()), o.push({
          x: m,
          y: g,
          id: r.getId(d),
          timeOffset: er() - l
        }), a(
          typeof DragEvent < "u" && h instanceof DragEvent ? I.Drag : h instanceof MouseEvent ? I.MouseMove : I.TouchMove
        );
      }),
      i,
      {
        trailing: !1
      }
    )
  ), c = [
    Z("mousemove", u, t),
    Z("touchmove", u, t),
    Z("drag", u, t)
  ];
  return x(() => {
    c.forEach((h) => h());
  });
}
function Zh({
  mouseInteractionCb: s,
  doc: e,
  mirror: t,
  blockClass: r,
  blockSelector: i,
  sampling: n
}) {
  if (n.mouseInteraction === !1)
    return () => {
    };
  const o = n.mouseInteraction === !0 || n.mouseInteraction === void 0 ? {} : n.mouseInteraction, l = [];
  let a = null;
  const u = (c) => (h) => {
    const d = ht(h);
    if (J(d, r, i, !0))
      return;
    let m = null, g = c;
    if ("pointerType" in h) {
      switch (h.pointerType) {
        case "mouse":
          m = he.Mouse;
          break;
        case "touch":
          m = he.Touch;
          break;
        case "pen":
          m = he.Pen;
          break;
      }
      m === he.Touch ? K[c] === K.MouseDown ? g = "TouchStart" : K[c] === K.MouseUp && (g = "TouchEnd") : he.Pen;
    } else us(h) && (m = he.Touch);
    m !== null ? (a = m, (g.startsWith("Touch") && m === he.Touch || g.startsWith("Mouse") && m === he.Mouse) && (m = null)) : K[c] === K.Click && (m = a, a = null);
    const p = us(h) ? h.changedTouches[0] : h;
    if (!p)
      return;
    const f = t.getId(d), { clientX: S, clientY: b } = p;
    x(s)({
      type: K[g],
      id: f,
      x: S,
      y: b,
      ...m !== null && { pointerType: m }
    });
  };
  return Object.keys(K).filter(
    (c) => Number.isNaN(Number(c)) && !c.endsWith("_Departed") && o[c] !== !1
  ).forEach((c) => {
    let h = ve(c);
    const d = u(c);
    if (window.PointerEvent)
      switch (K[c]) {
        case K.MouseDown:
        case K.MouseUp:
          h = h.replace(
            "mouse",
            "pointer"
          );
          break;
        case K.TouchStart:
        case K.TouchEnd:
          return;
      }
    l.push(Z(h, d, e));
  }), x(() => {
    l.forEach((c) => c());
  });
}
function Lo({
  scrollCb: s,
  doc: e,
  mirror: t,
  blockClass: r,
  blockSelector: i,
  sampling: n
}) {
