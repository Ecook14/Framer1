}
const Oe = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`;
let Ni = {
  map: {},
  getId() {
    return console.error(Oe), -1;
  },
  getNode() {
    return console.error(Oe), null;
  },
  removeNodeFromMap() {
    console.error(Oe);
  },
  has() {
    return console.error(Oe), !1;
  },
  reset() {
    console.error(Oe);
  }
};
typeof window < "u" && window.Proxy && window.Reflect && (Ni = new Proxy(Ni, {
  get(s, e, t) {
    return e === "map" && console.error(Oe), Reflect.get(s, e, t);
  }
}));
function ot(s, e, t = {}) {
  let r = null, i = 0;
  return function(...n) {
    const o = Date.now();
    !i && t.leading === !1 && (i = o);
    const l = e - (o - i), a = this;
    l <= 0 || l > e ? (r && (clearTimeout(r), r = null), i = o, s.apply(a, n)) : !r && t.trailing !== !1 && (r = setTimeout(() => {
      i = t.leading === !1 ? 0 : Date.now(), r = null, s.apply(a, n);
    }, l));
  };
}
function pr(s, e, t, r, i = window) {
  const n = i.Object.getOwnPropertyDescriptor(s, e);
  return i.Object.defineProperty(
    s,
    e,
    r ? t : {
      set(o) {
        setTimeout(() => {
          t.set.call(this, o);
        }, 0), n && n.set && n.set.call(this, o);
      }
    }
  ), () => pr(s, e, n || {}, !0);
}
function Ue(s, e, t) {
  try {
    if (!(e in s))
      return () => {
      };
    const r = s[e], i = t(r);
    return typeof i == "function" && (i.prototype = i.prototype || {}, Object.defineProperties(i, {
      __rrweb_original__: {
        enumerable: !1,
        value: r
      }
    })), s[e] = i, () => {
      s[e] = r;
    };
  } catch {
    return () => {
    };
  }
}
let er = Date.now;
/* @__PURE__ */ /[1-9][0-9]{12}/.test(Date.now().toString()) || (er = () => (/* @__PURE__ */ new Date()).getTime());
function Ro(s) {
  var e, t, r, i;
  const n = s.document;
  return {
    left: n.scrollingElement ? n.scrollingElement.scrollLeft : s.pageXOffset !== void 0 ? s.pageXOffset : n.documentElement.scrollLeft || (n == null ? void 0 : n.body) && ((e = v.parentElement(n.body)) == null ? void 0 : e.scrollLeft) || ((t = n == null ? void 0 : n.body) == null ? void 0 : t.scrollLeft) || 0,
    top: n.scrollingElement ? n.scrollingElement.scrollTop : s.pageYOffset !== void 0 ? s.pageYOffset : (n == null ? void 0 : n.documentElement.scrollTop) || (n == null ? void 0 : n.body) && ((r = v.parentElement(n.body)) == null ? void 0 : r.scrollTop) || ((i = n == null ? void 0 : n.body) == null ? void 0 : i.scrollTop) || 0
  };
}
function Oo() {
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function Ao() {
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
function Eo(s) {
  return s ? s.nodeType === s.ELEMENT_NODE ? s : v.parentElement(s) : null;
}
function J(s, e, t, r) {
  if (!s)
    return !1;
  const i = Eo(s);
  if (!i)
    return !1;
  try {
    if (typeof e == "string") {
      if (i.classList.contains(e) || r && i.closest("." + e) !== null) return !0;
    } else if (jt(i, e, r)) return !0;
