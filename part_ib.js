        g = ["space", r.slice(f, o)], f = o - 1;
        break;
      }
      case fc:
      case pc:
      case gc:
      case yc:
      case bc:
      case wc:
      case mc: {
        let H = String.fromCharCode(n);
        g = [H, H, f];
        break;
      }
      case dc: {
        if (d = S.length ? S.pop()[1] : "", m = r.charCodeAt(f + 1), d === "url" && m !== Ar && m !== vi && m !== Ge && m !== Et && m !== $t && m !== Mt && m !== Nt) {
          o = f;
          do {
            if (c = !1, o = r.indexOf(")", o + 1), o === -1)
              if (i || W) {
                o = f;
                break;
              } else
                C("bracket");
            for (h = o; r.charCodeAt(h - 1) === At; )
              h -= 1, c = !c;
          } while (c);
          g = ["brackets", r.slice(f, o + 1), f, o], f = o;
        } else
          o = r.indexOf(")", f + 1), a = r.slice(f, o + 1), o === -1 || vc.test(a) ? g = ["(", "(", f] : (g = ["brackets", a, f, o], f = o);
        break;
      }
      case Ar:
      case vi: {
        l = n === Ar ? "'" : '"', o = f;
        do {
          if (c = !1, o = r.indexOf(l, o + 1), o === -1)
            if (i || W) {
              o = f + 1;
              break;
            } else
              C("string");
          for (h = o; r.charCodeAt(h - 1) === At; )
            h -= 1, c = !c;
        } while (c);
        g = ["string", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      case Cc: {
        kt.lastIndex = f + 1, kt.test(r), kt.lastIndex === 0 ? o = r.length - 1 : o = kt.lastIndex - 2, g = ["at-word", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      case At: {
        for (o = f, u = !0; r.charCodeAt(o + 1) === At; )
          o += 1, u = !u;
        if (n = r.charCodeAt(o + 1), u && n !== Ii && n !== Ge && n !== Et && n !== $t && n !== Nt && n !== Mt && (o += 1, xi.test(r.charAt(o)))) {
          for (; xi.test(r.charAt(o + 1)); )
            o += 1;
          r.charCodeAt(o + 1) === Ge && (o += 1);
        }
        g = ["word", r.slice(f, o + 1), f, o], f = o;
        break;
      }
      default: {
        n === Ii && r.charCodeAt(f + 1) === Sc ? (o = r.indexOf("*/", f + 2) + 1, o === 0 && (i || W ? o = r.length : C("comment")), g = ["comment", r.slice(f, o + 1), f, o], f = o) : (Pt.lastIndex = f + 1, Pt.test(r), Pt.lastIndex === 0 ? o = r.length - 1 : o = Pt.lastIndex - 2, g = ["word", r.slice(f, o + 1), f, o], S.push(g), f = o);
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
let ao = xe, Kt = class extends ao {
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
var ks = Kt;
Kt.default = Kt;
ao.registerAtRule(Kt);
let lo = xe, uo, co, Te = class extends lo {
  constructor(e) {
    super(e), this.type = "root", this.nodes || (this.nodes = []);
  }
  normalize(e, t, r) {
    let i = super.normalize(e);
