  } catch {
  }
  return !!(t && (i.matches(t) || r && i.closest(t) !== null));
}
function _h(s, e) {
  return e.getId(s) !== -1;
}
function $r(s, e, t) {
  return s.tagName === "TITLE" && t.headTitleMutations ? !0 : e.getId(s) === Ke;
}
function Mo(s, e) {
  if (Ye(s))
    return !1;
  const t = e.getId(s);
  if (!e.has(t))
    return !0;
  const r = v.parentNode(s);
  return r && r.nodeType === s.DOCUMENT_NODE ? !1 : r ? Mo(r, e) : !0;
}
function us(s) {
  return !!s.changedTouches;
}
function Lh(s = window) {
  "NodeList" in s && !s.NodeList.prototype.forEach && (s.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in s && !s.DOMTokenList.prototype.forEach && (s.DOMTokenList.prototype.forEach = Array.prototype.forEach);
}
function $o(s, e) {
  return !!(s.nodeName === "IFRAME" && e.getMeta(s));
}
function No(s, e) {
  return !!(s.nodeName === "LINK" && s.nodeType === s.ELEMENT_NODE && s.getAttribute && s.getAttribute("rel") === "stylesheet" && e.getMeta(s));
}
function cs(s) {
  return s ? s instanceof _s && "shadowRoot" in s ? !!s.shadowRoot : !!v.shadowRoot(s) : !1;
}
class Fh {
  constructor() {
    w(this, "id", 1), w(this, "styleIDMap", /* @__PURE__ */ new WeakMap()), w(this, "idStyleMap", /* @__PURE__ */ new Map());
  }
  getId(e) {
    return this.styleIDMap.get(e) ?? -1;
  }
  has(e) {
    return this.styleIDMap.has(e);
  }
  /**
   * @returns If the stylesheet is in the mirror, returns the id of the stylesheet. If not, return the new assigned id.
   */
  add(e, t) {
    if (this.has(e)) return this.getId(e);
    let r;
    return t === void 0 ? r = this.id++ : r = t, this.styleIDMap.set(e, r), this.idStyleMap.set(r, e), r;
  }
  getStyle(e) {
    return this.idStyleMap.get(e) || null;
  }
  reset() {
    this.styleIDMap = /* @__PURE__ */ new WeakMap(), this.idStyleMap = /* @__PURE__ */ new Map(), this.id = 1;
  }
  generateId() {
    return this.id++;
  }
}
function ko(s) {
  var e;
  let t = null;
  return "getRootNode" in s && ((e = v.getRootNode(s)) == null ? void 0 : e.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && v.host(v.getRootNode(s)) && (t = v.host(v.getRootNode(s))), t;
}
function Uh(s) {
  let e = s, t;
  for (; t = ko(e); )
    e = t;
  return e;
}
function Bh(s) {
  const e = s.ownerDocument;
  if (!e) return !1;
  const t = Uh(s);
  return v.contains(e, t);
}
function Po(s) {
  const e = s.ownerDocument;
  return e ? v.contains(e, s) || Bh(s) : !1;
}
var R = /* @__PURE__ */ ((s) => (s[s.DomContentLoaded = 0] = "DomContentLoaded", s[s.Load = 1] = "Load", s[s.FullSnapshot = 2] = "FullSnapshot", s[s.IncrementalSnapshot = 3] = "IncrementalSnapshot", s[s.Meta = 4] = "Meta", s[s.Custom = 5] = "Custom", s[s.Plugin = 6] = "Plugin", s))(R || {}), I = /* @__PURE__ */ ((s) => (s[s.Mutation = 0] = "Mutation", s[s.MouseMove = 1] = "MouseMove", s[s.MouseInteraction = 2] = "MouseInteraction", s[s.Scroll = 3] = "Scroll", s[s.ViewportResize = 4] = "ViewportResize", s[s.Input = 5] = "Input", s[s.TouchMove = 6] = "TouchMove", s[s.MediaInteraction = 7] = "MediaInteraction", s[s.StyleSheetRule = 8] = "StyleSheetRule", s[s.CanvasMutation = 9] = "CanvasMutation", s[s.Font = 10] = "Font", s[s.Log = 11] = "Log", s[s.Drag = 12] = "Drag", s[s.StyleDeclaration = 13] = "StyleDeclaration", s[s.Selection = 14] = "Selection", s[s.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", s[s.CustomElement = 16] = "CustomElement", s))(I || {}), K = /* @__PURE__ */ ((s) => (s[s.MouseUp = 0] = "MouseUp", s[s.MouseDown = 1] = "MouseDown", s[s.Click = 2] = "Click", s[s.ContextMenu = 3] = "ContextMenu", s[s.DblClick = 4] = "DblClick", s[s.Focus = 5] = "Focus", s[s.Blur = 6] = "Blur", s[s.TouchStart = 7] = "TouchStart", s[s.TouchMove_Departed = 8] = "TouchMove_Departed", s[s.TouchEnd = 9] = "TouchEnd", s[s.TouchCancel = 10] = "TouchCancel", s))(K || {}), he = /* @__PURE__ */ ((s) => (s[s.Mouse = 0] = "Mouse", s[s.Pen = 1] = "Pen", s[s.Touch = 2] = "Touch", s))(he || {}), Le = /* @__PURE__ */ ((s) => (s[s["2D"] = 0] = "2D", s[s.WebGL = 1] = "WebGL", s[s.WebGL2 = 2] = "WebGL2", s))(Le || {}), Ae = /* @__PURE__ */ ((s) => (s[s.Play = 0] = "Play", s[s.Pause = 1] = "Pause", s[s.Seeked = 2] = "Seeked", s[s.VolumeChange = 3] = "VolumeChange", s[s.RateChange = 4] = "RateChange", s))(Ae || {}), To = /* @__PURE__ */ ((s) => (s[s.Document = 0] = "Document", s[s.DocumentType = 1] = "DocumentType", s[s.Element = 2] = "Element", s[s.Text = 3] = "Text", s[s.CDATA = 4] = "CDATA", s[s.Comment = 5] = "Comment", s))(To || {});
function ki(s) {
  return "__ln" in s;
}
class zh {
  constructor() {
    w(this, "length", 0), w(this, "head", null), w(this, "tail", null);
  }
  get(e) {
    if (e >= this.length)
      throw new Error("Position outside of list range");
    let t = this.head;
    for (let r = 0; r < e; r++)
      t = (t == null ? void 0 : t.next) || null;
    return t;
  }
  addNode(e) {
