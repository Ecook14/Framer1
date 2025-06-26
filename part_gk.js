function na(s) {
  return Hi("Node", s, "getRootNode")();
}
function oa(s) {
  return !s || !("host" in s) ? null : me("ShadowRoot", s, "host");
}
function aa(s) {
  return s.styleSheets;
}
function la(s) {
  return !s || !("shadowRoot" in s) ? null : me("Element", s, "shadowRoot");
}
function ua(s, e) {
  return me("Element", s, "querySelector")(e);
}
function ca(s, e) {
  return me("Element", s, "querySelectorAll")(e);
}
function ha() {
  return fs("MutationObserver").constructor;
}
const Y = {
  childNodes: ea,
  parentNode: ta,
  parentElement: ra,
  textContent: sa,
  contains: ia,
  getRootNode: na,
  host: oa,
  styleSheets: aa,
  shadowRoot: la,
  querySelector: ua,
  querySelectorAll: ca,
  mutationObserver: ha
};
function Yi(s) {
  return s.nodeType === s.ELEMENT_NODE;
}
function Ye(s) {
  const e = (
    // anchor and textarea elements also have a `host` property
    // but only shadow roots have a `mode` property
    s && "host" in s && "mode" in s && Y.host(s) || null
  );
  return !!(e && "shadowRoot" in e && Y.shadowRoot(e) === s);
}
function Ze(s) {
  return Object.prototype.toString.call(s) === "[object ShadowRoot]";
}
function fa(s) {
  return s.includes(" background-clip: text;") && !s.includes(" -webkit-background-clip: text;") && (s = s.replace(
    /\sbackground-clip:\s*text;/g,
    " -webkit-background-clip: text; background-clip: text;"
  )), s;
}
function pa(s) {
  const { cssText: e } = s;
  if (e.split('"').length < 3) return e;
  const t = ["@import", `url(${JSON.stringify(s.href)})`];
  return s.layerName === "" ? t.push("layer") : s.layerName && t.push(`layer(${s.layerName})`), s.supportsText && t.push(`supports(${s.supportsText})`), s.media.length && t.push(s.media.mediaText), t.join(" ") + ";";
}
function kr(s) {
  try {
    const e = s.rules || s.cssRules;
    if (!e)
      return null;
    let t = s.href;
    !t && s.ownerNode && s.ownerNode.ownerDocument && (t = s.ownerNode.ownerDocument.location.href);
    const r = Array.from(
      e,
      (i) => Zi(i, t)
    ).join("");
    return fa(r);
  } catch {
    return null;
  }
}
function Zi(s, e) {
  if (ma(s)) {
    let t;
    try {
      t = // for same-origin stylesheets,
      // we can access the imported stylesheet rules directly
      kr(s.styleSheet) || // work around browser issues with the raw string `@import url(...)` statement
      pa(s);
    } catch {
      t = s.cssText;
    }
    return s.styleSheet.href ? Gt(t, s.styleSheet.href) : t;
  } else {
    let t = s.cssText;
    return ga(s) && s.selectorText.includes(":") && (t = da(t)), e ? Gt(t, e) : t;
  }
}
function da(s) {
  const e = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
  return s.replace(e, "$1\\$2");
}
function ma(s) {
  return "styleSheet" in s;
