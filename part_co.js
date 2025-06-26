                  collectionItemId = (await utils.getRecordIdBySlug(slug, framerLocale || undefined)) ?? null
              }
        }

        const resolvedDateTimeOptions = Intl.DateTimeFormat().resolvedOptions()
        const timezone = resolvedDateTimeOptions.timeZone
        const locale = resolvedDateTimeOptions.locale

        // wait for the page to be activated before sending the pageview event
        // https://developer.chrome.com/docs/web-platform/prerender-pages#impact-on-analytics
        await new Promise((resolve) => {
            if (document.prerendering) {
                document.addEventListener("prerenderingchange", resolve, { once: true })
            } else {
                resolve()
            }
        })

        window.__framer_events.push([
            "published_site_pageview",
            {
                framerSiteId: framerSiteId ?? null,
                routePath: route?.path || "/",
                collectionItemId,
                framerLocale: framerLocale || null,
                webPageId: route?.abTestingVariantId ?? routeId,
                abTestId: route?.abTestId,
                referrer: document.referrer || null,
                url: window.location.href,
                hostname: window.location.hostname || null,
                pathname: window.location.pathname || null,
                hash: window.location.hash || null,
                search: window.location.search || null,
                timezone,
                locale,
            },
            "eager"
        ])

        // Yield to avoid blocking the main thread with the user code
        await Framer.yieldToMain({ priority: "background", ensureContinueBeforeUnload: true, continueAfter: "paint" })

        document.dispatchEvent(new CustomEvent("framer:pageview", {
            detail: { framerLocale: framerLocale || null }
        }))
    })()
}


                const page = await pagePromise
                if (shouldHydrate) {
                    ${P?'await waitForApproval("rewriting breakpoints")':""}

                    Framer.withPerformanceMarks("framer-rewrite-breakpoints", () => {
                        Framer.removeHiddenBreakpointLayersV2(breakpoints)
                        window.__framer_onRewriteBreakpoints?.(breakpoints)
                    })

                    ${P?'const hydrationSettings = await waitForApproval("hydration", ["disableConcurrency"])':""}

                    const startTransition = ${P?"hydrationSettings.disableConcurrency ? cb => cb() : React.startTransition":"React.startTransition"}
                    startTransition(() => {
                        Framer.markHydrationStart()
                        if (${xe(N)}) Framer.turnOffReactEventHandling()
                        ReactDOM.hydrateRoot(container, page, { onRecoverableError: handleError })
                    })
                } else {
                    ${P?'await waitForApproval("initial render")':""}
                    ReactDOM.createRoot(container, { onRecoverableError: handleError }).render(page)
                }
            } catch (error) {
                handleError(error, undefined, false)
                throw error
            }
        }

        ${P?`
        function waitForApproval(stepName, supportedFlags) {
            return new Promise((resolve) => {
                let message = "! [Step-by-step init] Please call proceed() to continue to the next step: " + stepName
                if (supportedFlags) message += ". You can also pass the following settings for the next step: proceed({ " + supportedFlags.map(flag => flag + ": ...").join(", ") + " })"
                console.log(message)
                window.proceed = (options = {}) => {
                    console.log("[Step-by-step init] Proceeding to the next step: " + stepName)
                    resolve(options)
                    window.proceed = null
                }
            })
        }`:""}

        ${m?`
        ;(function () {
            if (!isBrowser) return

            React.startTransition(() => {
                ReactDOM.createRoot(document.getElementById("__framer-badge-container")).render(React.createElement(React.Suspense, {},
                    React.createElement(Framer.withStyleAppearEffect(Framer.Container), {
                        className: "__framer-badge",
                        __framer__threshold: 0.5,
                        __framer__animateOnce: true,
