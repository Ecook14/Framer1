          timestamp: t.timestamp,
          type: R.IncrementalSnapshot,
          data: {
            source: I.Mutation,
            adds: [
              {
                parentId: this.mirror.getId(e),
                nextId: null,
                node: t.data.node
              }
            ],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: !0
          }
        };
      }
      case R.Meta:
      case R.Load:
      case R.DomContentLoaded:
        return !1;
      case R.Plugin:
        return t;
      case R.Custom:
        return this.replaceIds(
          t.data.payload,
          e,
          ["id", "parentId", "previousId", "nextId"]
        ), t;
      case R.IncrementalSnapshot:
        switch (t.data.source) {
          case I.Mutation:
            return t.data.adds.forEach((i) => {
              this.replaceIds(i, e, [
                "parentId",
                "nextId",
                "previousId"
              ]), this.replaceIdOnNode(i.node, e);
              const n = this.crossOriginIframeRootIdMap.get(e);
              n && this.patchRootIdOnNode(i.node, n);
            }), t.data.removes.forEach((i) => {
              this.replaceIds(i, e, ["parentId", "id"]);
            }), t.data.attributes.forEach((i) => {
              this.replaceIds(i, e, ["id"]);
            }), t.data.texts.forEach((i) => {
              this.replaceIds(i, e, ["id"]);
            }), t;
          case I.Drag:
          case I.TouchMove:
          case I.MouseMove:
            return t.data.positions.forEach((i) => {
              this.replaceIds(i, e, ["id"]);
            }), t;
          case I.ViewportResize:
            return !1;
          case I.MediaInteraction:
          case I.MouseInteraction:
          case I.Scroll:
          case I.CanvasMutation:
          case I.Input:
            return this.replaceIds(t.data, e, ["id"]), t;
          case I.StyleSheetRule:
          case I.StyleDeclaration:
            return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleId"]), t;
          case I.Font:
            return t;
          case I.Selection:
            return t.data.ranges.forEach((i) => {
              this.replaceIds(i, e, ["start", "end"]);
            }), t;
          case I.AdoptedStyleSheet:
            return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleIds"]), (r = t.data.styles) == null || r.forEach((i) => {
              this.replaceStyleIds(i, e, ["styleId"]);
            }), t;
        }
    }
    return !1;
  }
  replace(e, t, r, i) {
    for (const n of i)
      !Array.isArray(t[n]) && typeof t[n] != "number" || (Array.isArray(t[n]) ? t[n] = e.getIds(
        r,
        t[n]
      ) : t[n] = e.getId(r, t[n]));
    return t;
  }
  replaceIds(e, t, r) {
    return this.replace(this.crossOriginIframeMirror, e, t, r);
  }
  replaceStyleIds(e, t, r) {
    return this.replace(this.crossOriginIframeStyleMirror, e, t, r);
  }
  replaceIdOnNode(e, t) {
    this.replaceIds(e, t, ["id", "rootId"]), "childNodes" in e && e.childNodes.forEach((r) => {
      this.replaceIdOnNode(r, t);
    });
  }
  patchRootIdOnNode(e, t) {
    e.type !== To.Document && !e.rootId && (e.rootId = t), "childNodes" in e && e.childNodes.forEach((r) => {
