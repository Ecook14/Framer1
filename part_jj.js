      (le || N) && Vt(!0);
    }
  };
  const pt = (A) => {
    z({
      type: R.IncrementalSnapshot,
      data: {
        source: I.Mutation,
        ...A
      }
    });
  }, Bs = (A) => z({
    type: R.IncrementalSnapshot,
    data: {
      source: I.Scroll,
      ...A
    }
  }), zs = (A) => z({
    type: R.IncrementalSnapshot,
    data: {
      source: I.CanvasMutation,
      ...A
    }
  }), Ho = (A) => z({
    type: R.IncrementalSnapshot,
    data: {
      source: I.AdoptedStyleSheet,
      ...A
    }
  }), we = new wf({
    mutationCb: pt,
    adoptedStyleSheetCb: Ho
  }), Se = new af({
    mirror: se,
    mutationCb: pt,
    stylesheetManager: we,
    recordCrossOriginIframes: j,
    wrappedEmit: z
  });
  for (const A of oe || [])
    A.getMirror && A.getMirror({
      nodeMirror: se,
      crossOriginIframeMirror: Se.crossOriginIframeMirror,
      crossOriginIframeStyleMirror: Se.crossOriginIframeStyleMirror
    });
  const mr = new Sf();
  Nr = new yf({
    recordCanvas: P,
    mutationCb: zs,
    win: window,
    blockClass: i,
    blockSelector: n,
    mirror: se,
    sampling: b.canvas,
    dataURLOptions: y
  });
  const dt = new lf({
    mutationCb: pt,
    scrollCb: Bs,
    bypassOptions: {
      blockClass: i,
      blockSelector: n,
      maskTextClass: a,
      maskTextSelector: u,
      inlineStylesheet: c,
      maskInputOptions: ye,
      dataURLOptions: y,
      maskTextFn: p,
      maskInputFn: g,
      recordCanvas: P,
      inlineImages: Q,
      sampling: b,
      slimDOMOptions: ae,
      iframeManager: Se,
      stylesheetManager: we,
      canvasManager: Nr,
      keepIframeSrcFn: O,
      processedNodeManager: mr
    },
    mirror: se
  });
  Vt = (A = !1) => {
    if (!$)
      return;
    z(
      {
        type: R.Meta,
        data: {
          href: window.location.href,
          width: Ao(),
          height: Oo()
        }
      },
      A
    ), we.reset(), dt.init(), Ce.forEach((U) => U.lock());
    const re = za(document, {
      mirror: se,
      blockClass: i,
      blockSelector: n,
      maskTextClass: a,
