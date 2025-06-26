      case Cl:
      case xl:
      case Rl:
      case El:
      case Ol:
      case Il: {
        let H = String.fromCharCode(n);
        g = [H, H, f];
        break;
      }
      case vl: {
        if (d = S.length ? S.pop()[1] : "", m = r.charCodeAt(f + 1), d === "url" && m !== Ir && m !== ni && m !== We && m !== St && m !== Ct && m !== bt && m !== vt) {
          o = f;
          do {
            if (c = !1, o = r.indexOf(")", o + 1), o === -1)
              if (i || W) {
                o = f;
                break;
              } else
                C("bracket");
            for (h = o; r.charCodeAt(h - 1) === wt; )
              h -= 1, c = !c;
          } while (c);
          g = ["brackets", r.slice(f, o + 1), f, o], f = o;
        } else
          o = r.indexOf(")", f + 1), a = r.slice(f, o + 1), o === -1 || $l.test(a) ? g = ["(", "(", f] : (g = ["brackets", a, f, o], f = o);
        break;
      }
      case Ir:
      case ni: {
        l = n === Ir ? "'" : '"', o = f;
        do {
          if (c = !1, o = r.indexOf(l, o + 1), o === -1)
            if (i || W) {
              o = f + 1;
              break;
            } else
              C("string");
          for (h = o; r.charCodeAt(h - 1) === wt; )
            h -= 1, c = !c;
        } while (c);
        g = ["string", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      case Ml: {
        It.lastIndex = f + 1, It.test(r), It.lastIndex === 0 ? o = r.length - 1 : o = It.lastIndex - 2, g = ["at-word", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      case wt: {
        for (o = f, u = !0; r.charCodeAt(o + 1) === wt; )
          o += 1, u = !u;
        if (n = r.charCodeAt(o + 1), u && n !== oi && n !== We && n !== St && n !== Ct && n !== vt && n !== bt && (o += 1, ai.test(r.charAt(o)))) {
          for (; ai.test(r.charAt(o + 1)); )
            o += 1;
          r.charCodeAt(o + 1) === We && (o += 1);
        }
        g = ["word", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      default: {
        n === oi && r.charCodeAt(f + 1) === Al ? (o = r.indexOf("*/", f + 2) + 1, o === 0 && (i || W ? o = r.length : C("comment")), g = ["comment", r.slice(f, o + 1), f, o], f = o) : (xt.lastIndex = f + 1, xt.test(r), xt.lastIndex === 0 ? o = r.length - 1 : o = xt.lastIndex - 2, g = ["word", r.slice(f, o + 1), f, o], S.push(g), f = o);
        break;
      }
    }
    return f++, g;
  }
  function j(_) {
    b.push(_);
  }
  return {
    back: j,
    endOfFile: $,
    nextToken: P,
    position: y
  };
};
let xn = Ie, Yt = class extends xn {
  constructor(e) {
    super(e), this.type = "atrule";
  }
  append(...e) {
    return this.proxyOf.nodes || (this.nodes = []), super.append(...e);
  }
  prepend(...e) {
    return this.proxyOf.nodes || (this.nodes = []), super.prepend(...e);
  }
};
var vs = Yt;
Yt.default = Yt;
xn.registerAtRule(Yt);
let Rn = Ie, On, An, Ne = class extends Rn {
  constructor(e) {
    super(e), this.type = "root", this.nodes || (this.nodes = []);
  }
  normalize(e, t, r) {
    let i = super.normalize(e);
    if (t) {
      if (r === "prepend")
        this.nodes.length > 1 ? t.raws.before = this.nodes[1].raws.before : delete t.raws.before;
      else if (this.first !== t)
