        ol.framer-text {
            --list-style-type: decimal;
        }
    `,`
        ul.framer-text,
        ol.framer-text {
            padding-left: 3ch;
            position: relative;
        }
    `,`
        li.framer-text {
            counter-increment: list-item;
            list-style: none;
        }
    `,`
        ol.framer-text > li.framer-text::before {
            position: absolute;
            left: 0;
            content: counter(list-item, var(--list-style-type)) ".";
            font-variant-numeric: tabular-nums;
        }
    `,`
        ol.framer-text > li.framer-text:nth-last-child(n + 100),
        ol.framer-text > li.framer-text:nth-last-child(n + 100) ~ li {
            padding-left: 1ch;
        }
    `,`
        ol.framer-text > li.framer-text:nth-last-child(n + 1000),
        ol.framer-text > li.framer-text:nth-last-child(n + 1000) ~ li {
            padding-left: 2ch;
        }
    `,`
        ol.framer-text > li.framer-text:nth-last-child(n + 10000),
        ol.framer-text > li.framer-text:nth-last-child(n + 10000) ~ li {
            padding-left: 3ch;
        }
    `,`
        ol.framer-text > li.framer-text:nth-last-child(n + 100000),
        ol.framer-text > li.framer-text:nth-last-child(n + 100000) ~ li {
            padding-left: 4ch;
        }
    `,`
        ol.framer-text > li.framer-text:nth-last-child(n + 1000000),
        ol.framer-text > li.framer-text:nth-last-child(n + 1000000) ~ li {
            padding-left: 5ch;
        }
    `,`
        ul.framer-text > li.framer-text::before {
            position: absolute;
            left: 0;
            content: "\u2022";
        }
    `,`
        .framer-table-wrapper {
            overflow-x: auto;
        }
    `,`
        table.framer-text,
        .framer-table-wrapper table.framer-text {
            border-collapse: separate;
            border-spacing: 0;
            table-layout: auto;
            word-break: normal;
            width: 100%;
        }
    `,`
        td.framer-text,
        th.framer-text {
            min-width: 16ch;
            vertical-align: top;
        }
    `,`
        .framer-text-module[style*="aspect-ratio"] > :first-child {
            width: 100%;
        }
    `,`
        @supports not (aspect-ratio: 1) {
            .framer-text-module[style*="aspect-ratio"] {
                position: relative;
            }
        }
    `,`
        @supports not (aspect-ratio: 1) {
            .framer-text-module[style*="aspect-ratio"]::before {
                content: "";
                display: block;
                padding-bottom: calc(100% / calc(var(--aspect-ratio)));
            }
        }
    `,`
        @supports not (aspect-ratio: 1) {
            .framer-text-module[style*="aspect-ratio"] > :first-child {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
            }
        }
    `];var Pre=new Set,wI;function oh(e,t,r=Pre){if(!(!e||r.has(e)||typeof document>"u")){if(r.add(e),!t){if(!wI){let n=document.createElement("style");if(n.setAttribute("type","text/css"),n.setAttribute("data-framer-css","true"),!document.head){console.warn("not injecting CSS: the document is missing a <head> element");return}if(document.head.appendChild(n),n.sheet)wI=n.sheet;else{console.warn("not injecting CSS: injected <style> element does not have a sheet",n);return}}t=wI}try{t.insertRule(e,t.cssRules.length)}catch{}}}var kre=["[data-framer-component-type] { position: absolute; }"],Ere=`
[data-framer-component-type="Text"] > * {
