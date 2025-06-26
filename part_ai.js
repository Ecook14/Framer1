    return { ...image, alt };
};
`;var CB=$`(value) => {
    return Array.isArray(value) ? value.length : 0
}
`;function vB(A){let j=$`item`,e={[cr]:$`${j}?.[${cr}]`};for(let t in A.mapping){let r=A.mapping[t];if(E(Kj(r)),Z7(r.value)){e[t]=$`${j}?.[${r.value.id}]`;continue}r.value}return $`(value) => {
      if (!Array.isArray(value)) return
      return value.map((${j}) => (${e}))
    }`}var TB=$`(a, b) => {
    if (typeof a === "string" && typeof b === "string") {
        return a.toLowerCase().includes(b.toLowerCase());
    }

    if (Array.isArray(a) && typeof b === "string") {
        return a.includes(b);
    }

    return false;
};
`;function FG(A){let j=ut(A.outputType);return MA($`return ${We(j)?j:$`undefined`};`)}function PB(A,j,e,t,r,o,n){if(e==="link")return!n||!Mj(A)&&!rA(A)?void 0:n.create(A);if(!Mj(A))return rA(A)?r.create(A):Du(e,A,t)?o&&j&&e==="string"?o.add(A,j,a=>j?.[a]?.value):A:Mu(e,t)}function GG(A,j,e,t,r){if(!_u(A.outputType))return FG(A);let o=PB(A.truthy,A.truthyLocalized,A.outputType,j,e,t,r),n=PB(A.falsy,A.falsyLocalized,A.outputType,j,e,t,r);return Fj.lines($`if (value) {`,$`return ${o===void 0?$`undefined`:o};`,$`} else {`,$`return ${n===void 0?$`undefined`:n};`,$`}`)}function _B(A,j,e,t,r){E(e),E(t),E(r);let o=new Set;function n(i){if(Mj(i)&&qe(i,s=>n(s)),rA(i)){E(e);let s=e.create(i);o.add(MA(s))}}n(A.truthy),n(A.falsy);let a=[$`value`,OA.activeLocale];if(o.size>0){let i=`{${Array.from(o).join(", ")}}`;a.push(new w(i))}return new w(Fj.lines($`(${new w(a.map(MA).join(", "))}) => {`,new w(GG(A,j,e,t,r)),$`}`))}function uo(A,j,e,t,r,o,n){if(e==="link")return!n||!Mj(A)&&!rA(A)?void 0:n.create(A);if(!Mj(A))return rA(A)?r.create(A):Tu(e,A,t)?o&&e==="string"&&P(A)&&j?o.add(A,j,a=>j?.[a]?.value):A:Pu(e,t)}function DB(A){let j=ut(A.outputType);return MA($`return ${We(j)?j:$`undefined`};`)}function SG(A,j,e,t,r,o){if(j?.type!=="enum"||!Cu(A.outputType))return DB(A);let n=new Set,a=uo(A.default,A.defaultLocalized,A.outputType,e,t,r,o);return Fj.lines($`switch (value) {`,...A.cases.filter(i=>n.has(i.from)||!j.options.includes(i.from)?!1:(n.add(i.from),!0)).map(i=>{let s=uo(i.to,i.toLocalized,A.outputType,e,t,r,o);return $`case ${i.from}: return ${s===void 0?$`undefined`:s};`}),$`default: return ${a===void 0?$`undefined`:a};`,$`}`)}function MB(A,j,e,t,r,o){E(t),E(r),E(o);let n=new Set;function a(s){if(Mj(s)&&qe(s,l=>a(l)),rA(s)){E(t);let l=t.create(s);n.add(MA(l))}}A.cases.forEach(s=>{a(s.to)}),a(A.default);let i=[$`value`,OA.activeLocale];if(n.size>0){let s=`{${Array.from(n).join(", ")}}`;i.push(new w(s))}return new w(Fj.lines($`(${new w(i.map(MA).join(", "))}) => {`,new w(SG(A,j,e,t,r,o)),$`}`))}function yG(A){let j=ut(A.outputType);return MA($`return ${We(j)?j:$`undefined`};`)}function bG(A,j,e,t,r){if(!vu(A.outputType))return yG(A);let o=new Set,n=uo(A.default,A.defaultLocalized,A.outputType,j,e,t,r);return Fj.lines($`switch (typeof value === "string" ? value.toLowerCase() : value) {`,...A.cases.filter(a=>{let i=a.from.toLowerCase();return o.has(i)?!1:(o.add(i),!0)}).map(a=>{let i=uo(a.to,a.toLocalized,A.outputType,j,e,t,r);return $`case ${a.from.toLowerCase()}: return ${i===void 0?$`undefined`:i};`}),$`default: return ${n===void 0?$`undefined`:n};`,$`}`)}function NB(A,j,e,t,r){E(e),E(t),E(r);let o=new Set;function n(i){if(Mj(i)&&qe(i,s=>n(s)),rA(i)){E(e);let s=e.create(i);o.add(MA(s))}}A.cases.forEach(i=>{n(i.to)}),n(A.default);let a=[$`value`,OA.activeLocale];if(o.size>0){let i=`{${Array.from(o).join(", ")}}`;a.push(new w(i))}return new w(Fj.lines($`(${new w(a.map(MA).join(", "))}) => {`,new w(bG(A,j,e,t,r)),$`}`))}var xB=$`(a, b) => {
    return typeof a === "string" && typeof b === "string" && a.toLowerCase().endsWith(b.toLowerCase());
};
`;var OB=$`(a, b) => {
    return (typeof a === "string" && typeof b === "string") ? a.toLowerCase() === b.toLowerCase() : a === b;
};
`;var wB=$`(value, segment = "year") => {
    if (typeof value !== "string") return;
    const date = new Date(value);
    if (isNaN(date.getTime())) return;
    if (segment === "year") return date.getUTCFullYear();
    if (segment === "month") return date.getUTCMonth() + 1;
    if (segment === "day") return date.getUTCDate();
    if (segment === "hour24") return date.getUTCHours();
    if (segment === "hour12") {
        const hour = date.getUTCHours();
        return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    }
    if (segment === "minute") return date.getUTCMinutes();
};
`;var Kc=$`spanCount`,bs=$`optionalColumnCount`,LB=$`(columnSpan, ${bs}) => {
    if (columnSpan === "all") return "-1 / 1";
    const ${Kc} = Number.isFinite(columnSpan) && columnSpan > 0 ? columnSpan : 1;
    if (Number.isFinite(${bs}) && ${Kc} > ${bs}) {
        return ${Yt`span ${bs}`};
    }
    return ${Yt`span ${Kc}`};
};
`;var qB=$`spanCount`,VB=$`(rowSpan) => {
    const ${qB} = Number.isFinite(rowSpan) && rowSpan > 0 ? rowSpan : 1;
    return ${Yt`span ${qB}`}
};
`;var KB=$`(gap) => {
    if (Number.isFinite(gap) && gap >= 0) return gap;
    if (typeof gap !== "string") return 0;
    const firstSegment = gap.split(" ")[0];
    const parsedGap = parseFloat(firstSegment);
    return Number.isFinite(parsedGap) && parsedGap >= 0 ? parsedGap : 0;
};
`;var JB=$`(a, b) => {
    return (typeof a === "number" && typeof b === "number") ? a > b : false;
};
`;var HB=$`(value) => {
    if (typeof value !== "string") return "";
    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
};
`;var QB=$`(value) => {
    if (typeof value !== "string") return "";
    const entities = /&(?:[gl]t|quot|#39|amp|#6[02]|#34|apos|#38);/gu;
    const replacers = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&amp;": "&", "&#60;": "<", "&#62;": ">", "&#34;": '"', "&apos;": "'", "&#38;": "&" };
    return value.replace(entities, match => replacers[match]);
};
`;var UB=$`(dateString, minDateString) => {
    if (typeof dateString !== "string" || typeof minDateString !== "string") return false;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;

    const minDate = new Date(minDateString);
    if (isNaN(minDate.getTime())) return false;

    return date >= minDate;
};
`;var WB=$`(dateString, maxDateString) => {
    if (typeof dateString !== "string" || typeof maxDateString !== "string") return false;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;

    const maxDate = new Date(maxDateString);
    if (isNaN(maxDate.getTime())) return false;

    return date <= maxDate;
};
`;var zB=$`(value, start, end) => {
    if (typeof value !== "string" || typeof start !== "string" || typeof end !== "string") return false;

    const date = new Date(value);
    if (isNaN(date.getTime())) return false;

    const startDate = new Date(start);
