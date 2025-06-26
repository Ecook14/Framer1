
--- Start of threads.txt ---

{"threads":[]}

--- End of threads.txt ---


--- Start of track.txt ---

{ "status": 200 }

--- End of track.txt ---


--- Start of vantara-browser-api.js.txt ---

var Yo = Object.defineProperty;
var Zo = (s, e, t) => e in s ? Yo(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var X = (s, e, t) => Zo(s, typeof e != "symbol" ? e + "" : e, t);
var Jo = Object.defineProperty, Xo = (s, e, t) => e in s ? Jo(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, w = (s, e, t) => Xo(s, typeof e != "symbol" ? e + "" : e, t), Ws, Ko = Object.defineProperty, Qo = (s, e, t) => e in s ? Ko(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Vs = (s, e, t) => Qo(s, typeof e != "symbol" ? e + "" : e, t), G = /* @__PURE__ */ ((s) => (s[s.Document = 0] = "Document", s[s.DocumentType = 1] = "DocumentType", s[s.Element = 2] = "Element", s[s.Text = 3] = "Text", s[s.CDATA = 4] = "CDATA", s[s.Comment = 5] = "Comment", s))(G || {});
const Gs = {
  Node: ["childNodes", "parentNode", "parentElement", "textContent"],
  ShadowRoot: ["host", "styleSheets"],
  Element: ["shadowRoot", "querySelector", "querySelectorAll"],
  MutationObserver: []
}, js = {
  Node: ["contains", "getRootNode"],
  ShadowRoot: ["getSelection"],
  Element: [],
  MutationObserver: ["constructor"]
}, mt = {}, qo = () => !!globalThis.Zone;
function fs(s) {
  if (mt[s])
    return mt[s];
  const e = globalThis[s], t = e.prototype, r = s in Gs ? Gs[s] : void 0, i = !!(r && // @ts-expect-error 2345
  r.every(
    (l) => {
      var a, u;
      return !!((u = (a = Object.getOwnPropertyDescriptor(t, l)) == null ? void 0 : a.get) != null && u.toString().includes("[native code]"));
    }
  )), n = s in js ? js[s] : void 0, o = !!(n && n.every(
    // @ts-expect-error 2345
    (l) => {
      var a;
      return typeof t[l] == "function" && ((a = t[l]) == null ? void 0 : a.toString().includes("[native code]"));
    }
  ));
  if (i && o && !qo())
    return mt[s] = e.prototype, e.prototype;
  try {
    const l = document.createElement("iframe");
    document.body.appendChild(l);
    const a = l.contentWindow;
    if (!a) return e.prototype;
    const u = a[s].prototype;
    return document.body.removeChild(l), u ? mt[s] = u : t;
  } catch {
    return t;
  }
}
const yr = {};
function me(s, e, t) {
  var r;
  const i = `${s}.${String(t)}`;
  if (yr[i])
    return yr[i].call(
      e
    );
  const n = fs(s), o = (r = Object.getOwnPropertyDescriptor(
    n,
    t
  )) == null ? void 0 : r.get;
  return o ? (yr[i] = o, o.call(e)) : e[t];
}
const wr = {};
function Hi(s, e, t) {
  const r = `${s}.${String(t)}`;
  if (wr[r])
    return wr[r].bind(
      e
    );
  const n = fs(s)[t];
  return typeof n != "function" ? e[t] : (wr[r] = n, n.bind(e));
}
function ea(s) {
  return me("Node", s, "childNodes");
}
function ta(s) {
  return me("Node", s, "parentNode");
}
function ra(s) {
  return me("Node", s, "parentElement");
}
function sa(s) {
  return me("Node", s, "textContent");
}
function ia(s, e) {
  return Hi("Node", s, "contains")(e);
}
