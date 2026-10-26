(function (global) {
  const config = {
    commercialName: "Óptima Canales",
    shortName: "Óptima",
    legalName: "ÓPTIMA MERCADO ENERGÉTICO SL",
    contactEmail: "info@optimamercado.com",
    privacyEmail: "info@optimamercado.com",
    b2cSiteUrl: "https://optimamercado.com",
    siteUrl: "https://optimacanales.com",
    applicationEndpoint: "",
    whatsappUrl: "",
    applicationSubject: "Solicitud de valoración como canal energético",
    seo: {
      title: "Canal energético B2B para colaboradores | Óptima Canales",
      description:
        "Programa de colaboradores energéticos para negocios y comerciales: comparativas, tramitación, seguimiento y soporte para tu cartera.",
      ogTitle: "Canal energético B2B para hacer crecer tu cartera",
      ogDescription:
        "Óptima pone la herramienta, las comparativas, la tramitación y el soporte. Tú mantienes la relación con tu cliente.",
    },
    analyticsEvents: {
      viewHome: "view_b2b_home",
      clickRequestEvaluation: "click_request_evaluation",
      startApplication: "start_channel_application",
      submitApplication: "submit_channel_application",
      clickB2bWhatsapp: "click_b2b_whatsapp",
      clickTalkToTeam: "click_talk_to_team",
      viewHowItWorks: "view_how_it_works",
      viewProfileTypes: "view_profile_types",
      formValidationError: "form_validation_error",
    },
  };

  global.OPTIMA_SITE = Object.freeze(config);
})(typeof window !== "undefined" ? window : globalThis);
