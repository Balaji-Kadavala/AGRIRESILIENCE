export const LANGUAGES = [
  { code: 'en', label: 'English', sub: 'Standard English Interface', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी (Hindi)', sub: 'भारतीय किसानों के लिए', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు (Telugu)', sub: 'రైతుల కోసం స్పష్టమైన భాష', flag: '🌾' },
];

export const TRANSLATIONS = {
  en: {
    title: "AgriResilience AI",
    subtitle: "Weather-aware AI crop decision support",
    heroBadge: "Next-Gen Agricultural Intelligence",
    heroHeadline: "From a leaf photo to a smarter field decision.",
    heroSub: "Upload a crop leaf image, share your farm coordinates, and receive an AI-powered visual assessment combined with live local weather intelligence.",
    pipelineTitle: "Integrated Decision Pipeline",
    step1Title: "1. Leaf Image",
    step1Sub: "Photo Capture",
    step2Title: "2. Farm GPS",
    step2Sub: "Coordinates",
    step3Title: "3. Open-Meteo",
    step3Sub: "Live Weather",
    step4Title: "4. AI Vision",
    step4Sub: "Pathology Scan",
    step5Title: "5. Agronomy Engine",
    step5Sub: "Risk Fusion",
    step6Title: "6. Action Plan",
    step6Sub: "Weather-Aware",
    
    uploadTitle: "1. Upload Crop Leaf Photo",
    photoLoaded: "Photo Loaded",
    clickUpload: "Click to upload or drag & drop leaf photo",
    uploadNote: "JPEG, PNG or WEBP (Max 10MB)",
    takePhoto: "Take Photo",
    browseFile: "Browse File",
    quickTest: "Quick Test Photos:",
    sampleTomato: "🍃 Tomato Leaf",
    sampleRice: "🌾 Healthy Rice",
    sampleMosaic: "🟡 Yellow Mosaic",
    sampleBlurry: "⚠️ Blurry Leaf",
    replaceBtn: "Replace",
    
    locationTitle: "2. Farm Field Location",
    editManual: "Edit Manually",
    cancelEdit: "Cancel",
    useGps: "Use My GPS",
    gpsFetching: "GPS Fetching...",
    enterCoordsTitle: "Enter Field Coordinates Manually:",
    latLabel: "Latitude (°N)",
    lonLabel: "Longitude (°E)",
    applyCoords: "Apply Coordinates",
    
    weatherTitle: "3. Field Microclimate & Forecast",
    tempLabel: "Temperature",
    humidityLabel: "Humidity",
    rainChanceLabel: "Rain Chance",
    windSpeedLabel: "Wind Speed",
    upcomingRainAdvisory: "Upcoming Rain Advisory:",
    timelineTitle: "24-Hour Forecast Timeline",
    interpretationTitle: "Microclimate Interpretation:",
    
    analyzeBtn: "🌱 Analyze My Crop Now",
    analyzeSub: "Clicking will fuse leaf image pathology with live field weather parameters.",
    analyzingTitle: "Analyzing Field Conditions...",
    analyzingSub: "Combining visual pathology analysis with real-time field weather parameters",
    
    farmerSummaryTitle: "🌾 Farmer At-A-Glance Summary",
    readAloud: "🔊 Read Guidance Aloud",
    stopReading: "⏹️ Stop Audio",
    
    cropLabel: "Crop:",
    severityLabel: "Severity:",
    aiConfidenceLabel: "AI Assessment Confidence:",
    confidenceNote: "Confidence reflects the model's visual symptom assessment and is not a laboratory-confirmed diagnosis.",
    fieldContext: "Field Context",
    symptomsTitle: "Identified Visual Symptoms:",
    
    envRiskTitle: "Environmental Risk Assessment",
    actionPlanTitle: "🚜 Weather-Aware Action Plan",
    timingTitle: "Optimal Weather-Aware Action Timing",
    doNowTitle: "What Should I Do Now?",
    avoidTitle: "What Should I Avoid?",
    reassessTitle: "When to Reassess:",
    expertTitle: "When to Seek Expert Help:",
    
    whyTitle: "Why did we recommend this?",
    whySub: "Click to view how leaf features and microclimate data were merged",
    reasoningChainTitle: "Transparent Reasoning Chain",
    evidenceTitle: "1. Visual Leaf Evidence",
    weatherContextTitle: "2. Field Weather Context",
    diagnosticReasoningTitle: "3. Multimodal Diagnostic Reasoning",
    synthesisTitle: "4. Actionable Synthesis Rationale",
    
    inconclusiveTitle: "⚠️ Image Inconclusive",
    inconclusiveSub: "Visual resolution or lighting was insufficient to guarantee a reliable disease diagnosis.",
    inconclusiveDesc: "Our AI safety protocol prevents generating a forced diagnosis when visual evidence is unclear or blurred. Please capture a clearer image of the affected leaf.",
    photoTipsTitle: "Recommended Photo Tips for Best Results:",
    tip1: "Use bright, natural daylight lighting",
    tip2: "Keep one single leaf clearly visible in center",
    tip3: "Focus sharply on the affected leaf spots/lesions",
    tip4: "Avoid camera motion blur & extreme distance",
    retakeBtn: "Retake or Choose Clear Photo",
    
    disclaimerTitle: "Decision Support Prototype Disclaimer",
    disclaimer: "This system provides AI-assisted decision support for educational and demonstration purposes. Always verify diagnosis and chemical application safety with licensed local agricultural extension officers or certified agronomists before applying treatments.",
    footerText: "Farmer-Friendly Interface | Built for Hackathon Live Demo"
  },

  hi: {
    title: "एग्री-रेजिस्टेंस एआई",
    subtitle: "मौसम-आधारित एआई फसल सुरक्षा सलाह",
    heroBadge: "नेक्स्ट-जनरेशन कृषि खुफिया प्रणाली",
    heroHeadline: "पत्ती की फोटो से खेत के स्मार्ट फैसले तक।",
    heroSub: "फसल की पत्ती की फोटो अपलोड करें, खेत का स्थान शेयर करें, और स्थानीय मौसम के अनुसार सटीक एआई सलाह पाएं।",
    pipelineTitle: "एकीकृत कृषि निर्णय पाइपलाइन",
    step1Title: "1. पत्ती की फोटो",
    step1Sub: "फोटो कैप्चर",
    step2Title: "2. खेत जीपीएस",
    step2Sub: "स्थान निर्देशांक",
    step3Title: "3. ओपन-मेटियो",
    step3Sub: "लाइव मौसम",
    step4Title: "4. एआई विजन",
    step4Sub: "बीमारी जांच",
    step5Title: "5. कृषि इंजन",
    step5Sub: "जोखिम विश्लेषण",
    step6Title: "6. कार्य योजना",
    step6Sub: "मौसम-अनुकूल सलाह",
    
    uploadTitle: "1. फसल की पत्ती की फोटो अपलोड करें",
    photoLoaded: "फोटो लोड हो गई",
    clickUpload: "फोटो अपलोड करने के लिए क्लिक करें या खींचकर लाएं",
    uploadNote: "JPEG, PNG या WEBP (अधिकतम 10MB)",
    takePhoto: "फोटो खींचें",
    browseFile: "फाइल चुनें",
    quickTest: "त्वरित परीक्षण फोटो:",
    sampleTomato: "🍃 टमाटर की पत्ती",
    sampleRice: "🌾 स्वस्थ धान",
    sampleMosaic: "🟡 पीला मोज़ेक",
    sampleBlurry: "⚠️ धुंधली पत्ती",
    replaceBtn: "फोटो बदलें",
    
    locationTitle: "2. खेत का स्थान",
    editManual: "खुद दर्ज करें",
    cancelEdit: "रद्द करें",
    useGps: "मेरा जीपीएस प्रयोग करें",
    gpsFetching: "जीपीएस खोज रहा है...",
    enterCoordsTitle: "खेत के निर्देशांक खुद भरें:",
    latLabel: "अक्षांश (°N)",
    lonLabel: "देशांतर (°E)",
    applyCoords: "स्थान लागू करें",
    
    weatherTitle: "3. खेत का मौसम और पूर्वानुमान",
    tempLabel: "तापमान",
    humidityLabel: "नमी (Humidity)",
    rainChanceLabel: "बारिश की संभावना",
    windSpeedLabel: "हवा की गति",
    upcomingRainAdvisory: "आगामी बारिश की चेतावनी:",
    timelineTitle: "24-घंटे का मौसम पूर्वानुमान",
    interpretationTitle: "मौसम कृषि विश्लेषण:",
    
    analyzeBtn: "🌱 मेरी फसल की जांच करें",
    analyzeSub: "क्लिक करने पर पत्ती के लक्षणों को लाइव मौसम के साथ मिलाकर सलाह मिलेगी।",
    analyzingTitle: "खेत की स्थिति की जांच हो रही है...",
    analyzingSub: "पत्ती के लक्षणों और मौसम के आंकड़ों का विश्लेषण किया जा रहा है",
    
    farmerSummaryTitle: "🌾 किसान त्वरित मुख्य सारांश",
    readAloud: "🔊 बोलकर सलाह सुनें",
    stopReading: "⏹️ आवाज रोकें",
    
    cropLabel: "फसल:",
    severityLabel: "गंभीरता:",
    aiConfidenceLabel: "एआई आकलन विश्वसनीयता:",
    confidenceNote: "विश्वसनीयता मॉडल के दृश्य लक्षणों पर आधारित है और यह लैब जांच की गारंटी नहीं है।",
    fieldContext: "खेत का संदर्भ",
    symptomsTitle: "पत्ती पर दिखे मुख्य लक्षण:",
    
    envRiskTitle: "पर्यावरण और मौसम जोखिम आकलन",
    actionPlanTitle: "🚜 मौसम-अनुकूल किसान कार्य योजना",
    timingTitle: "छिड़काव का सही मौसम-अनुकूल समय",
    doNowTitle: "अभी क्या करना चाहिए?",
    avoidTitle: "किन बातों से बचें?",
    reassessTitle: "दोबारा कब जांच करें:",
    expertTitle: "कृषि विशेषज्ञ की मदद कब लें:",
    
    whyTitle: "हमने यह सलाह क्यों दी?",
    whySub: "यह देखने के लिए क्लिक करें कि लक्षण और मौसम कैसे मिलाए गए",
    reasoningChainTitle: "पारदर्शी एआई तर्क श्रृंखला",
    evidenceTitle: "1. पत्ती के दृश्य लक्षण",
    weatherContextTitle: "2. खेत का मौसम संदर्भ",
    diagnosticReasoningTitle: "3. एआई बीमारी विश्लेषण",
    synthesisTitle: "4. अंतिम किसान सलाह तर्क",
    
    inconclusiveTitle: "⚠️ फोटो स्पष्ट नहीं है",
    inconclusiveSub: "फोटो धुंधली या कम रोशनी के कारण बीमारी की सही पहचान नहीं हो सकी।",
    inconclusiveDesc: "गलत सलाह से बचाने के लिए हमारी एआई अस्पष्ट फोटो पर अनुमान नहीं लगाती। कृपया पत्ती की साफ फोटो लें।",
    photoTipsTitle: "साफ फोटो खींचने के सुझाव:",
    tip1: "दिन की प्राकृतिक और तेज रोशनी में फोटो लें",
    tip2: "केवल एक पत्ती को बीच में साफ रखें",
    tip3: "प्रभावित धब्बों पर कैमरा फोकस करें",
    tip4: "कैमरा हिलाने और बहुत दूर से फोटो लेने से बचें",
    retakeBtn: "दूसरी साफ फोटो खींचें",
    
    disclaimerTitle: "कृषि निर्णय सहायता अस्वीकरण",
    disclaimer: "यह प्रणाली किसानों की सहायता के लिए एआई आधारित है। किसी भी बड़े रासायनिक छिड़काव से पहले अपने स्थानीय कृषि विस्तार अधिकारी से सलाह लें।",
    footerText: "किसान-अनुकूल इंटरफेस | हैकाथॉन लाइव प्रदर्शन"
  },

  te: {
    title: "ఆగ్రి-రెసిలియెన్స్ AI",
    subtitle: "వాతావరణ ఆధారిత AI పంట రక్షణ సలహాలు",
    heroBadge: "నెక్స్ట్-జనరేషన్ వ్యవసాయ సాంకేతిక వ్యవస్థ",
    heroHeadline: "ఆకు ఫోటో నుండి పొలం స్మార్ట్ నిర్ణయం వరకు.",
    heroSub: "మీ పంట ఆకు ఫోటో అప్‌లోడ్ చేయండి, మీ పొలం వివరాలను పంచుకోండి మరియు ప్రత్యక్ష స్థానిక వాతావరణంతో కలిపి AI పరిశీలన పొందండి.",
    pipelineTitle: "సమగ్ర నిర్ణయ వ్యవస్థ",
    step1Title: "1. ఆకు ఫోటో",
    step1Sub: "ఫోటో తీయండి",
    step2Title: "2. పొలం GPS",
    step2Sub: "స్థాన వివరాలు",
    step3Title: "3. ఓపెన్-మీటియో",
    step3Sub: "లైవ్ వాతావరణం",
    step4Title: "4. AI విజన్",
    step4Sub: "తెగులు విశ్లేషణ",
    step5Title: "5. అగ్రోనమీ ఇంజిన్",
    step5Sub: "ప్రమాద విశ్లేషణ",
    step6Title: "6. కార్యాచరణ ప్రణాళిక",
    step6Sub: "వాతావరణ-అనుకూల",
    
    uploadTitle: "1. పంట ఆకు ఫోటో అప్‌లోడ్ చేయండి",
    photoLoaded: "ఫోటో తీసుకోబడింది",
    clickUpload: "ఆకు ఫోటో అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా ఇక్కడ లాగండి",
    uploadNote: "JPEG, PNG లేదా WEBP (గరిష్టంగా 10MB)",
    takePhoto: "ఫోటో తీయండి",
    browseFile: "ఫైల్‌ని ఎంచుకోండి",
    quickTest: "తక్షణ పరీక్ష ఫోటోలు:",
    sampleTomato: "🍃 టమోటా ఆకు",
    sampleRice: "🌾 ఆరోగ్యకరమైన వరి",
    sampleMosaic: "🟡 పసుపు మోజాయిక్",
    sampleBlurry: "⚠️ మసక ఆకు",
    replaceBtn: "మార్చండి",
    
    locationTitle: "2. పొలం స్థానం",
    editManual: "మాన్యువల్‌గా నమోదు చేయండి",
    cancelEdit: "రద్దు చేయండి",
    useGps: "నా GPS ఉపయోగించండి",
    gpsFetching: "GPS పొందుతోంది...",
    enterCoordsTitle: "పొలం అక్షాంశ రేఖాంశ వివరాలు నమోదు చేయండి:",
    latLabel: "అక్షాంశం (°N)",
    lonLabel: "రేఖాంశం (°E)",
    applyCoords: "స్థానాన్ని వర్తింపజేయండి",
    
    weatherTitle: "3. పొలం వాతావరణం మరియు అంచనా",
    tempLabel: "ఉష్ణోగ్రత",
    humidityLabel: "తేమ (Humidity)",
    rainChanceLabel: "వర్షం అవకాశం",
    windSpeedLabel: "గాలి వేగం",
    upcomingRainAdvisory: "రాబోయే వర్షం హెచ్చరిక:",
    timelineTitle: "24-గంటల వాతావరణ టైమ్‌లైన్",
    interpretationTitle: "వాతావరణ విశ్లేషణ:",
    
    analyzeBtn: "🌱 నా పంటను పరిశీలించండి",
    analyzeSub: "క్లిక్ చేయడం ద్వారా ఆకు లక్షణాలను లైవ్ వాతావరణంతో కలిపి సలహా లభిస్తుంది.",
    analyzingTitle: "పొలం పరిస్థితులను విశ్లేషిస్తోంది...",
    analyzingSub: "ఆకు లక్షణాలను మరియు లైవ్ వాతావరణ వివరాలను విశ్లేషిస్తోంది",
    
    farmerSummaryTitle: "🌾 రైతు ముఖ్యాంశాల సారాంశం",
    readAloud: "🔊 సలహాలను వినండి",
    stopReading: "⏹️ ఆడియో ఆపండి",
    
    cropLabel: "పంట:",
    severityLabel: "తీవ్రత:",
    aiConfidenceLabel: "AI అంచనా విశ్వసనీయత:",
    confidenceNote: "విశ్వసనీయత మోడల్ దృశ్య లక్షణాలపై ఆధారపడింది, ఇది ల్యాబ్ నివేదిక కాదు.",
    fieldContext: "పొలం వివరాలు",
    symptomsTitle: "గుర్తించిన దృశ్య లక్షణాలు:",
    
    envRiskTitle: "పర్యావరణ ప్రమాద అంచనా",
    actionPlanTitle: "🚜 వాతావరణ-అనుకూల కార్యాచరణ ప్రణాళిక",
    timingTitle: "సరైన వాతావరణ-అనుకూల సమయం",
    doNowTitle: "ఇప్పుడు ఏమి చేయాలి?",
    avoidTitle: "ఏమి చేయకూడదు?",
    reassessTitle: "మళ్లీ ఎప్పుడు పరిశీలించాలి:",
    expertTitle: "నిపుణుల సహాయం ఎప్పుడు తీసుకోవాలి:",
    
    whyTitle: "మేము ఈ సలహాను ఎందుకు ఇచ్చాము?",
    whySub: "లక్షణాలు మరియు వాతావరణం ఎలా విశ్లేషించబడ్డాయో చూడటానికి క్లిక్ చేయండి",
    reasoningChainTitle: "పారదర్శక AI ఆలోచనా సరళి",
    evidenceTitle: "1. ఆకు దృశ్య ఆధారాలు",
    weatherContextTitle: "2. పొలం వాతావరణ వివరాలు",
    diagnosticReasoningTitle: "3. AI రోగ నిర్ధారణ ఆలోచన",
    synthesisTitle: "4. చివరి కార్యాచరణ సారాంశం",
    
    inconclusiveTitle: "⚠️ ఫోటో స్పష్టంగా లేదు",
    inconclusiveSub: "వెలుతురు లేకపోవడం లేదా మసకగా ఉండటం వలన వ్యాధి సరిగ్గా నిర్ధారించబడలేదు.",
    inconclusiveDesc: "తప్పు సలహాలను నివారించడానికి మా AI మసక ఫోటోలపై ఊహించదు. దయచేసి ఆకు స్పష్టమైన ఫోటో తీయండి.",
    photoTipsTitle: "స్పష్టమైన ఫోటో తీయడానికి సలహాలు:",
    tip1: "మంచి పగటి వెలుతురులో ఫోటో తీయండి",
    tip2: "ఒకే ఆకును మధ్యలో స్పష్టంగా ఉంచండి",
    tip3: "వ్యాధి మచ్చలపై కెమెరా ఫోకస్ చేయండి",
    tip4: "కెమెరా ఊగడం మరియు దూరంగా తీయడం నివారించండి",
    retakeBtn: "మరొక స్పష్టమైన ఫోటో తీయండి",
    
    disclaimerTitle: "వ్యవసాయ నిర్ణయ సహాయ నిరాకరణ",
    disclaimer: "ఈ వ్యవస్థ రైతులకు సహాయకరమైన AI ఆధారిత సలహాలను అందిస్తుంది. ఏవైనా రసాయనాలు ఉపయోగించే ముందు స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.",
    footerText: "రైతు-అనుకూల ఇంటర్ఫేస్ | హ్యాకథాన్ లైవ్ డెమో"
  }
};

export function getLocalizedDiagnosis(possibleIssue, crop, lang) {
  if (!possibleIssue) return '';

  if (lang === 'hi') {
    if (possibleIssue.includes('Pineapple Heart Rot') || possibleIssue.includes('Phytophthora')) return 'अनन्नास सड़न रोग (Pineapple Heart Rot)';
    if (possibleIssue.includes('Panama') || possibleIssue.includes('Fusarium')) return 'पनामा रोग / फ्यूजेरियम उकठा (Panama Disease)';
    if (possibleIssue.includes('Healthy')) return 'स्वास्थ्य फसल (Healthy Crop)';
    if (possibleIssue.includes('Early Blight')) return 'अगेती झुलसा रोग (Early Blight)';
    if (possibleIssue.includes('Late Blight')) return 'पछेती झुलसा रोग (Late Blight)';
    if (possibleIssue.includes('Yellow Mosaic')) return 'पीला मोज़ेक वायरस (Yellow Mosaic Virus)';
    if (possibleIssue.includes('Powdery Mildew')) return 'सफेद चूर्णी फफूंद (Powdery Mildew)';
    if (possibleIssue.includes('Rust')) return 'गेरुआ / रस्ट रोग (Common Rust)';
    if (possibleIssue.includes('Brown Spot')) return 'धान का भूरा धब्बा रोग (Brown Spot)';
    if (possibleIssue.includes('Pest')) return 'कीट प्रकोप (Pest Infestation)';
    if (possibleIssue.includes('Bacterial')) return 'जीवाणु धब्बा रोग (Bacterial Spot)';
    if (possibleIssue.includes('Deficiency')) return 'पोषक तत्वों की कमी (Nutrient Deficiency)';
    if (possibleIssue.includes('Inconclusive')) return 'अस्पष्ट फोटो / लक्षण स्पष्ट नहीं';
  } else if (lang === 'te') {
    if (possibleIssue.includes('Pineapple Heart Rot') || possibleIssue.includes('Phytophthora')) return 'అనాస కాండం కుళ్ళు తెగులు (Pineapple Heart Rot)';
    if (possibleIssue.includes('Panama') || possibleIssue.includes('Fusarium')) return 'పనామా తెగులు / ఫ్యూసేరియం వడలువు తెగులు (Panama Disease)';
    if (possibleIssue.includes('Healthy')) return 'ఆరోగ్యకరమైన పంట (Healthy Crop)';
    if (possibleIssue.includes('Early Blight')) return 'ముందస్తు ఆకుమచ్చ తెగులు (Early Blight)';
    if (possibleIssue.includes('Late Blight')) return 'లేట్ బ్లైట్ తెగులు (Late Blight)';
    if (possibleIssue.includes('Yellow Mosaic')) return 'పసుపు మోజాయిక్ తెగులు (Yellow Mosaic)';
    if (possibleIssue.includes('Powdery Mildew')) return 'బూడిద తెగులు (Powdery Mildew)';
    if (possibleIssue.includes('Rust')) return 'తుప్పు తెగులు (Common Rust)';
    if (possibleIssue.includes('Brown Spot')) return 'వరి గోధుమ మచ్చ తెగులు (Brown Spot)';
    if (possibleIssue.includes('Pest')) return 'పురుగుల తాకిడి (Pest Infestation)';
    if (possibleIssue.includes('Bacterial')) return 'బ్యాక్టీరియల్ మచ్చ తెగులు (Bacterial Spot)';
    if (possibleIssue.includes('Deficiency')) return 'పోషకాల లోపం (Nutrient Deficiency)';
    if (possibleIssue.includes('Inconclusive')) return 'అస్పష్టమైన ఫోటో / వివరాలు చాలవు';
  }
  return possibleIssue;
}

export function getLocalizedCrop(crop, lang) {
  if (!crop) return '';
  const c = crop.toUpperCase();
  if (lang === 'te') {
    if (c.includes('PINEAPPLE')) return 'అనాస (Pineapple)';
    if (c.includes('BANANA')) return 'అరటి (Banana)';
    if (c.includes('TOMATO')) return 'టమోటా (Tomato)';
    if (c.includes('RICE') || c.includes('PADDY')) return 'వరి (Rice)';
    if (c.includes('MAIZE') || c.includes('CORN')) return 'మొక్కజొన్న (Maize)';
    if (c.includes('CHILLI') || c.includes('PEPPER')) return 'మిరప (Chilli)';
    if (c.includes('COTTON')) return 'పత్తి (Cotton)';
    if (c.includes('CITRUS') || c.includes('LEMON')) return 'నిమ్మ (Citrus)';
    if (c.includes('MANGO')) return 'మామిడి (Mango)';
    if (c.includes('PAPAYA')) return 'బొప్పాయి (Papaya)';
  } else if (lang === 'hi') {
    if (c.includes('PINEAPPLE')) return 'अनन्नास (Pineapple)';
    if (c.includes('BANANA')) return 'केला (Banana)';
    if (c.includes('TOMATO')) return 'टमाटर (Tomato)';
    if (c.includes('RICE') || c.includes('PADDY')) return 'धान / चावल (Rice)';
    if (c.includes('MAIZE') || c.includes('CORN')) return 'मक्का (Maize)';
    if (c.includes('CHILLI') || c.includes('PEPPER')) return 'मिर्च (Chilli)';
    if (c.includes('COTTON')) return 'कपास (Cotton)';
    if (c.includes('CITRUS') || c.includes('LEMON')) return 'नींबू (Citrus)';
  }
  return crop;
}

export function getLocalizedSeverity(severity, lang) {
  if (!severity) return '';
  const s = severity.toLowerCase();
  if (lang === 'te') {
    if (s.includes('high')) return 'తీవ్రమైనది (High)';
    if (s.includes('moderate')) return 'సాధారణం (Moderate)';
    if (s.includes('low')) return 'తక్కువ (Low)';
  } else if (lang === 'hi') {
    if (s.includes('high')) return 'उच्च (High)';
    if (s.includes('moderate')) return 'मध्यम (Moderate)';
    if (s.includes('low')) return 'कम (Low)';
  }
  return severity;
}

export function getLocalizedRiskLevel(level, lang) {
  if (!level) return '⚪ INCONCLUSIVE';
  const l = level.toLowerCase();
  if (lang === 'te') {
    if (l === 'high') return '🔴 గరిష్ట ప్రమాద హెచ్చరిక (High Risk)';
    if (l === 'moderate') return '🟡 సాధారణ ప్రమాదం (Moderate Risk)';
    if (l === 'low') return '🟢 తక్కువ ప్రమాదం (Low Concern)';
  } else if (lang === 'hi') {
    if (l === 'high') return '🔴 उच्च जोखिम (High Risk)';
    if (l === 'moderate') return '🟡 मध्यम जोखिम (Moderate Risk)';
    if (l === 'low') return '🟢 कम जोखिम (Low Concern)';
  }
  if (l === 'high') return '🔴 HIGH PRIORITY RISK';
  if (l === 'moderate') return '🟡 MODERATE RISK';
  if (l === 'low') return '🟢 LOW CONCERN';
  return '⚪ INCONCLUSIVE';
}

export function getLocalizedText(str, lang) {
  if (!str) return '';
  if (lang === 'te') {
    // Weather timing & general advisories
    if (str.includes('Current weather conditions are stable') || str.includes('stable for scheduled field')) return 'ప్రస్తుత వాతావరణ పరిస్థితులు పొలంలో పనుల నిర్వహణకు అనుకూలంగా ఉన్నాయి.';
    if (str.includes('RAIN ADVISORY') || str.includes('Rain expected')) return '⚠️ వర్షం హెచ్చరిక: తదుపరి వర్షం ప్రారంభమయ్యే ముందు మందుల పిచికారీ చేయవద్దు.';

    // Pineapple & Banana Specific Symptoms
    if (str.includes('Dark brown, water-soaked rot at the base of central leaves') || str.includes('water-soaked rot at the base')) return 'మధ్య ఆకుల మొదలు వద్ద నల్లటి గోధుమ రంగు నీటి కుళ్ళు మచ్చలు.';
    if (str.includes('Necrosis and rotting of the central whorl') || str.includes('rotting of the central whorl')) return 'నడిమి తొడిమ (అనాస గుండె భాగం) నల్లబడి కుళ్ళిపోవడం.';
    if (str.includes('Yellowing and wilting of surrounding leaves')) return 'చుట్టూ ఉన్న ఆకులు పసుపు రంగులోకి మారి వడలిపోవడం.';
    if (str.includes('Basal decay of inner leaves')) return 'లోపలి ఆకుల మొదళ్ల వద్ద క్రమంగా కుళ్ళిపోవడం.';
    if (str.includes('Bright yellowing starting from') || str.includes('leaf margins and progressing')) return 'ఆకుల అంచుల నుండి పసుపు రంగు ప్రారంభమై లోపలికి వ్యాపించడం.';
    if (str.includes('Necrosis and drying of the leaf edges') || str.includes('Necrosis and drying')) return 'ఆకుల అంచులు ఎండిపోవడం మరియు గోధుమ రంగులోకి మారడం.';
    if (str.includes('Pronounced tearing and wilting') || str.includes('tearing and wilting')) return 'ఆకు రేకులు చిరిగిపోవడం మరియు మొక్క వడలిపోవడం.';
    if (str.includes('Buckling of the leaf petiole') || str.includes('hang downwards')) return 'ఆకు కాడలు వంగిపోయి ఆకులు క్రిందికి వేలాడటం.';
    if (str.includes('Observed visual symptoms:')) return str.replace('Observed visual symptoms:', 'గమనించిన దృశ్య లక్షణాలు:');
    if (str.includes('lesions on leaflets')) return 'ఆకులపై పెద్ద గోధుమ లేదా నల్లటి నీటి మచ్చలు గుర్తించబడ్డాయి.';
    if (str.includes('necrotic areas on leaf margins')) return 'ఆకుల అంచులలో నల్లటి ఎండిపోయిన రంగు మచ్చలు కనబడుతున్నాయి.';
    if (str.includes('fungal-like growth')) return 'మచ్చల అంచుల వద్ద తెల్లటి బూజు లాంటి శిలీంధ్రాల పెరుగుదల ఉంది.';
    if (str.includes('Leaf curling')) return 'తెగులు సోకిన భాగాలలో ఆకులు ముడుచుకుపోవడం.';

    // Risk Assessment Summary & Bullets
    if (str.includes('ELEVATED RISK') || str.includes('transmission concern')) return 'వాతావరణ ప్రమాద హెచ్చరిక: పొలంలో తేమ మరియు వాతావరణం వలన తెగులు వేగంగా వ్యాపించే అవకాశం ఉంది. తగిన జాగ్రత్తలు తీసుకోండి.';
    if (str.includes('Rainfall anticipated within') || str.includes('increase canopy moisture')) return 'తదుపరి వర్షం వలన పంట పైరులో తేమ పెరిగి తెగులు వ్యాప్తి ఎక్కువయ్యే ప్రమాదం ఉంది.';
    if (str.includes('Humidity creates optimal')) return 'అధిక తేమ వల్ల శిలీంధ్రాలు మరియు తెగుళ్లు వేగంగా వ్యాపించే అవకాశం ఉంది.';
    if (str.includes('Rainfall within')) return 'తదుపరి వర్షం వల్ల తెగులు మచ్చలు ఇతర మొక్కలకు వ్యాపించవచ్చు.';

    // Recommendations (Do now)
    if (str.includes('Prune') || str.includes('leaves showing')) return 'వ్యాధి సోకిన మచ్చలున్న ఆకులను కత్తిరించి పొలం బయట పారవేయండి.';
    if (str.includes('Inspect neighboring')) return 'చుట్టుపక్కల 5 మీటర్ల పరిధిలోని పంట మొక్కలను పరిశీలించండి.';
    if (str.includes('Maintain standard')) return 'సాధారణ నీటిపారుదల మరియు ఎరువుల నిర్వహణను యధావిధిగా కొనసాగించండి.';
    if (str.includes('Continue routine scout')) return 'వారానికి రెండు సార్లు పంట స్థితిని నిశితంగా పరిశీలించండి.';

    // Recommendations (Avoid)
    if (str.includes('overhead sprinkler') || str.includes('irrigation')) return 'ఆకులు తడిగా ఉన్నప్పుడు పైన చిలకరించే నీటిపారుదల (స్ప్రింక్లర్లు) వాడవద్దు.';
    if (str.includes('Avoid working in wet field rows') || str.includes('mechanical vectoring')) return 'తెగుళ్లు ఒక చెట్టు నుండి మరొక దానికి వ్యాపించకుండా ఆకులు తడిగా ఉన్నప్పుడు పొలంలో పనులు చేయవద్దు.';
    if (str.includes('unverified chemical mixtures') || str.includes('confirming local label')) return 'స్థానిక వ్యవసాయాధికారి ధృవీకరించని రసాయన మిశ్రమాలను పంటపై పిచికారీ చేయవద్దు.';

    // Reassess & Expert Help
    if (str.includes('Recheck marked monitoring plants') || str.includes('Re-check marked') || str.includes('symptom progression')) return 'తెగులు తీవ్రతను అంచనా వేయడానికి 24 నుండి 48 గంటల్లో గుర్తించిన మొక్కలను మళ్లీ తనిఖీ చేయండి.';
    if (str.includes('Seek guidance from your local agricultural officer') || str.includes('Consult local extension') || str.includes('>15% of plants') || str.includes('severity escalates rapidly')) return 'తెగులు 15% కంటే ఎక్కువ మొక్కలకు వ్యాపిస్తే వెంటనే స్థానిక వ్యవసాయాధికారిని (AAO) సంప్రదించండి.';

    // Reasoning & Explanation
    if (str.includes('AI visual model diagnosed')) return 'AI నమూనా ద్వారా తెగులు గుర్తింపు మరియు వాతావరణ విశ్లేషణ పూర్తి చేయబడింది.';
    if (str.includes('Concentric brown')) return 'ఆకులపై గుండ్రటి గోధుమ రంగు మచ్చలు మరియు పసుపు రంగు వలయాలు కనబడుతున్నాయి.';
    if (str.includes('Temp') && str.includes('Humidity')) return 'వాతావరణం: ఉష్ణోగ్రత మరియు తేమ శాతాలు తెగులు వ్యాప్తికి అనుకూలంగా ఉన్నాయి.';
    if (str.includes('Visual pathology confirms')) return 'ఆకు పరిశీలన మరియు వాతావరణం ఆధారంగా ఈ తెగులును ధృవీకరించడమైనది.';
    if (str.includes('Recommended immediate sanitation')) return 'వర్షం ప్రారంభమయ్యే ముందు తక్షణ పారిశుధ్య చర్యలు చేపట్టాలని సూచించడమైనది.';
  } else if (lang === 'hi') {
    if (str.includes('Current weather conditions are stable')) return 'वर्तमान मौसम की स्थिति खेत प्रबंधन कार्यों के लिए अनुकूल है।';
    if (str.includes('RAIN ADVISORY') || str.includes('Rain expected')) return '⚠️ बारिश की चेतावनी: बारिश से ठीक पहले रासायनिक छिड़काव से बचें।';
    if (str.includes('Dark brown, water-soaked rot')) return 'पत्तियों के निचले हिस्से पर भूरे पानी भरे धब्बे और सड़न।';
    if (str.includes('Necrosis and rotting')) return 'पौधे के मध्य भाग का सड़ना और सूखना।';
    if (str.includes('Yellowing and wilting')) return 'आस-पास की पत्तियों का पीला पड़ना और मुरझाना।';
    if (str.includes('Prune') || str.includes('leaves showing')) return 'रोगग्रस्त पत्तियों को काटकर खेत से दूर नष्ट कर दें।';
    if (str.includes('Inspect neighboring')) return 'आस-पास के 5 मीटर के दायरे में पौधों की जांच करें।';
    if (str.includes('overhead sprinkler') || str.includes('irrigation')) return 'पत्तियां गीली होने पर ऊपर से फव्वारा सिंचाई न करें।';
    if (str.includes('Avoid working in wet field rows')) return 'गीले खेत की पंक्तियों में काम करने से बचें ताकि बीमारी न फैले।';
    if (str.includes('unverified chemical mixtures')) return 'बिना पुष्टि के अनधिकृत रसायनों के मिश्रण का प्रयोग न करें।';
    if (str.includes('Recheck marked monitoring plants') || str.includes('Re-check marked')) return '24-48 घंटों में चिन्हित पौधों की पुनः जांच करें।';
    if (str.includes('Seek guidance from your local agricultural officer') || str.includes('Consult local extension')) return 'लक्षण 15% से अधिक पौधों में फैलने पर कृषि विशेषज्ञ की सलाह लें।';
  }
  return str;
}
