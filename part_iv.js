    return () => {
      g.forEach((b) => b());
    };
  const f = p.Object.getOwnPropertyDescriptor(
    p.HTMLInputElement.prototype,
    "value"
  ), S = [
    [p.HTMLInputElement.prototype, "value"],
    [p.HTMLInputElement.prototype, "checked"],
    [p.HTMLSelectElement.prototype, "value"],
    [p.HTMLTextAreaElement.prototype, "value"],
    // Some UI library use selectedIndex to set select value
    [p.HTMLSelectElement.prototype, "selectedIndex"],
    [p.HTMLOptionElement.prototype, "selected"]
  ];
  return f && f.set && g.push(
    ...S.map(
      (b) => pr(
        b[0],
        b[1],
        {
          set() {
            x(h)({
              target: this,
              isTrusted: !1
              // userTriggered to false as this could well be programmatic
            });
          }
        },
        !1,
        p
      )
    )
  ), x(() => {
    g.forEach((b) => b());
  });
}
function tr(s) {
  const e = [];
  function t(r, i) {
    if (Dt("CSSGroupingRule") && r.parentRule instanceof CSSGroupingRule || Dt("CSSMediaRule") && r.parentRule instanceof CSSMediaRule || Dt("CSSSupportsRule") && r.parentRule instanceof CSSSupportsRule || Dt("CSSConditionRule") && r.parentRule instanceof CSSConditionRule) {
      const o = Array.from(
        r.parentRule.cssRules
      ).indexOf(r);
      i.unshift(o);
    } else if (r.parentStyleSheet) {
      const o = Array.from(r.parentStyleSheet.cssRules).indexOf(r);
      i.unshift(o);
    }
    return i;
  }
  return t(s, e);
}
function de(s, e, t) {
  let r, i;
  return s ? (s.ownerNode ? r = e.getId(s.ownerNode) : i = t.getId(s), {
    styleId: i,
    id: r
  }) : {};
}
function Qh({ styleSheetRuleCb: s, mirror: e, stylesheetManager: t }, { win: r }) {
  if (!r.CSSStyleSheet || !r.CSSStyleSheet.prototype)
    return () => {
    };
  const i = r.CSSStyleSheet.prototype.insertRule;
  r.CSSStyleSheet.prototype.insertRule = new Proxy(i, {
    apply: x(
      (c, h, d) => {
        const [m, g] = d, { id: p, styleId: f } = de(
          h,
          e,
          t.styleMirror
        );
        return (p && p !== -1 || f && f !== -1) && s({
          id: p,
          styleId: f,
          adds: [{ rule: m, index: g }]
        }), c.apply(h, d);
      }
    )
  }), r.CSSStyleSheet.prototype.addRule = function(c, h, d = this.cssRules.length) {
    const m = `${c} { ${h} }`;
    return r.CSSStyleSheet.prototype.insertRule.apply(this, [m, d]);
  };
  const n = r.CSSStyleSheet.prototype.deleteRule;
  r.CSSStyleSheet.prototype.deleteRule = new Proxy(n, {
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
          removes: [{ index: m }]
        }), c.apply(h, d);
      }
    )
