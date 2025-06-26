    --framer-font-size: 16px;
    --framer-letter-spacing: 0;
    --framer-text-transform: none;
    --framer-text-decoration: none;
    --framer-line-height: 1.2em;
    --framer-text-alignment: start;
    --framer-font-open-type-features: normal;
    --font-variation-settings: normal;
}
`,bre=`
[data-framer-component-type="DeprecatedRichText"] ul,
[data-framer-component-type="DeprecatedRichText"] ol {
    display: table;
    width: 100%;
    padding-left: 0;
    margin: 0;
}
`,xre=`
[data-framer-component-type="DeprecatedRichText"] li {
    display: table-row;
    counter-increment: list-item;
    list-style: none;
}
`,Sre=`
[data-framer-component-type="DeprecatedRichText"] ol > li::before {
    display: table-cell;
    width: 2.25ch;
    box-sizing: border-box;
    padding-right: 0.75ch;
    content: counter(list-item) ".";
    white-space: nowrap;
}
`,Cre=`
[data-framer-component-type="DeprecatedRichText"] ul > li::before {
    display: table-cell;
    width: 2.25ch;
    box-sizing: border-box;
    padding-right: 0.75ch;
    content: "\u2022";
}
`,bL=['[data-framer-component-type="DeprecatedRichText"] { cursor: inherit; }',vre,gre,sre,lre,ure,cre,fre,dre,pre,mre,hre,yre,bre,xre,Sre,Cre];var Sf=E(q(),1),nh=(L=>(L.Padding="--framer-input-padding",L.BorderRadiusTopLeft="--framer-input-border-radius-top-left",L.BorderRadiusTopRight="--framer-input-border-radius-top-right",L.BorderRadiusBottomRight="--framer-input-border-radius-bottom-right",L.BorderRadiusBottomLeft="--framer-input-border-radius-bottom-left",L.BorderColor="--framer-input-border-color",L.BorderTopWidth="--framer-input-border-top-width",L.BorderRightWidth="--framer-input-border-right-width",L.BorderBottomWidth="--framer-input-border-bottom-width",L.BorderLeftWidth="--framer-input-border-left-width",L.BorderStyle="--framer-input-border-style",L.Background="--framer-input-background",L.FontFamily="--framer-input-font-family",L.FontWeight="--framer-input-font-weight",L.FontSize="--framer-input-font-size",L.FontColor="--framer-input-font-color",L.FontStyle="--framer-input-font-style",L.FontLetterSpacing="--framer-input-font-letter-spacing",L.FontTextAlignment="--framer-input-font-text-alignment",L.FontLineHeight="--framer-input-font-line-height",L.FontOpenType="--framer-input-font-open-type-features",L.PlaceholderColor="--framer-input-placeholder-color",L.BoxShadow="--framer-input-box-shadow",L.FocusedBorderColor="--framer-input-focused-border-color",L.FocusedBorderWidth="--framer-input-focused-border-width",L.FocusedBorderStyle="--framer-input-focused-border-style",L.FocusedBackground="--framer-input-focused-background",L.FocusedBoxShadow="--framer-input-focused-box-shadow",L.FocusedTransition="--framer-input-focused-transition",L.BooleanCheckedBackground="--framer-input-boolean-checked-background",L.BooleanCheckedBorderColor="--framer-input-boolean-checked-border-color",L.BooleanCheckedBorderWidth="--framer-input-boolean-checked-border-width",L.BooleanCheckedBorderStyle="--framer-input-boolean-checked-border-style",L.BooleanCheckedBoxShadow="--framer-input-boolean-checked-box-shadow",L.BooleanCheckedTransition="--framer-input-boolean-checked-transition",L.InvalidTextColor="--framer-input-invalid-text-color",L.IconBackgroundImage="--framer-input-icon-image",L.IconMaskImage="--framer-input-icon-mask-image",L.IconColor="--framer-input-icon-color",L.WrapperHeight="--framer-input-wrapper-height",L))(nh||{}),ar=nh,On="framer-form-input",Lu="framer-form-input-wrapper",RI="framer-form-input-empty",xs="framer-form-input-forced-focus",kv="framer-form-input-forced-checked";function Tre(e){return typeof e=="number"?e:e.startsWith("--")?ae.variable(e):e===""?'""':e}function ae(e,t){let r=" ";for(let n in t){let o=t[n];r+=`${n.replace(/([A-Z])/gu,"-$1").toLowerCase()}: ${Tre(o)}; `}return e+" {"+r+"}"}(t=>{function e(...r){let n=r[r.length-1],o=n.startsWith("--")?`var(${n})`:n;for(let i=r.length-2;i>=0;i--)o=`var(${r[i]}, ${o})`;return o}t.variable=e})(ae||={});var Ev=[ae(`.${On}`,{padding:ae.variable(ar.Padding),background:"transparent",fontFamily:ae.variable(ar.FontFamily),fontWeight:ae.variable(ar.FontWeight),fontSize:ae.variable(ar.FontSize),fontStyle:ae.variable(ar.FontStyle),color:ae.variable(ar.FontColor),fontFeatureSettings:ae.variable(ar.FontOpenType),border:"none",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",width:"100%",height:ae.variable(ar.WrapperHeight,"100%"),letterSpacing:ae.variable(ar.FontLetterSpacing),textAlign:ae.variable(ar.FontTextAlignment),lineHeight:ae.variable(ar.FontLineHeight)}),ae(`.${On}:focus-visible`,{outline:"none"})],Dv=[ae(`.${Lu}`,{overflow:"hidden"})],Ss=`var(${ar.BorderTopWidth}) var(${ar.BorderRightWidth}) var(${ar.BorderBottomWidth}) var(${ar.BorderLeftWidth})`,Vv=[`.${Lu}:after {
        content: "";
        pointer-events: none;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-top-left-radius: var(${ar.BorderRadiusTopLeft});
        border-top-right-radius: var(${ar.BorderRadiusTopRight});
        border-bottom-right-radius: var(${ar.BorderRadiusBottomRight});
        border-bottom-left-radius: var(${ar.BorderRadiusBottomLeft});
        border-color: var(${ar.BorderColor});
        border-top-width: var(${ar.BorderTopWidth});
        border-right-width: var(${ar.BorderRightWidth});
        border-bottom-width: var(${ar.BorderBottomWidth});
        border-left-width: var(${ar.BorderLeftWidth});
        border-style: var(${ar.BorderStyle});
        transition: var(${ar.FocusedTransition});
        transition-property: border-color, border-width, border-style, border-top-left-radius, border-top-right-radius, border-bottom-right-radius, border-bottom-left-radius;
    }`],Rre="customError",wre="valid";function Ire(e){return e!==Rre&&e!==wre}function xL(e){for(let t in e)if(Ire(t)&&e?.[t]===!0)return!0;return!1}function Cf(e,t,r,n,o){let i=Sf.default.useRef(null),a=Sf.default.useCallback(c=>{t&&i.current!==!1&&(i.current=!1,c.currentTarget.setCustomValidity(" "),c.currentTarget.reportValidity(),t(c))},[t]),l=Sf.default.useCallback(c=>{if(r?.(c),!t&&!e)return;let d=c.target.validity;i.current===!1&&!xL(d)&&(c.currentTarget.setCustomValidity(""),c.target.reportValidity(),i.current=!0,e?.())},[t,e,r]),u=Sf.default.useCallback(c=>{if(!t){n?.(c);return}if(i.current===!1)return;let d=c.currentTarget.validity;if(xL(d)){a(c);return}n?.(c)},[a,n,t]);return Sf.default.useMemo(()=>({onInvalid:a,onChange:l,onBlur:u,onFocus:o}),[a,l,u,o])}var il=10,TI=16,Tf={content:"",display:"block",position:"absolute",right:0,top:0,bottom:0,width:`${TI}px`,boxSizing:"content-box",padding:ae.variable(ar.Padding),border:"none",pointerEvents:"none",backgroundRepeat:"no-repeat",backgroundSize:`${TI}px`,maskRepeat:"no-repeat",maskSize:`${TI}px`,backgroundColor:ae.variable(ar.IconColor)};function Xi(e,t){return ae.variable(...e.flatMap(r=>[`${r}-rgb`,r]),t)}var SL=[`
        p.framer-text,
        div.framer-text,
        figure.framer-text,
        h1.framer-text,
        h2.framer-text,
        h3.framer-text,
        h4.framer-text,
        h5.framer-text,
        h6.framer-text,
        ol.framer-text,
        ul.framer-text {
            margin: 0;
            padding: 0;
        }
    `,`
        p.framer-text,
        div.framer-text,
        h1.framer-text,
        h2.framer-text,
        h3.framer-text,
        h4.framer-text,
        h5.framer-text,
        h6.framer-text,
        li.framer-text,
        ol.framer-text,
        ul.framer-text,
        span.framer-text:not([data-text-fill]) {
            font-family: var(--framer-blockquote-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
            font-style: var(--framer-blockquote-font-style, var(--framer-font-style, normal));
            font-weight: var(--framer-blockquote-font-weight, var(--framer-font-weight, 400));
            color: var(--framer-blockquote-text-color, var(--framer-text-color, #000));
            font-size: calc(var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
            letter-spacing: var(--framer-blockquote-letter-spacing, var(--framer-letter-spacing, 0));
            text-transform: var(--framer-blockquote-text-transform, var(--framer-text-transform, none));
            text-decoration: var(--framer-blockquote-text-decoration, var(--framer-text-decoration, none));
            line-height: var(--framer-blockquote-line-height, var(--framer-line-height, 1.2em));
            text-align: var(--framer-blockquote-text-alignment, var(--framer-text-alignment, start));
            -webkit-text-stroke-width: var(--framer-text-stroke-width, initial);
