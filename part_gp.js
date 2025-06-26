  if (!e.hasNode(s)) return;
  const t = e.getId(s);
  return t === 1 ? void 0 : t;
}
function Fa(s, e) {
  const { needsMask: t, maskTextFn: r, rootId: i, cssCaptured: n } = e, o = Y.parentNode(s), l = o && o.tagName;
  let a = "";
  const u = l === "STYLE" ? !0 : void 0, c = l === "SCRIPT" ? !0 : void 0;
  return c ? a = "SCRIPT_PLACEHOLDER" : n || (a = Y.textContent(s), u && a && (a = Gt(a, ms(e.doc)))), !u && !c && a && t && (a = r ? r(a, Y.parentElement(s)) : a.replace(/[\S]/g, "*")), {
    type: G.Text,
    textContent: a || "",
    rootId: i
  };
}
function Ua(s, e) {
  const {
    doc: t,
    blockClass: r,
    blockSelector: i,
    inlineStylesheet: n,
    maskInputOptions: o = {},
    maskInputFn: l,
    dataURLOptions: a = {},
    inlineImages: u,
    recordCanvas: c,
    keepIframeSrcFn: h,
    newlyAddedElement: d = !1,
    rootId: m
  } = e, g = Pa(s, r, i), p = Ea(s);
  let f = {};
  const S = s.attributes.length;
  for (let y = 0; y < S; y++) {
    const C = s.attributes[y];
    qi(p, C.name, C.value) || (f[C.name] = Qi(
      t,
      p,
      ve(C.name),
      C.value
    ));
  }
  if (p === "link" && n) {
    const y = Array.from(t.styleSheets).find(($) => $.href === s.href);
    let C = null;
    y && (C = kr(y)), C && (delete f.rel, delete f.href, f._cssText = C);
  }
  if (p === "style" && s.sheet) {
    let y = kr(
      s.sheet
    );
    y && (s.childNodes.length > 1 && (y = Ra(y, s)), f._cssText = y);
  }
  if (p === "input" || p === "textarea" || p === "select") {
    const y = s.value, C = s.checked;
    f.type !== "radio" && f.type !== "checkbox" && f.type !== "submit" && f.type !== "button" && y ? f.value = ps({
      element: s,
      type: ds(s),
      tagName: p,
      value: y,
      maskInputOptions: o,
      maskInputFn: l
    }) : C && (f.checked = C);
  }
  if (p === "option" && (s.selected && !o.select ? f.selected = !0 : delete f.selected), p === "dialog" && s.open && (f.rr_open_mode = s.matches("dialog:modal") ? "modal" : "non-modal"), p === "canvas" && c) {
    if (s.__context === "2d")
      wa(s) || (f.rr_dataURL = s.toDataURL(
        a.type,
        a.quality
      ));
    else if (!("__context" in s)) {
      const y = s.toDataURL(
        a.type,
        a.quality
      ), C = t.createElement("canvas");
      C.width = s.width, C.height = s.height;
      const $ = C.toDataURL(
        a.type,
        a.quality
      );
      y !== $ && (f.rr_dataURL = y);
    }
  }
  if (p === "img" && u) {
    Re || (Re = t.createElement("canvas"), Ys = Re.getContext("2d"));
    const y = s, C = y.currentSrc || y.getAttribute("src") || "<unknown-src>", $ = y.crossOrigin, P = () => {
      y.removeEventListener("load", P);
      try {
        Re.width = y.naturalWidth, Re.height = y.naturalHeight, Ys.drawImage(y, 0, 0), f.rr_dataURL = Re.toDataURL(
          a.type,
          a.quality
        );
      } catch (j) {
        if (y.crossOrigin !== "anonymous") {
          y.crossOrigin = "anonymous", y.complete && y.naturalWidth !== 0 ? P() : y.addEventListener("load", P);
          return;
        } else
          console.warn(
            `Cannot inline img src=${C}! Error: ${j}`
          );
      }
      y.crossOrigin === "anonymous" && ($ ? f.crossOrigin = $ : y.removeAttribute("crossorigin"));
