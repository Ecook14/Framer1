    let i = { node: this };
    for (let n in r) i[n] = r[n];
    return e.warn(t, i);
  }
  get proxyOf() {
    return this;
  }
};
var ur = Qr;
Qr.default = Qr;
let ju = ur, qr = class extends ju {
  constructor(e) {
    e && typeof e.value < "u" && typeof e.value != "string" && (e = { ...e, value: String(e.value) }), super(e), this.type = "decl";
  }
  get variable() {
    return this.prop.startsWith("--") || this.prop[0] === "$";
  }
};
var cr = qr;
qr.default = qr;
let Hu = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Yu = (s = 21) => {
  let e = "", t = s;
  for (; t--; )
    e += Hu[Math.random() * 64 | 0];
  return e;
};
var Zu = { nanoid: Yu };
let { SourceMapConsumer: mi, SourceMapGenerator: gi } = ne, { existsSync: Ju, readFileSync: Xu } = ne, { dirname: xr, join: Ku } = ne;
function Qu(s) {
  return Buffer ? Buffer.from(s, "base64").toString() : window.atob(s);
}
let es = class {
  constructor(e, t) {
    if (t.map === !1) return;
    this.loadAnnotation(e), this.inline = this.startWith(this.annotation, "data:");
    let r = t.map ? t.map.prev : void 0, i = this.loadMap(t.from, r);
    !this.mapFile && t.from && (this.mapFile = t.from), this.mapFile && (this.root = xr(this.mapFile)), i && (this.text = i);
  }
  consumer() {
    return this.consumerCache || (this.consumerCache = new mi(this.text)), this.consumerCache;
  }
  decodeInline(e) {
    let t = /^data:application\/json;charset=utf-?8;base64,/, r = /^data:application\/json;base64,/, i = /^data:application\/json;charset=utf-?8,/, n = /^data:application\/json,/;
    if (i.test(e) || n.test(e))
      return decodeURIComponent(e.substr(RegExp.lastMatch.length));
    if (t.test(e) || r.test(e))
      return Qu(e.substr(RegExp.lastMatch.length));
    let o = e.match(/data:application\/json;([^,]+),/)[1];
    throw new Error("Unsupported source map encoding " + o);
  }
  getAnnotationURL(e) {
    return e.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
  }
  isMap(e) {
    return typeof e != "object" ? !1 : typeof e.mappings == "string" || typeof e._mappings == "string" || Array.isArray(e.sections);
  }
  loadAnnotation(e) {
    let t = e.match(/\/\*\s*# sourceMappingURL=/gm);
    if (!t) return;
    let r = e.lastIndexOf(t.pop()), i = e.indexOf("*/", r);
    r > -1 && i > -1 && (this.annotation = this.getAnnotationURL(e.substring(r, i)));
  }
  loadFile(e) {
    if (this.root = xr(e), Ju(e))
      return this.mapFile = e, Xu(e, "utf-8").toString().trim();
  }
  loadMap(e, t) {
    if (t === !1) return !1;
    if (t) {
      if (typeof t == "string")
        return t;
      if (typeof t == "function") {
        let r = t(e);
        if (r) {
          let i = this.loadFile(r);
          if (!i)
            throw new Error(
              "Unable to load previous source map: " + r.toString()
            );
          return i;
        }
      } else {
        if (t instanceof mi)
          return gi.fromSourceMap(t).toString();
        if (t instanceof gi)
          return t.toString();
        if (this.isMap(t))
          return JSON.stringify(t);
        throw new Error(
          "Unsupported previous source map format: " + t.toString()
        );
      }
    } else {
      if (this.inline)
        return this.decodeInline(this.annotation);
      if (this.annotation) {
        let r = this.annotation;
        return e && (r = Ku(xr(e), r)), this.loadFile(r);
      }
    }
