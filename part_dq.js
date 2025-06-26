
{"id":"lE8WeUaxGDflb6iSF9mG","accessToken":"dD4Vz","title":"Untitled","space":{"displayName":"My Workspace","id":"2f7069a2-d43e-368f-b0a3-f1efb5716d27","scope":"organization","ownerId":"f50d3706-f584-445f-a774-a3764704cc89","icon":null,"avatar":null},"duplicatedFromId":"7w17XQ1bFdhGCd1pDpL0","createdAt":"2025-06-16T12:10:36.455Z","updatedAt":"2025-06-16T12:10:36.455Z","owner":{"id":"1660f8a7-9b0d-44c4-9e01-dd7a3974e688","name":"Aron Stone","initials":"AS","avatar":null},"url":"https://framer.com/projects/lE8WeUaxGDflb6iSF9mG","publicAccess":"view","lastOpenedAt":"2025-06-16T14:56:13.888Z","userRole":"owner","userProjectRoles":["admin","publisher","designer","contentEditor"],"userPermissions":{"canDesign":"on","canEditContent":"on","canPublish":"on"},"archived":false,"archivedAt":null,"archivedBy":null,"collection":null,"shareLinks":[{"id":"gKsGIzzA5vTKRYxylooa","projectId":"lE8WeUaxGDflb6iSF9mG","publicAccess":"view","createdAt":"2025-06-16T12:10:36.461Z","updatedAt":"2025-06-16T12:10:36.461Z"}],"settings":{"allowedDomains":["gmail.com"],"cannotInviteEditorsReason":null,"autoJoinDefaultRole":"editor","version":2,"featureFlags":{"canPublishToCustomDomain":"upsell","showBannerOnPublishedSite":"on","canUseEditorCustomCode":"upsell","canUsePasswordProtection":"upsell","canUseAnalytics":"on","canUseStagingEnvironment":"upsell","canUseVersioning":"upsell","canUseRedirects":"upsell","canUseCustomCanonicalUrl":"off","canUseCookieBannerModule":"on","canUseBatchAITranslation":"upsell","canUseCustomLocaleRegions":"upsell","canUseLocalizationVariables":"on","canUseLocalizationCustomAiInstructions":"on","canUseBetaChannel":"off","canUseWellKnown":"upsell","canUseEditorPermissions":"off","canUseDrafts":"on","canUseCustomProxy":"off","canUseSSO":"off","canUseUTMTracking":"off","canUseAdvancedAnalytics":"on","canUseAdvancedAnalyticsForReal":"on","canUseAnalyticsExtendedDateRange":"off","canUseCustomSSLCertificate":"off","canInviteEditors":"on","canUsePrivateLink":"upsell","canUsePrototypePassword":"upsell","canPublishTeamPackages":"upsell","canUseCustomFonts":"on","canChangeProjectAccess":"on","canChangePrototypeAccess":"off","canInviteAnyDomain":"on","canInviteAnyDomainToPrototype":"on","canExportToHtml":"upsell","canHidePreviewInterface":"upsell","showSitesUpsell":"on","canUseTeamPlugins":"off","blockEditorBar":"off"},"resourceLimits":{"cmsCollections":10,"cmsItems":null,"pages":null,"fileUploadLimitInMB":50,"locales":1,"translatableWords":5000,"formSubmissions":50,"versionHistoryInDays":3,"storageInMB":500,"bandwidthInGB":1,"redirects":0,"maxEditors":null,"maxLocales":0,"abTests":1,"trackingEventsLimit":25000}},"canvasFeatures":{"kit":false,"sites":true,"packages":false,"codeModules":true,"skipInterstitial":false},"type":"default","teamExperiments":null,"teamLicenseType":"free","teamCurrentEditors":1,"license":{"id":null,"projectId":"lE8WeUaxGDflb6iSF9mG","type":"freeSite","period":null,"expirationDate":null,"subscriptionIsActive":false,"version":2},"releaseChannel":null,"isTeamBilledOnPaddle":false,"teamSyncAction":null,"partnerLink":null}

--- End of lE8WeUaxGDflb6iSF9mG.txt ---


--- Start of libraries.txt ---

{
   "data": [
      {
         "id": "jVXruTA1LjRTVtswr2S3",
         "ownerTeamId": "f50d3706-f584-445f-a774-a3764704cc89",
         "title": null,
         "createdAt": "2025-06-16T12:10:42.080818Z",
         "updatedAt": "2025-06-16T12:10:42.080818Z",
         "deletedAt": null,
         "permissions": {
            "canEdit": true
         }
      }
   ]
}


--- End of libraries.txt ---


--- Start of loading-iframe.html.txt ---

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Video</title>
    <style>
        html,
        body {
            margin: 0;
            padding: 0;
            width: 36px;
            height: 36px;
            overflow: hidden;
            background-color: transparent;
        }

        /* hide any unknown elements to prevent browser extensions adding extra visible stuff */
        body * {
            display: none !important;
        }

        main {
            display: block !important;
            width: 36px;
            height: 36px;
        }

        video {
            display: block !important;
            /* fixes safari black borders around video */
            clip-path: fill-box;
        }
    </style>
</head>
<body>
<main>
    <video id="logo" autoplay loop muted width="36px" height="36px"></video>
    <script>
        const logo = document.getElementById("logo")
        const source = document.createElement("source")
        logo.appendChild(source)

        source.type = "video/mp4"
        if (location.href.includes("theme=light")) {
            source.src = "https://app.framerstatic.com/rotating-logo-light-MBOJKUQ3.mp4"
        } else {
            source.src = "https://app.framerstatic.com/rotating-logo-dark-5VKVNLE3.mp4"
        }
    </script>
</main>
</body>
</html>


--- End of loading-iframe.html.txt ---


--- Start of log.txt ---

{}

--- End of log.txt ---


--- Start of lookup.txt ---

{
   "data": [
      {
         "id": "ZNXvUJ3PpDwaP4WS03kc",
         "ownerId": "HnsiyBZHrEcA6xPpph8d",
