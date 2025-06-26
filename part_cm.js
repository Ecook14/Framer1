    const isBot = /bot|-google|google-|yandex|ia_archiver|crawl|spider/iu.test(navigator.userAgent)
    if (isBot) return

    return Framer.lazy(async () => {
        const { createEditorBar } = await import("${mQ()}")
        return {
            default: createEditorBar({
                dependencies: {
                    __version: 1,
                    framer: {
                        useCurrentRoute: Framer.useCurrentRoute,
                        useLocaleInfo: Framer.useLocaleInfo,
                        useRouter: Framer.useRouter,
                    },
                    react: {
                        createElement: React.createElement,
                        memo: React.memo,
                        useCallback: React.useCallback,
                        useEffect: React.useEffect,
                        useRef: React.useRef,
                        useState: React.useState,
                    },
                    "react-dom": { createPortal },
                },
            }),
        }
    })
})()
`;return`<!doctype html>
<!-- \u2728 Built with Framer \u2022 https://www.framer.com/ -->
<html${u?` lang="${u}"`:""}>
<head>
    <meta charset="utf-8">
    <script type="importmap" ${ON}>${n}<\/script>
    <script async src="https://ga.jspm.io/npm:es-module-shims@1.6.3/dist/es-module-shims.js" crossorigin="anonymous" ${BN}><\/script>
    ${q}
    ${de}
    <meta name="viewport" content="${s}">
    <meta name="generator" content="Framer ${qH}">
    ${d}
    <style ${XN}>
        ${YL.trimStart()}
        ${XH}
        ${t}
        ${m?YZ:""}
        ${e}
        ${x?.css??""}
    </style>
    ${r.join(`
    `)}
    ${j}
</head>
<body>
    ${G}
    ${$}
    <div id="${VN}"></div>
    ${ge}
    ${re}
    ${m?'<div id="__framer-badge-container"></div>':""}
    <script ${ZN}="${p?"reduce":"no-preference"}"><\/script>
    <script type="module" async ${UN}="${_N}">
        ${C.linesFrom(o.statements)}

        const routes = ${xe(new ye(i,1))}

        const locales = ${xe(h)}
        const collectionUtils = ${S?xe(new ye(S)):C`undefined`}
        const framerSiteId = "${a}"
        ${x?.declarations??""}

        export async function getPageRoot({ routeId, pathVariables, localeId }) {
            const rootPreload = routes[routeId].page.preload()

            const content = React.createElement(
                Framer.PageRoot,
                {
                    isWebsite: true,
                    routeId,
                    pathVariables,
                    routes,
                    collectionUtils,
                    framerSiteId,
                    notFoundPage: Framer.lazy(() => import("${f}")),
                    isReducedMotion: ${xe(p)},
                    localeId,
                    locales,
                    preserveQueryParams: ${xe(T)},
                    siteCanonicalURL: ${xe(W)},
                    ${A?"":`EditorBar: ${ee},`}
                    ${x?`LayoutTemplate: ${x.binding},`:""}
                }
            )

            const contentWithFeaturesContext = React.createElement(
                Framer.LibraryFeaturesProvider,
                {
                    children: content,
                    value: ${xe(b)}
                }
            )
