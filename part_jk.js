      maskTextSelector: u,
      inlineStylesheet: c,
      maskAllInputs: ye,
      maskTextFn: p,
      maskInputFn: g,
      slimDOM: ae,
      dataURLOptions: y,
      recordCanvas: P,
      inlineImages: Q,
      onSerialize: (U) => {
        $o(U, se) && Se.addIframe(U), No(U, se) && we.trackLinkElement(U), cs(U) && dt.addShadowRoot(v.shadowRoot(U), document);
      },
      onIframeLoad: (U, B) => {
        Se.attachIframe(U, B), dt.observeAttachShadow(U);
      },
      onStylesheetLoad: (U, B) => {
        we.attachLinkElement(U, B);
      },
      keepIframeSrcFn: O
    });
    if (!re)
      return console.warn("Failed to snapshot the document");
    z(
      {
        type: R.FullSnapshot,
        data: {
          node: re,
          initialOffset: Ro(window)
        }
      },
      A
    ), Ce.forEach((U) => U.unlock()), document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && we.adoptStyleSheets(
      document.adoptedStyleSheets,
      se.getId(document)
    );
  };
  try {
    const A = [], re = (B) => {
      var le;
      return x(of)(
        {
          mutationCb: pt,
          mousemoveCb: (N, gr) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: gr,
              positions: N
            }
          }),
          mouseInteractionCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.MouseInteraction,
              ...N
            }
          }),
          scrollCb: Bs,
          viewportResizeCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.ViewportResize,
              ...N
            }
          }),
          inputCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.Input,
              ...N
            }
          }),
          mediaInteractionCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.MediaInteraction,
              ...N
            }
          }),
          styleSheetRuleCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.StyleSheetRule,
              ...N
            }
          }),
          styleDeclarationCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.StyleDeclaration,
              ...N
            }
          }),
          canvasMutationCb: zs,
          fontCb: (N) => z({
            type: R.IncrementalSnapshot,
            data: {
              source: I.Font,
              ...N
            }
          }),
