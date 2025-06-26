  }), r.CSSStyleSheet.prototype.removeRule = function(c) {
    return r.CSSStyleSheet.prototype.deleteRule.apply(this, [c]);
  };
  let o;
  r.CSSStyleSheet.prototype.replace && (o = r.CSSStyleSheet.prototype.replace, r.CSSStyleSheet.prototype.replace = new Proxy(o, {
    apply: x(
      (c, h, d) => {
        const [m] = d, { id: g, styleId: p } = de(
          h,
          e,
          t.styleMirror
        );
        return (g && g !== -1 || p && p !== -1) && s({
          id: g,
          styleId: p,
          replace: m
        }), c.apply(h, d);
      }
    )
  }));
  let l;
  r.CSSStyleSheet.prototype.replaceSync && (l = r.CSSStyleSheet.prototype.replaceSync, r.CSSStyleSheet.prototype.replaceSync = new Proxy(l, {
    apply: x(
      (c, h, d) => {
        const [m] = d, { id: g, styleId: p } = de(
          h,
          e,
          t.styleMirror
        );
        return (g && g !== -1 || p && p !== -1) && s({
          id: g,
          styleId: p,
          replaceSync: m
        }), c.apply(h, d);
      }
    )
  }));
  const a = {};
  _t("CSSGroupingRule") ? a.CSSGroupingRule = r.CSSGroupingRule : (_t("CSSMediaRule") && (a.CSSMediaRule = r.CSSMediaRule), _t("CSSConditionRule") && (a.CSSConditionRule = r.CSSConditionRule), _t("CSSSupportsRule") && (a.CSSSupportsRule = r.CSSSupportsRule));
  const u = {};
  return Object.entries(a).forEach(([c, h]) => {
    u[c] = {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      insertRule: h.prototype.insertRule,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deleteRule: h.prototype.deleteRule
    }, h.prototype.insertRule = new Proxy(
      u[c].insertRule,
      {
        apply: x(
          (d, m, g) => {
            const [p, f] = g, { id: S, styleId: b } = de(
              m.parentStyleSheet,
              e,
              t.styleMirror
            );
            return (S && S !== -1 || b && b !== -1) && s({
              id: S,
              styleId: b,
              adds: [
                {
                  rule: p,
                  index: [
                    ...tr(m),
                    f || 0
                    // defaults to 0
                  ]
                }
              ]
            }), d.apply(m, g);
          }
        )
      }
    ), h.prototype.deleteRule = new Proxy(
      u[c].deleteRule,
      {
        apply: x(
          (d, m, g) => {
            const [p] = g, { id: f, styleId: S } = de(
              m.parentStyleSheet,
              e,
              t.styleMirror
            );
            return (f && f !== -1 || S && S !== -1) && s({
              id: f,
              styleId: S,
              removes: [
                { index: [...tr(m), p] }
              ]
            }), d.apply(m, g);
          }
        )
      }
    );
  }), x(() => {
    r.CSSStyleSheet.prototype.insertRule = i, r.CSSStyleSheet.prototype.deleteRule = n, o && (r.CSSStyleSheet.prototype.replace = o), l && (r.CSSStyleSheet.prototype.replaceSync = l), Object.entries(a).forEach(([c, h]) => {
      h.prototype.insertRule = u[c].insertRule, h.prototype.deleteRule = u[c].deleteRule;
    });
  });
}
