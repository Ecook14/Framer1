    });
    return;
  }
  const o = "about:blank";
  if (r.location.href !== o || s.src === o || s.src === "")
    return setTimeout(e, 0), s.addEventListener("load", e);
  s.addEventListener("load", e);
}
function Da(s, e, t) {
  let r = !1, i;
  try {
    i = s.sheet;
  } catch {
    return;
  }
  if (i) return;
  const n = setTimeout(() => {
    r || (e(), r = !0);
  }, t);
  s.addEventListener("load", () => {
    clearTimeout(n), r = !0, e();
  });
}
function _a(s, e) {
  const {
    doc: t,
    mirror: r,
    blockClass: i,
    blockSelector: n,
    needsMask: o,
    inlineStylesheet: l,
    maskInputOptions: a = {},
    maskTextFn: u,
    maskInputFn: c,
    dataURLOptions: h = {},
    inlineImages: d,
    recordCanvas: m,
    keepIframeSrcFn: g,
    newlyAddedElement: p = !1,
    cssCaptured: f = !1
  } = e, S = La(t, r);
  switch (s.nodeType) {
    case s.DOCUMENT_NODE:
      return s.compatMode !== "CSS1Compat" ? {
        type: G.Document,
        childNodes: [],
        compatMode: s.compatMode
        // probably "BackCompat"
      } : {
        type: G.Document,
        childNodes: []
      };
    case s.DOCUMENT_TYPE_NODE:
      return {
        type: G.DocumentType,
        name: s.name,
        publicId: s.publicId,
        systemId: s.systemId,
        rootId: S
      };
    case s.ELEMENT_NODE:
      return Ua(s, {
        doc: t,
        blockClass: i,
        blockSelector: n,
        inlineStylesheet: l,
        maskInputOptions: a,
        maskInputFn: c,
        dataURLOptions: h,
        inlineImages: d,
        recordCanvas: m,
        keepIframeSrcFn: g,
        newlyAddedElement: p,
        rootId: S
      });
    case s.TEXT_NODE:
      return Fa(s, {
        doc: t,
        needsMask: o,
        maskTextFn: u,
        rootId: S,
        cssCaptured: f
      });
    case s.CDATA_SECTION_NODE:
      return {
        type: G.CDATA,
        textContent: "",
        rootId: S
      };
    case s.COMMENT_NODE:
      return {
        type: G.Comment,
        textContent: Y.textContent(s) || "",
        rootId: S
      };
    default:
      return !1;
  }
}
function La(s, e) {
