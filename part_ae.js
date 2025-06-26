        
            <script src="scripts/react/react.production.min.js"></script>
<script src="scripts/react-dom/react-dom.production.min.js"></script>
<script src="scripts/react-dom/react-dom-server-legacy.browser.production.min.js"></script>
        

        
<script>
    window.__previousRequire__ = window.require
    window.__previousExports__ = window.exports
    window.__previousProcess__ = window.process

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

        
        <link href="https://app.framerstatic.com/canvas-sandbox.5LTM3HNJ.css" rel="stylesheet" />

        
        <link href="https://app.framerstatic.com/chunk-BAAGT62X.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-JRYBCUKR.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-5A4QXPD7.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-MJUL67OQ.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-QVPN4I3U.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-DPA7PT5V.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-WNSBRACC.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-DFNFZLDR.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-AHQIRSXG.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-WKCZSNMS.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-QCGKPHEK.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-TQTE6L7D.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-5567K4ZB.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-BMBD6Y3P.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-VXJAAVJQ.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-5DSVU7DA.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-4DUBS6C5.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-KD4H3DLZ.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-3EMOIMOE.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-4AQCMAAQ.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-HGOLJ3YH.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-XW2R7BKI.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-E5VACLXG.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-POQKH4YA.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-ZRH4ZQSY.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-H63K5HH5.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-2TC7UIUG.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-GR56PVWI.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-3B7AE5KH.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-F4CB7RKQ.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-S3UMZXMZ.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-AUNF3KWQ.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-V4TANWPK.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-GFD3NSS6.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-IDRLXQGJ.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-7BHYH4XR.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-L4U4H2MD.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-DDZCHXC4.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-R5NFTJNR.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-OXJ5UZH6.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-NU2TWZSG.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-E3ZBSNZS.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-UQXTNEUM.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-2RU2GM4T.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-73MZDHXJ.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-KB4TLRLO.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-B7K7UDZ6.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-BRGLFWWS.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-3EYP2W3D.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-7GSEC7H4.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-LHWXHXEU.mjs" rel="modulepreload" />
<link href="https://app.framerstatic.com/chunk-XVMAT75K.mjs" rel="modulepreload" />
