    t = new URL(s, e ?? window.location.href);
  } catch {
    return null;
  }
  const r = /\.([0-9a-z]+)(?:$)/i, i = t.pathname.match(r);
  return (i == null ? void 0 : i[1]) ?? null;
}
function Sa(s) {
  let e = "";
  return s.indexOf("//") > -1 ? e = s.split("/").slice(0, 3).join("/") : e = s.split("/")[0], e = e.split("?")[0], e;
}
const ba = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm, Ca = /^(?:[a-z+]+:)?\/\//i, va = /^www\..*/i, Ia = /^(data:)([^,]*),(.*)/i;
function Gt(s, e) {
  return (s || "").replace(
    ba,
    (t, r, i, n, o, l) => {
      const a = i || o || l, u = r || n || "";
      if (!a)
        return t;
      if (Ca.test(a) || va.test(a))
        return `url(${u}${a}${u})`;
      if (Ia.test(a))
        return `url(${u}${a}${u})`;
      if (a[0] === "/")
        return `url(${u}${Sa(e) + a}${u})`;
      const c = e.split("/"), h = a.split("/");
      c.pop();
      for (const d of h)
        d !== "." && (d === ".." ? c.pop() : c.push(d));
      return `url(${u}${c.join("/")}${u})`;
    }
  );
}
function Sr(s) {
  return s.replace(/(\/\*[^*]*\*\/)|[\s;]/g, "");
}
function xa(s, e) {
  const t = Array.from(e.childNodes), r = [];
  if (t.length > 1 && s && typeof s == "string") {
    const i = Sr(s);
    for (let n = 1; n < t.length; n++)
      if (t[n].textContent && typeof t[n].textContent == "string") {
        const o = Sr(t[n].textContent);
        for (let l = 3; l < o.length; l++) {
          const a = o.substring(0, l);
          if (i.split(a).length === 2) {
            const u = i.indexOf(a);
            for (let c = u; c < s.length; c++)
              if (Sr(s.substring(0, c)).length === u) {
                r.push(s.substring(0, c)), s = s.substring(c);
                break;
              }
            break;
          }
        }
      }
  }
  return r.push(s), r;
}
function Ra(s, e) {
  return xa(s, e).join("/* rr_split */");
}
let Oa = 1;
const Aa = new RegExp("[^a-z0-9-_:]"), Ke = -2;
function Ki() {
  return Oa++;
}
function Ea(s) {
  if (s instanceof HTMLFormElement)
    return "form";
  const e = ve(s.tagName);
  return Aa.test(e) ? "div" : e;
}
let Re, Ys;
const Ma = /^[^ \t\n\r\u000c]+/, $a = /^[, \t\n\r\u000c]+/;
function Na(s, e) {
  if (e.trim() === "")
    return e;
  let t = 0;
  function r(n) {
    let o;
    const l = n.exec(e.substring(t));
    return l ? (o = l[0], t += o.length, o) : "";
  }
  const i = [];
  for (; r($a), !(t >= e.length); ) {
    let n = r(Ma);
    if (n.slice(-1) === ",")
      n = Ee(s, n.substring(0, n.length - 1)), i.push(n);
    else {
      let o = "";
      n = Ee(s, n);
      let l = !1;
      for (; ; ) {
        const a = e.charAt(t);
        if (a === "") {
          i.push((n + o).trim());
          break;
        } else if (l)
          a === ")" && (l = !1);
