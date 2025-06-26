  }
  unlock() {
    this.locked = !1, this.canvasManager.unlock(), this.emit();
  }
  reset() {
    this.shadowDomManager.reset(), this.canvasManager.reset();
  }
}
function hs(s, e) {
  s.delete(e), v.childNodes(e).forEach((t) => hs(s, t));
}
function Vh(s, e) {
  const t = [s];
  for (; t.length; ) {
    const r = t.pop();
    e.has(r) || (e.add(r), v.childNodes(r).forEach((i) => t.push(i)));
  }
}
function Ti(s, e, t) {
  return s.size === 0 ? !1 : Gh(s, e);
}
function Gh(s, e, t) {
  const r = v.parentNode(e);
  return r ? s.has(r) : !1;
}
function Di(s, e) {
  return s.size === 0 ? !1 : Do(s, e);
}
function Do(s, e) {
  const t = v.parentNode(e);
  return t ? s.has(t) ? !0 : Do(s, t) : !1;
}
let Je;
function jh(s) {
  Je = s;
}
function Hh() {
  Je = void 0;
}
const x = (s) => Je ? (...t) => {
  try {
    return s(...t);
  } catch (r) {
    if (Je && Je(r) === !0)
      return;
    throw r;
  }
} : s, Ce = [];
function ht(s) {
  try {
    if ("composedPath" in s) {
      const e = s.composedPath();
      if (e.length)
        return e[0];
    } else if ("path" in s && s.path.length)
      return s.path[0];
  } catch {
  }
  return s && s.target;
}
function _o(s, e) {
  const t = new Wh();
  Ce.push(t), t.init(s);
  const r = new (xo())(
    x(t.processMutations.bind(t))
  );
  return r.observe(e, {
    attributes: !0,
    attributeOldValue: !0,
    characterData: !0,
    characterDataOldValue: !0,
    childList: !0,
    subtree: !0
  }), r;
}
function Yh({
  mousemoveCb: s,
  sampling: e,
  doc: t,
  mirror: r
}) {
  if (e.mousemove === !1)
    return () => {
    };
  const i = typeof e.mousemove == "number" ? e.mousemove : 50, n = typeof e.mousemoveCallback == "number" ? e.mousemoveCallback : 500;
  let o = [], l;
  const a = ot(
    x(
      (h) => {
        const d = Date.now() - l;
        s(
          o.map((m) => (m.timeOffset -= d, m)),
          h
        ), o = [], l = null;
      }
    ),
    n
  ), u = x(
    ot(
      x((h) => {
