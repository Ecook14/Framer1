
            const contentWithGracefullyDegradingErrorBoundary = React.createElement(Framer.GracefullyDegradingErrorBoundary, {
                children: contentWithFeaturesContext
            })

            ${xe(C.joinLines(...v.list()))}
            const page = React.createElement(Framer.PageEffectsProvider, {
                children: contentWithGracefullyDegradingErrorBoundary,
                value: ${xe(g)}
            })

            // We don't want the initial render to immediately have to suspend.
            await rootPreload
            return page
        }

        const isBrowser = typeof document !== "undefined"
        if (isBrowser) {
            window.__framer_importFromPackage = (packageAndFilename, exportIdentifier) => () => {
                return React.createElement(Framer.ErrorPlaceholder, { error: 'Package component not supported: "' + exportIdentifier + '" in "' + packageAndFilename + '"' })
            }

            // A lot of libraries assume process.env.NODE_ENV is present in runtime/buildtime, so we are polyfilling it
            window.process = {
                ...window.process,
                env: {
                    ...(window.process ? window.process.env: undefined),
                    NODE_ENV: "production"
                }
            }

            window.__framer_events = window.__framer_events || []

            // Fallback support for stack gaps
            Framer.installFlexboxGapWorkaroundIfNeeded()

            const container = document.getElementById("main")
            // We know that #main is parsed before this script, so we don't need to wait for DOMContentLoaded or similar events.
            if ("${gC}" in container.dataset) main(true, container)
            else main(false, container)
        }

        function track() {
            if (!isBrowser) return
            window.__framer_events.push(arguments)
        }

        async function main(shouldHydrate, container) {
            function handleError(error, errorInfo, recoverable = true) {
                if (error.caught || window.__framer_hadFatalError) return // we already logged it

                const componentStack = errorInfo?.componentStack
                if (recoverable) {
                    console.warn("Recoverable error has happened. Please check any custom code or code overrides to fix server/client mismatches:\\n", error, componentStack)
                    // we only want to collect 1%, because this can be quite noisy (floods the data pipeline)
                    if (Math.random() > 0.01) return
                } else {
                    console.error("Fatal crash has happened. If you are the author of this website, please report this issue to the Framer team via https://www.framer.community/:\\n", error, componentStack)
                }
                track(recoverable ? "published_site_load_recoverable_error" : "published_site_load_error", {
                    message: String(error),
                    componentStack, // componentStack is more useful
                    stack: componentStack ? undefined : error instanceof Error && typeof error.stack === "string" ? error.stack : null,
                })
            }

            try {
                let routeId, localeId, pathVariables, breakpoints
                if (shouldHydrate) {
                    const routeData = JSON.parse(container.dataset["${gC}"])
                    routeId = routeData.routeId
                    localeId = routeData.localeId
                    pathVariables = routeData.pathVariables
                    breakpoints = routeData.breakpoints

                    routeId = Framer.patchRoutesForABTesting(routes, routeId) // Prioritize optimized route id to avoid flickering in browsers not supporting the server-timing header (Safari older than 16.4)
                } else {
                    Framer.patchRoutesForABTesting(routes, undefined) // This must happen before inferInitialRouteFromPath

                    const routeData = Framer.inferInitialRouteFromPath(routes, decodeURIComponent(location.pathname), true, locales)
                    routeId = routeData.routeId
                    localeId = routeData.localeId
                    pathVariables = routeData.pathVariables
                }

                const pagePromise = getPageRoot({ routeId, localeId, pathVariables })

                
if (typeof window !== "undefined") {
    void (async () => {
        const route = routes[routeId]

        const defaultLocaleId = "default"
        const framerLocale = locales.find(({ id }) => !localeId ? id === defaultLocaleId : id === localeId).code

        let collectionItemId = null
        if (route?.collectionId && collectionUtils) {
              const utils = await collectionUtils[route.collectionId]?.()
              const [slug] = Object.values(pathVariables)
              if (utils && typeof slug === "string") {
