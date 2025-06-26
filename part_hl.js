                  t,
                  r + "-" + i.toLowerCase(),
                  t[r][i]
                );
            else typeof t[r] == "function" && e(t, r, t[r]);
        }
    this.hasListener = Object.keys(this.listeners).length > 0;
  }
  async runAsync() {
    this.plugin = 0;
    for (let e = 0; e < this.plugins.length; e++) {
      let t = this.plugins[e], r = this.runOnRoot(t);
      if (Ve(r))
        try {
          await r;
        } catch (i) {
          throw this.handleError(i);
        }
    }
    if (this.prepareVisitors(), this.hasListener) {
      let e = this.result.root;
      for (; !e[ue]; ) {
        e[ue] = !0;
        let t = [hi(e)];
        for (; t.length > 0; ) {
          let r = this.visitTick(t);
          if (Ve(r))
            try {
              await r;
            } catch (i) {
              let n = t[t.length - 1].node;
              throw this.handleError(i, n);
            }
        }
      }
      if (this.listeners.OnceExit)
        for (let [t, r] of this.listeners.OnceExit) {
          this.result.lastPlugin = t;
          try {
            if (e.type === "document") {
              let i = e.nodes.map(
                (n) => r(n, this.helpers)
              );
              await Promise.all(i);
            } else
              await r(e, this.helpers);
          } catch (i) {
            throw this.handleError(i);
          }
        }
    }
    return this.processed = !0, this.stringify();
  }
  runOnRoot(e) {
    this.result.lastPlugin = e;
    try {
      if (typeof e == "object" && e.Once) {
        if (this.result.root.type === "document") {
          let t = this.result.root.nodes.map(
            (r) => e.Once(r, this.helpers)
          );
          return Ve(t[0]) ? Promise.all(t) : t;
        }
        return e.Once(this.result.root, this.helpers);
      } else if (typeof e == "function")
        return e(this.result.root, this.result);
    } catch (t) {
      throw this.handleError(t);
    }
  }
  stringify() {
    if (this.error) throw this.error;
    if (this.stringified) return this.result;
    this.stringified = !0, this.sync();
    let e = this.result.opts, t = Hl;
    e.syntax && (t = e.syntax.stringify), e.stringifier && (t = e.stringifier), t.stringify && (t = t.stringify);
    let i = new jl(t, this.result.root, this.result.opts).generate();
    return this.result.css = i[0], this.result.map = i[1], this.result;
  }
  sync() {
    if (this.error) throw this.error;
    if (this.processed) return this.result;
    if (this.processed = !0, this.processing)
      throw this.getAsyncError();
    for (let e of this.plugins) {
      let t = this.runOnRoot(e);
      if (Ve(t))
        throw this.getAsyncError();
    }
    if (this.prepareVisitors(), this.hasListener) {
      let e = this.result.root;
      for (; !e[ue]; )
        e[ue] = !0, this.walkSync(e);
      if (this.listeners.OnceExit)
        if (e.type === "document")
          for (let t of e.nodes)
            this.visitSync(this.listeners.OnceExit, t);
        else
          this.visitSync(this.listeners.OnceExit, e);
    }
