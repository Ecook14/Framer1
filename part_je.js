                property: o,
                args: c
              });
            }, 0), a.apply(this, u);
          };
        }
      );
      i.push(l);
    } catch {
      const l = pr(
        e.CanvasRenderingContext2D.prototype,
        o,
        {
          set(a) {
            s(this.canvas, {
              type: Le["2D"],
              property: o,
              args: [a],
              setter: !0
            });
          }
        }
      );
      i.push(l);
    }
  return () => {
    i.forEach((o) => o());
  };
}
function pf(s) {
  return s === "experimental-webgl" ? "webgl" : s;
}
function Ui(s, e, t, r) {
  const i = [];
  try {
    const n = Ue(
      s.HTMLCanvasElement.prototype,
      "getContext",
      function(o) {
        return function(l, ...a) {
          if (!J(this, e, t, !0)) {
            const u = pf(l);
            if ("__context" in this || (this.__context = u), r && ["webgl", "webgl2"].includes(u))
              if (a[0] && typeof a[0] == "object") {
                const c = a[0];
                c.preserveDrawingBuffer || (c.preserveDrawingBuffer = !0);
              } else
                a.splice(0, 1, {
                  preserveDrawingBuffer: !0
                });
          }
          return o.apply(this, [l, ...a]);
        };
      }
    );
    i.push(n);
  } catch {
    console.error("failed to patch HTMLCanvasElement.prototype.getContext");
  }
  return () => {
    i.forEach((n) => n());
  };
}
function Bi(s, e, t, r, i, n) {
  const o = [], l = Object.getOwnPropertyNames(s);
  for (const a of l)
    if (
      //prop.startsWith('get') ||  // e.g. getProgramParameter, but too risky
      ![
        "isContextLost",
        "canvas",
        "drawingBufferWidth",
        "drawingBufferHeight"
      ].includes(a)
    )
      try {
        if (typeof s[a] != "function")
          continue;
        const u = Ue(
          s,
          a,
          function(c) {
            return function(...h) {
              const d = c.apply(this, h);
              if (Uo(d, n, this), "tagName" in this.canvas && !J(this.canvas, r, i, !0)) {
                const m = Bo(h, n, this), g = {
                  type: e,
                  property: a,
                  args: m
                };
                t(this.canvas, g);
              }
              return d;
            };
          }
        );
        o.push(u);
      } catch {
        const u = pr(s, a, {
          set(c) {
