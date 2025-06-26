            if (u = u.previous, c) {
              const h = this.mirror.getId(v.parentNode(c.value));
              if (i(c.value) === -1) continue;
              if (h !== -1) {
                a = c;
                break;
              } else {
                const m = c.value, g = v.parentNode(m);
                if (g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                  const p = v.host(g);
                  if (this.mirror.getId(p) !== -1) {
                    a = c;
                    break;
                  }
                }
              }
            }
          }
        }
        if (!a) {
          for (; r.head; )
            r.removeNode(r.head.value);
          break;
        }
        o = a.previous, r.removeNode(a.value), n(a.value);
      }
      const l = {
        texts: this.texts.map((a) => {
          const u = a.node, c = v.parentNode(u);
          return c && c.tagName === "TEXTAREA" && this.genTextAreaValueMutation(c), {
            id: this.mirror.getId(u),
            value: a.value
          };
        }).filter((a) => !t.has(a.id)).filter((a) => this.mirror.has(a.id)),
        attributes: this.attributes.map((a) => {
          const { attributes: u } = a;
          if (typeof u.style == "string") {
            const c = JSON.stringify(a.styleDiff), h = JSON.stringify(a._unchangedStyles);
            c.length < u.style.length && (c + h).split("var(").length === u.style.split("var(").length && (u.style = a.styleDiff);
          }
          return {
            id: this.mirror.getId(a.node),
            attributes: u
          };
        }).filter((a) => !t.has(a.id)).filter((a) => this.mirror.has(a.id)),
        removes: this.removes,
        adds: e
      };
      !l.texts.length && !l.attributes.length && !l.removes.length && !l.adds.length || (this.texts = [], this.attributes = [], this.attributeMap = /* @__PURE__ */ new WeakMap(), this.removes = [], this.addedSet = /* @__PURE__ */ new Set(), this.movedSet = /* @__PURE__ */ new Set(), this.droppedSet = /* @__PURE__ */ new Set(), this.removesSubTreeCache = /* @__PURE__ */ new Set(), this.movedMap = {}, this.mutationCb(l));
    }), w(this, "genTextAreaValueMutation", (e) => {
      let t = this.attributeMap.get(e);
      t || (t = {
        node: e,
        attributes: {},
        styleDiff: {},
        _unchangedStyles: {}
      }, this.attributes.push(t), this.attributeMap.set(e, t)), t.attributes.value = Array.from(
        v.childNodes(e),
        (r) => v.textContent(r) || ""
      ).join("");
    }), w(this, "processMutation", (e) => {
      if (!$r(e.target, this.mirror, this.slimDOMOptions))
        switch (e.type) {
          case "characterData": {
            const t = v.textContent(e.target);
            !J(e.target, this.blockClass, this.blockSelector, !1) && t !== e.oldValue && this.texts.push({
              value: en(
                e.target,
                this.maskTextClass,
                this.maskTextSelector,
                !0
                // checkAncestors
              ) && t ? this.maskTextFn ? this.maskTextFn(t, Eo(e.target)) : t.replace(/[\S]/g, "*") : t,
              node: e.target
            });
            break;
          }
          case "attributes": {
            const t = e.target;
            let r = e.attributeName, i = e.target.getAttribute(r);
            if (r === "value") {
              const o = ds(t);
              i = ps({
                element: t,
                maskInputOptions: this.maskInputOptions,
                tagName: t.tagName,
                type: o,
                value: i,
                maskInputFn: this.maskInputFn
              });
            }
            if (J(e.target, this.blockClass, this.blockSelector, !1) || i === e.oldValue)
              return;
            let n = this.attributeMap.get(e.target);
            if (t.tagName === "IFRAME" && r === "src" && !this.keepIframeSrcFn(i))
              if (!t.contentDocument)
                r = "rr_src";
              else
                return;
            if (n || (n = {
