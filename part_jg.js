      const { base64: f, type: S, width: b, height: y } = g.data;
      this.mutationCb({
        id: p,
        type: Le["2D"],
        commands: [
          {
            property: "clearRect",
            // wipe canvas
            args: [0, 0, b, y]
          },
          {
            property: "drawImage",
            // draws (semi-transparent) image
            args: [
              {
                rr_type: "ImageBitmap",
                args: [
                  {
                    rr_type: "Blob",
                    data: [{ rr_type: "ArrayBuffer", base64: f }],
                    type: S
                  }
                ]
              },
              0,
              0
            ]
          }
        ]
      });
    };
    const u = 1e3 / e;
    let c = 0, h;
    const d = () => {
      const g = [];
      return t.document.querySelectorAll("canvas").forEach((p) => {
        J(p, r, i, !0) || g.push(p);
      }), g;
    }, m = (g) => {
      if (c && g - c < u) {
        h = requestAnimationFrame(m);
        return;
      }
      c = g, d().forEach(async (p) => {
        var f;
        const S = this.mirror.getId(p);
        if (l.get(S) || p.width === 0 || p.height === 0) return;
        if (l.set(S, !0), ["webgl", "webgl2"].includes(p.__context)) {
          const y = p.getContext(p.__context);
          ((f = y == null ? void 0 : y.getContextAttributes()) == null ? void 0 : f.preserveDrawingBuffer) === !1 && y.clear(y.COLOR_BUFFER_BIT);
        }
        const b = await createImageBitmap(p);
        a.postMessage(
          {
            id: S,
            bitmap: b,
            width: p.width,
            height: p.height,
            dataURLOptions: n.dataURLOptions
          },
          [b]
        );
      }), h = requestAnimationFrame(m);
    };
    h = requestAnimationFrame(m), this.resetObservers = () => {
      o(), cancelAnimationFrame(h);
    };
  }
  initCanvasMutationObserver(e, t, r) {
    this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
    const i = Ui(
      e,
      t,
      r,
      !1
    ), n = ff(
      this.processMutation.bind(this),
      e,
      t,
      r
    ), o = df(
      this.processMutation.bind(this),
      e,
      t,
      r
    );
    this.resetObservers = () => {
      i(), n(), o();
    };
  }
  startPendingCanvasMutationFlusher() {
    requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  startRAFTimestamping() {
    const e = (t) => {
      this.rafStamps.latestId = t, requestAnimationFrame(e);
    };
    requestAnimationFrame(e);
  }
  flushPendingCanvasMutations() {
