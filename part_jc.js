      this.patchRootIdOnNode(r, t);
    });
  }
}
class lf {
  constructor(e) {
    w(this, "shadowDoms", /* @__PURE__ */ new WeakSet()), w(this, "mutationCb"), w(this, "scrollCb"), w(this, "bypassOptions"), w(this, "mirror"), w(this, "restoreHandlers", []), this.mutationCb = e.mutationCb, this.scrollCb = e.scrollCb, this.bypassOptions = e.bypassOptions, this.mirror = e.mirror, this.init();
  }
  init() {
    this.reset(), this.patchAttachShadow(Element, document);
  }
  addShadowRoot(e, t) {
    if (!Ze(e) || this.shadowDoms.has(e)) return;
    this.shadowDoms.add(e);
    const r = _o(
      {
        ...this.bypassOptions,
        doc: t,
        mutationCb: this.mutationCb,
        mirror: this.mirror,
        shadowDomManager: this
      },
      e
    );
    this.restoreHandlers.push(() => r.disconnect()), this.restoreHandlers.push(
      Lo({
        ...this.bypassOptions,
        scrollCb: this.scrollCb,
        // https://gist.github.com/praveenpuglia/0832da687ed5a5d7a0907046c9ef1813
        // scroll is not allowed to pass the boundary, so we need to listen the shadow document
        doc: e,
        mirror: this.mirror
      })
    ), setTimeout(() => {
      e.adoptedStyleSheets && e.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(
        e.adoptedStyleSheets,
        this.mirror.getId(v.host(e))
      ), this.restoreHandlers.push(
        Fo(
          {
            mirror: this.mirror,
            stylesheetManager: this.bypassOptions.stylesheetManager
          },
          e
        )
      );
    }, 0);
  }
  /**
   * Monkey patch 'attachShadow' of an IFrameElement to observe newly added shadow doms.
   */
  observeAttachShadow(e) {
    !e.contentWindow || !e.contentDocument || this.patchAttachShadow(
      e.contentWindow.Element,
      e.contentDocument
    );
  }
  /**
   * Patch 'attachShadow' to observe newly added shadow doms.
   */
  patchAttachShadow(e, t) {
    const r = this;
    this.restoreHandlers.push(
      Ue(
        e.prototype,
        "attachShadow",
        function(i) {
          return function(n) {
            const o = i.call(this, n), l = v.shadowRoot(this);
            return l && Po(this) && r.addShadowRoot(l, t), o;
          };
        }
      )
    );
  }
  reset() {
    this.restoreHandlers.forEach((e) => {
      try {
        e();
      } catch {
      }
    }), this.restoreHandlers = [], this.shadowDoms = /* @__PURE__ */ new WeakSet();
  }
}
var $e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", uf = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Lt = 0; Lt < $e.length; Lt++)
  uf[$e.charCodeAt(Lt)] = Lt;
var cf = function(s) {
  var e = new Uint8Array(s), t, r = e.length, i = "";
  for (t = 0; t < r; t += 3)
    i += $e[e[t] >> 2], i += $e[(e[t] & 3) << 4 | e[t + 1] >> 4], i += $e[(e[t + 1] & 15) << 2 | e[t + 2] >> 6], i += $e[e[t + 2] & 63];
  return r % 3 === 2 ? i = i.substring(0, i.length - 1) + "=" : r % 3 === 1 && (i = i.substring(0, i.length - 2) + "=="), i;
};
const Fi = /* @__PURE__ */ new Map();
function hf(s, e) {
  let t = Fi.get(s);
  return t || (t = /* @__PURE__ */ new Map(), Fi.set(s, t)), t.has(e) || t.set(e, []), t.get(e);
}
const Uo = (s, e, t) => {
  if (!s || !(zo(s, e) || typeof s == "object"))
