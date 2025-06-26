  }
  checkMissedSemicolon(e) {
    let t = this.colon(e);
    if (t === !1) return;
    let r = 0, i;
    for (let n = t - 1; n >= 0 && (i = e[n], !(i[0] !== "space" && (r += 1, r === 2))); n--)
      ;
    throw this.input.error(
      "Missed semicolon",
      i[0] === "word" ? i[3] + 1 : i[2]
    );
  }
  colon(e) {
    let t = 0, r, i, n;
    for (let [o, l] of e.entries()) {
      if (r = l, i = r[0], i === "(" && (t += 1), i === ")" && (t -= 1), t === 0 && i === ":")
        if (!n)
          this.doubleColon(r);
        else {
          if (n[0] === "word" && n[1] === "progid")
            continue;
          return o;
        }
      n = r;
    }
    return !1;
  }
  comment(e) {
    let t = new Dl();
    this.init(t, e[2]), t.source.end = this.getPosition(e[3] || e[2]), t.source.end.offset++;
    let r = e[1].slice(2, -2);
    if (/^\s*$/.test(r))
      t.text = "", t.raws.left = r, t.raws.right = "";
    else {
      let i = r.match(/^(\s*)([^]*\S)(\s*)$/);
      t.text = i[2], t.raws.left = i[1], t.raws.right = i[3];
    }
  }
  createTokenizer() {
    this.tokenizer = Tl(this.input);
  }
  decl(e, t) {
    let r = new Pl();
    this.init(r, e[0][2]);
    let i = e[e.length - 1];
    for (i[0] === ";" && (this.semicolon = !0, e.pop()), r.source.end = this.getPosition(
      i[3] || i[2] || Fl(e)
    ), r.source.end.offset++; e[0][0] !== "word"; )
      e.length === 1 && this.unknownWord(e), r.raws.before += e.shift()[1];
    for (r.source.start = this.getPosition(e[0][2]), r.prop = ""; e.length; ) {
      let u = e[0][0];
      if (u === ":" || u === "space" || u === "comment")
        break;
      r.prop += e.shift()[1];
    }
    r.raws.between = "";
    let n;
    for (; e.length; )
      if (n = e.shift(), n[0] === ":") {
        r.raws.between += n[1];
        break;
      } else
        n[0] === "word" && /\w/.test(n[1]) && this.unknownWord([n]), r.raws.between += n[1];
    (r.prop[0] === "_" || r.prop[0] === "*") && (r.raws.before += r.prop[0], r.prop = r.prop.slice(1));
    let o = [], l;
    for (; e.length && (l = e[0][0], !(l !== "space" && l !== "comment")); )
      o.push(e.shift());
    this.precheckMissedSemicolon(e);
    for (let u = e.length - 1; u >= 0; u--) {
      if (n = e[u], n[1].toLowerCase() === "!important") {
        r.important = !0;
        let c = this.stringFrom(e, u);
        c = this.spacesFromEnd(e) + c, c !== " !important" && (r.raws.important = c);
        break;
      } else if (n[1].toLowerCase() === "important") {
        let c = e.slice(0), h = "";
        for (let d = u; d > 0; d--) {
          let m = c[d][0];
          if (h.trim().indexOf("!") === 0 && m !== "space")
            break;
          h = c.pop()[1] + h;
        }
        h.trim().indexOf("!") === 0 && (r.important = !0, r.raws.important = h, e = c);
      }
      if (n[0] !== "space" && n[0] !== "comment")
        break;
    }
    e.some((u) => u[0] !== "space" && u[0] !== "comment") && (r.raws.between += o.map((u) => u[1]).join(""), o = []), this.raw(r, "value", o.concat(e), t), r.value.includes(":") && !t && this.checkMissedSemicolon(e);
  }
  doubleColon(e) {
    throw this.input.error(
      "Double colon",
      { offset: e[2] },
      { offset: e[2] + e[1].length }
    );
  }
  emptyRule(e) {
    let t = new li();
    this.init(t, e[2]), t.selector = "", t.raws.between = "", this.current = t;
  }
