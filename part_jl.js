          selectionCb: (N) => {
            z({
              type: R.IncrementalSnapshot,
              data: {
                source: I.Selection,
                ...N
              }
            });
          },
          customElementCb: (N) => {
            z({
              type: R.IncrementalSnapshot,
              data: {
                source: I.CustomElement,
                ...N
              }
            });
          },
          blockClass: i,
          ignoreClass: o,
          ignoreSelector: l,
          maskTextClass: a,
          maskTextSelector: u,
          maskInputOptions: ye,
          inlineStylesheet: c,
          sampling: b,
          recordDOM: $,
          recordCanvas: P,
          inlineImages: Q,
          userTriggeredOnInput: W,
          collectFonts: H,
          doc: B,
          maskInputFn: g,
          maskTextFn: p,
          keepIframeSrcFn: O,
          blockSelector: n,
          slimDOMOptions: ae,
          dataURLOptions: y,
          mirror: se,
          iframeManager: Se,
          stylesheetManager: we,
          shadowDomManager: dt,
          processedNodeManager: mr,
          canvasManager: Nr,
          ignoreCSSAttributes: Be,
          plugins: ((le = oe == null ? void 0 : oe.filter((N) => N.observer)) == null ? void 0 : le.map((N) => ({
            observer: N.observer,
            options: N.options,
            callback: (gr) => z({
              type: R.Plugin,
              data: {
                plugin: N.name,
                payload: gr
              }
            })
          }))) || []
        },
        f
      );
    };
    Se.addLoadListener((B) => {
      try {
        A.push(re(B.contentDocument));
      } catch (le) {
        console.warn(le);
      }
    });
    const U = () => {
      Vt(), A.push(re(document)), rr = !0;
    };
    return document.readyState === "interactive" || document.readyState === "complete" ? U() : (A.push(
      Z("DOMContentLoaded", () => {
        z({
          type: R.DomContentLoaded,
          data: {}
        }), _ === "DOMContentLoaded" && U();
      })
    ), A.push(
      Z(
        "load",
        () => {
          z({
            type: R.Load,
            data: {}
          }), _ === "load" && U();
        },
        window
      )
    )), () => {
      A.forEach((B) => B()), mr.destroy(), rr = !1, Hh();
    };
  } catch (A) {
    console.warn(A);
  }
}
ft.addCustomEvent = (s, e) => {
  if (!rr)
    throw new Error("please add custom event after start recording");
  z({
    type: R.Custom,
