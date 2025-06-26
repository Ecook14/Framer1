  end(e) {
    this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.semicolon = !1, this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.spaces = "", this.current.parent ? (this.current.source.end = this.getPosition(e[2]), this.current.source.end.offset++, this.current = this.current.parent) : this.unexpectedClose(e);
  }
  endFile() {
    this.current.parent && this.unclosedBlock(), this.current.nodes && this.current.nodes.length && (this.current.raws.semicolon = this.semicolon), this.current.raws.after = (this.current.raws.after || "") + this.spaces, this.root.source.end = this.getPosition(this.tokenizer.position());
  }
  freeSemicolon(e) {
    if (this.spaces += e[1], this.current.nodes) {
      let t = this.current.nodes[this.current.nodes.length - 1];
      t && t.type === "rule" && !t.raws.ownSemicolon && (t.raws.ownSemicolon = this.spaces, this.spaces = "");
    }
  }
  // Helpers
  getPosition(e) {
    let t = this.input.fromOffset(e);
    return {
      column: t.col,
      line: t.line,
      offset: e
    };
  }
  init(e, t) {
    this.current.push(e), e.source = {
      input: this.input,
      start: this.getPosition(t)
    }, e.raws.before = this.spaces, this.spaces = "", e.type !== "comment" && (this.semicolon = !1);
  }
  other(e) {
    let t = !1, r = null, i = !1, n = null, o = [], l = e[1].startsWith("--"), a = [], u = e;
    for (; u; ) {
      if (r = u[0], a.push(u), r === "(" || r === "[")
        n || (n = u), o.push(r === "(" ? ")" : "]");
      else if (l && i && r === "{")
        n || (n = u), o.push("}");
      else if (o.length === 0)
        if (r === ";")
          if (i) {
            this.decl(a, l);
            return;
          } else
            break;
        else if (r === "{") {
          this.rule(a);
          return;
        } else if (r === "}") {
          this.tokenizer.back(a.pop()), t = !0;
          break;
        } else r === ":" && (i = !0);
      else r === o[o.length - 1] && (o.pop(), o.length === 0 && (n = null));
      u = this.tokenizer.nextToken();
    }
    if (this.tokenizer.endOfFile() && (t = !0), o.length > 0 && this.unclosedBracket(n), t && i) {
      if (!l)
        for (; a.length && (u = a[a.length - 1][0], !(u !== "space" && u !== "comment")); )
          this.tokenizer.back(a.pop());
      this.decl(a, l);
    } else
      this.unknownWord(a);
  }
  parse() {
    let e;
    for (; !this.tokenizer.endOfFile(); )
      switch (e = this.tokenizer.nextToken(), e[0]) {
        case "space":
          this.spaces += e[1];
          break;
        case ";":
          this.freeSemicolon(e);
          break;
        case "}":
          this.end(e);
          break;
        case "comment":
          this.comment(e);
          break;
        case "at-word":
          this.atrule(e);
          break;
        case "{":
          this.emptyRule(e);
          break;
        default:
          this.other(e);
          break;
      }
    this.endFile();
  }
  precheckMissedSemicolon() {
  }
  raw(e, t, r, i) {
    let n, o, l = r.length, a = "", u = !0, c, h;
    for (let d = 0; d < l; d += 1)
      n = r[d], o = n[0], o === "space" && d === l - 1 && !i ? u = !1 : o === "comment" ? (h = r[d - 1] ? r[d - 1][0] : "empty", c = r[d + 1] ? r[d + 1][0] : "empty", !ui[h] && !ui[c] ? a.slice(-1) === "," ? u = !1 : a += n[1] : u = !1) : a += n[1];
    if (!u) {
      let d = r.reduce((m, g) => m + g[1], "");
      e.raws[t] = { raw: d, value: a };
    }
    e[t] = a;
  }
  rule(e) {
