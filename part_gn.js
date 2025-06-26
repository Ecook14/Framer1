        else if (a === ",") {
          t += 1, i.push((n + o).trim());
          break;
        } else a === "(" && (l = !0);
        o += a, t += 1;
      }
    }
  }
  return i.join(", ");
}
const Zs = /* @__PURE__ */ new WeakMap();
function Ee(s, e) {
  return !e || e.trim() === "" ? e : ms(s, e);
}
function ka(s) {
  return !!(s.tagName === "svg" || s.ownerSVGElement);
}
function ms(s, e) {
  let t = Zs.get(s);
  if (t || (t = s.createElement("a"), Zs.set(s, t)), !e)
    e = "";
  else if (e.startsWith("blob:") || e.startsWith("data:"))
    return e;
  return t.setAttribute("href", e), t.href;
}
function Qi(s, e, t, r) {
  return r && (t === "src" || t === "href" && !(e === "use" && r[0] === "#") || t === "xlink:href" && r[0] !== "#" || t === "background" && (e === "table" || e === "td" || e === "th") ? Ee(s, r) : t === "srcset" ? Na(s, r) : t === "style" ? Gt(r, ms(s)) : e === "object" && t === "data" ? Ee(s, r) : r);
}
function qi(s, e, t) {
  return (s === "video" || s === "audio") && e === "autoplay";
}
function Pa(s, e, t) {
  try {
    if (typeof e == "string") {
      if (s.classList.contains(e))
        return !0;
    } else
      for (let r = s.classList.length; r--; ) {
        const i = s.classList[r];
        if (e.test(i))
          return !0;
      }
    if (t)
      return s.matches(t);
  } catch {
  }
  return !1;
}
function jt(s, e, t) {
  if (!s) return !1;
  if (s.nodeType !== s.ELEMENT_NODE)
    return t ? jt(Y.parentNode(s), e, t) : !1;
  for (let r = s.classList.length; r--; ) {
    const i = s.classList[r];
    if (e.test(i))
      return !0;
  }
  return t ? jt(Y.parentNode(s), e, t) : !1;
}
function en(s, e, t, r) {
  let i;
  if (Yi(s)) {
    if (i = s, !Y.childNodes(i).length)
      return !1;
  } else {
    if (Y.parentElement(s) === null)
      return !1;
    i = Y.parentElement(s);
  }
  try {
    if (typeof e == "string") {
      if (r) {
        if (i.closest(`.${e}`)) return !0;
      } else if (i.classList.contains(e)) return !0;
    } else if (jt(i, e, r)) return !0;
    if (t) {
      if (r) {
        if (i.closest(t)) return !0;
      } else if (i.matches(t)) return !0;
    }
  } catch {
  }
  return !1;
}
function Ta(s, e, t) {
  const r = s.contentWindow;
  if (!r)
    return;
  let i = !1, n;
  try {
    n = r.document.readyState;
  } catch {
    return;
  }
  if (n !== "complete") {
    const l = setTimeout(() => {
      i || (e(), i = !0);
    }, t);
    s.addEventListener("load", () => {
      clearTimeout(l), i = !0, e();
