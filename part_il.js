M.Processor = Ds;
M.Document = wo;
M.Comment = So;
M.Warning = yh;
M.AtRule = bo;
M.Result = wh;
M.Input = Sh;
M.Rule = Co;
M.Root = vo;
M.Node = vh;
ph.registerPostcss(M);
var Ih = M;
M.default = M;
const F = /* @__PURE__ */ Tu(Ih);
F.stringify;
F.fromJSON;
F.plugin;
F.parse;
F.list;
F.document;
F.comment;
F.atRule;
F.rule;
F.decl;
F.root;
F.CssSyntaxError;
F.Declaration;
F.Container;
F.Processor;
F.Document;
F.Comment;
F.Warning;
F.AtRule;
F.Result;
F.Input;
F.Rule;
F.Root;
F.Node;
class _s {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  constructor(...e) {
    ee(this, "parentElement", null), ee(this, "parentNode", null), ee(this, "ownerDocument"), ee(this, "firstChild", null), ee(this, "lastChild", null), ee(this, "previousSibling", null), ee(this, "nextSibling", null), ee(this, "ELEMENT_NODE", 1), ee(this, "TEXT_NODE", 3), ee(this, "nodeType"), ee(this, "nodeName"), ee(this, "RRNodeType");
  }
  get childNodes() {
    const e = [];
    let t = this.firstChild;
    for (; t; )
      e.push(t), t = t.nextSibling;
    return e;
  }
  contains(e) {
    if (e instanceof _s) {
      if (e.ownerDocument !== this.ownerDocument) return !1;
      if (e === this) return !0;
    } else return !1;
    for (; e.parentNode; ) {
      if (e.parentNode === this) return !0;
      e = e.parentNode;
    }
    return !1;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  appendChild(e) {
    throw new Error(
      "RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method."
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  insertBefore(e, t) {
    throw new Error(
      "RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method."
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeChild(e) {
    throw new Error(
      "RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method."
    );
  }
  toString() {
    return "RRNode";
  }
}
const Mi = {
  Node: ["childNodes", "parentNode", "parentElement", "textContent"],
  ShadowRoot: ["host", "styleSheets"],
  Element: ["shadowRoot", "querySelector", "querySelectorAll"],
  MutationObserver: []
}, $i = {
  Node: ["contains", "getRootNode"],
  ShadowRoot: ["getSelection"],
  Element: [],
  MutationObserver: ["constructor"]
}, Tt = {}, xh = () => !!globalThis.Zone;
function Ls(s) {
  if (Tt[s])
    return Tt[s];
  const e = globalThis[s], t = e.prototype, r = s in Mi ? Mi[s] : void 0, i = !!(r && // @ts-expect-error 2345
  r.every(
    (l) => {
