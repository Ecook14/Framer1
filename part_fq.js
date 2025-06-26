
    window.require = (moduleSpecifier) => {
        switch (moduleSpecifier) {
            case "react":
                return window.React
            case "object-assign":
                return Object.assign
            default:
                throw new Error("react-jsx-runtime requires unexpected module:" + moduleSpecifier)
        }
    }

    window.__REACT_RUNTIME_JSX__ = { Fragment: undefined, jsx: undefined, jsxs: undefined, jsxDEV: undefined }
    window.exports = {
        set Fragment(value) { window.__REACT_RUNTIME_JSX__.Fragment = value; },
        set jsx(value) { window.__REACT_RUNTIME_JSX__.jsx = value; },
        set jsxs(value) { window.__REACT_RUNTIME_JSX__.jsxs = value; },
        set jsxDEV(value) {window.__REACT_RUNTIME_JSX__.jsxDEV = value; }
    }
</script>

    <script>
        window.process = { env: { NODE_ENV: "production" } }
    </script>
    <script src="./scripts/react/react-jsx-runtime.production.min.js"></script>

<script>
    // Restore the globals to their prev values.
    window.require = window.__previousRequire__
    window.exports = window.__previousExports__
    window.process = window.__previousProcess__
</script>

        
        
            <link href="https://app.framerstatic.com/preview-module.RQ4WCZMQ.css" rel="stylesheet" />
            
            <style>
                html, body {
                    width: 100%;
                    height: 100%;
                }

                body > main {
                    display: contents;
                }
            </style>
        
        

        <!-- Workaround for a WebKit bug: loading via URL from the stylesheet is denied if this file is loaded via file:/// -->
        <style>
            :root {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            * {
                -webkit-font-smoothing: inherit;
            }

            @font-face {
                font-family: "Input Mono";
                font-style: normal;
                font-weight: 400;
                src: local("Input Mono"), url("fonts/QbHJVUjy6YgY.app.ttf") format("truetype");
            }

            .framerInternalUI-componentPlaceholder,
            .framerInternalUI-errorPlaceholder {
                border: calc(1px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1)) dashed currentColor;
                border-radius: calc(6px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1));
                font-size: calc(12px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1));
            }

            /* Placeholder for loading components. */
            .framerInternalUI-componentPlaceholder {
                border-style: solid;
                border-color: rgba(149, 149, 149, 0.15);
                background-color: rgba(149, 149, 149, 0.1);
                color: #a5a5a5;
            }

            /* Placeholder for components with errors. */
            .framerInternalUI-errorPlaceholder {
                border-style: solid;
                border-color: rgba(149, 149, 149, 0.15);
                background-color: rgba(149, 149, 149, 0.1);
                color: #a5a5a5;
            }

            .framerInternalUI-componentPlaceholder .text,
            .framerInternalUI-errorPlaceholder .text {
                transition: opacity 300ms;
            }

            .framerInternalUI-componentPlaceholder .pending,
            .framerInternalUI-errorPlaceholder .pending {
                opacity: 0;
            }
