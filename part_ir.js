              node: e.target,
              attributes: {},
              styleDiff: {},
              _unchangedStyles: {}
            }, this.attributes.push(n), this.attributeMap.set(e.target, n)), r === "type" && t.tagName === "INPUT" && (e.oldValue || "").toLowerCase() === "password" && t.setAttribute("data-rr-is-password", "true"), !qi(t.tagName, r))
              if (n.attributes[r] = Qi(
                this.doc,
                ve(t.tagName),
                ve(r),
                i
              ), r === "style") {
                if (!this.unattachedDoc)
                  try {
                    this.unattachedDoc = document.implementation.createHTMLDocument();
                  } catch {
                    this.unattachedDoc = this.doc;
                  }
                const o = this.unattachedDoc.createElement("span");
                e.oldValue && o.setAttribute("style", e.oldValue);
                for (const l of Array.from(t.style)) {
                  const a = t.style.getPropertyValue(l), u = t.style.getPropertyPriority(l);
                  a !== o.style.getPropertyValue(l) || u !== o.style.getPropertyPriority(l) ? u === "" ? n.styleDiff[l] = a : n.styleDiff[l] = [a, u] : n._unchangedStyles[l] = [a, u];
                }
                for (const l of Array.from(o.style))
                  t.style.getPropertyValue(l) === "" && (n.styleDiff[l] = !1);
              } else r === "open" && t.tagName === "DIALOG" && (t.matches("dialog:modal") ? n.attributes.rr_open_mode = "modal" : n.attributes.rr_open_mode = "non-modal");
            break;
          }
          case "childList": {
            if (J(e.target, this.blockClass, this.blockSelector, !0))
              return;
            if (e.target.tagName === "TEXTAREA") {
              this.genTextAreaValueMutation(e.target);
              return;
            }
            e.addedNodes.forEach((t) => this.genAdds(t, e.target)), e.removedNodes.forEach((t) => {
              const r = this.mirror.getId(t), i = Ye(e.target) ? this.mirror.getId(v.host(e.target)) : this.mirror.getId(e.target);
              J(e.target, this.blockClass, this.blockSelector, !1) || $r(t, this.mirror, this.slimDOMOptions) || !_h(t, this.mirror) || (this.addedSet.has(t) ? (hs(this.addedSet, t), this.droppedSet.add(t)) : this.addedSet.has(e.target) && r === -1 || Mo(e.target, this.mirror) || (this.movedSet.has(t) && this.movedMap[Pi(r, i)] ? hs(this.movedSet, t) : (this.removes.push({
                parentId: i,
                id: r,
                isShadow: Ye(e.target) && Ze(e.target) ? !0 : void 0
              }), Vh(t, this.removesSubTreeCache))), this.mapRemoves.push(t));
            });
            break;
          }
        }
    }), w(this, "genAdds", (e, t) => {
      if (!this.processedNodeManager.inOtherBuffer(e, this) && !(this.addedSet.has(e) || this.movedSet.has(e))) {
        if (this.mirror.hasNode(e)) {
          if ($r(e, this.mirror, this.slimDOMOptions))
            return;
          this.movedSet.add(e);
          let r = null;
          t && this.mirror.hasNode(t) && (r = this.mirror.getId(t)), r && r !== -1 && (this.movedMap[Pi(this.mirror.getId(e), r)] = !0);
        } else
          this.addedSet.add(e), this.droppedSet.delete(e);
        J(e, this.blockClass, this.blockSelector, !1) || (v.childNodes(e).forEach((r) => this.genAdds(r)), cs(e) && v.childNodes(v.shadowRoot(e)).forEach((r) => {
          this.processedNodeManager.add(r, this), this.genAdds(r, e);
        }));
      }
    });
  }
  init(e) {
    [
      "mutationCb",
      "blockClass",
      "blockSelector",
      "maskTextClass",
      "maskTextSelector",
      "inlineStylesheet",
      "maskInputOptions",
      "maskTextFn",
      "maskInputFn",
      "keepIframeSrcFn",
      "recordCanvas",
      "inlineImages",
      "slimDOMOptions",
      "dataURLOptions",
      "doc",
      "mirror",
      "iframeManager",
      "stylesheetManager",
      "shadowDomManager",
      "canvasManager",
      "processedNodeManager"
    ].forEach((t) => {
      this[t] = e[t];
    });
  }
  freeze() {
    this.frozen = !0, this.canvasManager.freeze();
  }
  unfreeze() {
    this.frozen = !1, this.canvasManager.unfreeze(), this.emit();
  }
  isFrozen() {
    return this.frozen;
  }
  lock() {
    this.locked = !0, this.canvasManager.lock();
