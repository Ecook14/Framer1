      var a, u;
      return !!((u = (a = Object.getOwnPropertyDescriptor(t, l)) == null ? void 0 : a.get) != null && u.toString().includes("[native code]"));
    }
  )), n = s in $i ? $i[s] : void 0, o = !!(n && n.every(
    // @ts-expect-error 2345
    (l) => {
      var a;
      return typeof t[l] == "function" && ((a = t[l]) == null ? void 0 : a.toString().includes("[native code]"));
    }
  ));
  if (i && o && !xh())
    return Tt[s] = e.prototype, e.prototype;
  try {
    const l = document.createElement("iframe");
    document.body.appendChild(l);
    const a = l.contentWindow;
    if (!a) return e.prototype;
    const u = a[s].prototype;
    return document.body.removeChild(l), u ? Tt[s] = u : t;
  } catch {
    return t;
  }
}
const Er = {};
function ge(s, e, t) {
  var r;
  const i = `${s}.${String(t)}`;
  if (Er[i])
    return Er[i].call(
      e
    );
  const n = Ls(s), o = (r = Object.getOwnPropertyDescriptor(
    n,
    t
  )) == null ? void 0 : r.get;
  return o ? (Er[i] = o, o.call(e)) : e[t];
}
const Mr = {};
function Io(s, e, t) {
  const r = `${s}.${String(t)}`;
  if (Mr[r])
    return Mr[r].bind(
      e
    );
  const n = Ls(s)[t];
  return typeof n != "function" ? e[t] : (Mr[r] = n, n.bind(e));
}
function Rh(s) {
  return ge("Node", s, "childNodes");
}
function Oh(s) {
  return ge("Node", s, "parentNode");
}
function Ah(s) {
  return ge("Node", s, "parentElement");
}
function Eh(s) {
  return ge("Node", s, "textContent");
}
function Mh(s, e) {
  return Io("Node", s, "contains")(e);
}
function $h(s) {
  return Io("Node", s, "getRootNode")();
}
function Nh(s) {
  return !s || !("host" in s) ? null : ge("ShadowRoot", s, "host");
}
function kh(s) {
  return s.styleSheets;
}
function Ph(s) {
  return !s || !("shadowRoot" in s) ? null : ge("Element", s, "shadowRoot");
}
function Th(s, e) {
  return ge("Element", s, "querySelector")(e);
}
function Dh(s, e) {
  return ge("Element", s, "querySelectorAll")(e);
}
function xo() {
  return Ls("MutationObserver").constructor;
}
const v = {
  childNodes: Rh,
  parentNode: Oh,
  parentElement: Ah,
  textContent: Eh,
  contains: Mh,
  getRootNode: $h,
  host: Nh,
  styleSheets: kh,
  shadowRoot: Ph,
  querySelector: Th,
  querySelectorAll: Dh,
  mutationObserver: xo
};
function Z(s, e, t = document) {
  const r = { capture: !0, passive: !0 };
  return t.addEventListener(s, e, r), () => t.removeEventListener(s, e, r);
