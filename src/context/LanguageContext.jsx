// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

export const translations = {
  en: {
    // Brand
    brandName: "KaamSetu",
    brandTagline: "Trusted Help • Safer Homes • Fairer Work",
    interactiveDemo: "Interactive Prototype • Verified Domestic Help",
    
    // Navigation
    navHome: "Home",
    navServices: "Services",
    navFindWorkers: "Find Workers",
    navHowItWorks: "How It Works",
    navTrustSafety: "Trust & Safety",
    navHelp: "Help",
    navLogin: "Log In",
    navSignup: "Sign Up",
    navDashboard: "Dashboard",
    navPostRequirement: "Post Job",
    navMyBookings: "My Bookings",
    navMessages: "Messages",
    navSafetyCheckin: "Safety Check-In",
    navTodaysJobs: "Today's Jobs",
    navVerification: "Verification",
    navEarnings: "Earnings",
    navSafetyAlerts: "Safety Alerts",
    navComplaints: "Complaints",
    navActivityLog: "Audit Log",
    
    // Role Switcher
    demoRole: "Demo Perspective",
    switchRole: "Switch Role",
    roleCustomer: "Customer (Rohit Mehta)",
    roleCustomerDesc: "Book help, post requirements, verify OTP",
    roleWorker: "Worker (Asha Sharma)",
    roleWorkerDesc: "Doorstep OTP, 'I'm Safe' check-in, earnings",
    roleAdmin: "Admin / Ops Lead",
    roleAdminDesc: "Review verifications, triage SOS alerts",
    roleGuest: "Public / Guest Mode",
    
    // Hero & Search
    heroBadge: "100% Transparent Trust • Safer for Homes & Workers",
    heroTitle: "Find Verified Maids, Cooks & Home Help.",
    heroTitleHighlight: "With Doorstep Safety & Fair Pay.",
    heroSubtitle: "Direct booking of pre-verified domestic professionals. Clear rates, arrival OTP confirmation, and dignity of work.",
    searchCategoryLabel: "Select Service",
    searchCategoryPlaceholder: "Choose a service (e.g. Maid, Cook)",
    searchLocalityLabel: "Locality / City",
    searchLocalityPlaceholder: "e.g. Noida, Indirapuram, Dadar, HSR",
    searchDateLabel: "Visit Date",
    searchBtn: "Search Available Workers",
    quickMaidPrompt: "Need a daily maid?",
    quickCookPrompt: "Looking for a home cook?",
    
    // Categories
    catMaid: "Maid / Housekeeper",
    catMaidDesc: "Daily Jhadu, Pocha, Bartan & Home Dusting",
    catCook: "Cook",
    catCookDesc: "Healthy Home-Style North & South Meals",
    catBabysitter: "Babysitter / Nanny",
    catBabysitterDesc: "Gentle Childcare & Infant Supervision",
    catElderlyCare: "Elderly Care",
    catElderlyCareDesc: "Compassionate Support & Health Companion",
    catPlumber: "Plumber",
    catPlumberDesc: "Taps, Pipe Leaks & Drainage Fittings",
    catElectrician: "Electrician",
    catElectricianDesc: "Wiring, Switchboards, Inverters & Lights",
    catCarpenter: "Carpenter",
    catCarpenterDesc: "Furniture Repair, Door Locks & Shelving",
    catGardener: "Gardener",
    catGardenerDesc: "Balcony Plants, Lawn Care & Soil Prep",
    catPainter: "Painter",
    catPainterDesc: "Wall Paint Touchups & Waterproofing",
    catAcTech: "AC Technician",
    catAcTechDesc: "Deep Jet Cleaning & Gas Refills",
    catDeepCleaning: "Deep Cleaning",
    catDeepCleaningDesc: "Kitchen Degreasing & Bathroom Descaling",
    catOther: "Other Services",
    catOtherDesc: "Appliances, Pest Control & Handyman",
    
    // Badges & Trust
    badgeIdChecked: "Govt ID Verified",
    badgeAddressChecked: "Address Checked",
    badgeWorkHistory: "Work History Available",
    badgeHighlyRated: "Highly Rated",
    badgeRepeatCustomers: "Repeat Clients",
    badgeAttendance: "Punctuality",
    badgeBgCheck: "Police Record Check",
    verifiedBadge: "Verified",
    pendingBadge: "Pending",
    explainTrust: "Why this badge?",
    
    // Actions & Common
    bookNow: "Book Worker",
    viewProfile: "View Profile",
    viewAll: "View All",
    rating: "Rating",
    jobsDone: "jobs completed",
    repeatCount: "repeat families",
    punctualityScore: "punctual",
    experienceYears: "yrs exp",
    perHour: "/ hr",
    doorstepOtpCode: "Doorstep OTP Code",
    imSafeHeartbeat: "I'm Safe (Check-in)",
    emergencySos: "Emergency Alert",
    activeBookings: "Active Visits",
    featuredWorkers: "Top Verified Workers",
    featuredWorkersSub: "Handpicked domestic professionals with stellar attendance and verified identities",
    whyKaamsetu: "Why KaamSetu is Different",
    why1Title: "Doorstep 4-Digit OTP",
    why1Desc: "Visits begin only when the worker enters the 4-digit OTP shown on the customer's phone.",
    why2Title: "Worker Safety Check-In",
    why2Desc: "Domestic workers log 'I'm Safe' pings and have direct emergency escalation to ops.",
    why3Title: "Zero Wage Deduction",
    why3Desc: "Workers take home 100% of their base wage with zero unfair commission cuts.",
    faqTitle: "Frequently Asked Questions",
    footerDignity: "Committed to fair treatment, safe working conditions, and dignity of labor.",
    footerCopyright: "© 2026 KaamSetu. Built for transparent, safe Indian households.",
    
    // Notifications & Status
    notificationsTitle: "Simulated Alerts",
    markAllRead: "Mark all as read",
    noNotifications: "No new notifications",
  },
  
  hi: {
    // Brand
    brandName: "कामसेतु",
    brandTagline: "विश्वसनीय सहायता • सुरक्षित घर • गरिमापूर्ण कार्य",
    interactiveDemo: "इंटरएक्टिव प्रोटोटाइप • सत्यापित घरेलू कामगार",
    
    // Navigation
    navHome: "होम",
    navServices: "सेवाएं",
    navFindWorkers: "सहायक खोजें",
    navHowItWorks: "यह कैसे काम करता है",
    navTrustSafety: "सुरक्षा एवं भरोसा",
    navHelp: "सहायता केंद्र",
    navLogin: "लॉग इन",
    navSignup: "साइन अप",
    navDashboard: "डैशबोर्ड",
    navPostRequirement: "काम पोस्ट करें",
    navMyBookings: "मेरी बुकिंग्स",
    navMessages: "संदेश",
    navSafetyCheckin: "सुरक्षा चेक-इन",
    navTodaysJobs: "आज के कार्य",
    navVerification: "सत्यापन हब",
    navEarnings: "मेरी कमाई",
    navSafetyAlerts: "सुरक्षा अलर्ट्स",
    navComplaints: "शिकायतें",
    navActivityLog: "ऑडिट लॉग",
    
    // Role Switcher
    demoRole: "डेमो दृष्टिकोण",
    switchRole: "भूमिका बदलें",
    roleCustomer: "ग्राहक (रोहित मेहता)",
    roleCustomerDesc: "काम ढूंढें, आवश्यकता पोस्ट करें, OTP जांचें",
    roleWorker: "श्रमिक (आशा शर्मा)",
    roleWorkerDesc: "दरवाजे पर OTP, 'मैं सुरक्षित हूँ' चेक-इन",
    roleAdmin: "व्यवस्थापक (ऑपरेशंस लीड)",
    roleAdminDesc: "सत्यापन स्वीकृत करें, आपातकालीन अलर्ट देखें",
    roleGuest: "पब्लिक / अतिथि मोड",
    
    // Hero & Search
    heroBadge: "100% पारदर्शी भरोसा • घरों और कामगारों दोनों के लिए सुरक्षित",
    heroTitle: "सत्यापित कामवाली बाई, रसोइया और घरेलू सहायक खोजें।",
    heroTitleHighlight: "दरवाजे पर सुरक्षा OTP और सम्मानजनक वेतन के साथ।",
    heroSubtitle: "पूर्व-सत्यापित घरेलू सहायकों की सीधी बुकिंग। स्पष्ट दरें, आगमन OTP और कार्य का सम्मान।",
    searchCategoryLabel: "सेवा चुनें",
    searchCategoryPlaceholder: "सेवा चुनें (जैसे: कामवाली बाई, रसोइया)",
    searchLocalityLabel: "इलाका / शहर",
    searchLocalityPlaceholder: "उदा. नोएडा, इंदिरापुरम, दादर, कोरमंगला",
    searchDateLabel: "तारीख चुनें",
    searchBtn: "उपलब्ध कामगार खोजें",
    quickMaidPrompt: "रोज़ाना कामवाली बाई चाहिए?",
    quickCookPrompt: "घर के खाने के लिए रसोइया चाहिए?",
    
    // Categories
    catMaid: "कामवाली बाई / हाउसकीपर",
    catMaidDesc: "दैनिक झाड़ू, पोछा, बर्तन और घर की सफाई",
    catCook: "रसोइया (कुक)",
    catCookDesc: "शुद्ध, स्वादिष्ट घरेलू भोजन (सुबह व शाम)",
    catBabysitter: "बेबीसिटर / आया",
    catBabysitterDesc: "बच्चों की प्रेमपूर्वक देखभाल और देखरेख",
    catElderlyCare: "बुजुर्गों की देखभाल",
    catElderlyCareDesc: "बुजुर्गों की सेवा, दवाइयों का ध्यान और साथी",
    catPlumber: "प्लंबर (नलसाज)",
    catPlumberDesc: "नल रिपेयर, पाइप लीकेज और बाथरूम फिटिंग",
    catElectrician: "इलेक्ट्रीशियन",
    catElectricianDesc: "वायरिंग, स्विचबोर्ड, इन्वर्टर और लाइट फिटिंग",
    catCarpenter: "बढ़ई (कारपेंटर)",
    catCarpenterDesc: "फर्नीचर रिपेयर, दरवाजों के लॉक और अलमारी",
    catGardener: "माली (गार्डनर)",
    catGardenerDesc: "बालकनी के पौधे, लॉन कटिंग व गमलों की देखभाल",
    catPainter: "पेंटर (रंगाई)",
    catPainterDesc: "दीवारों की पुट्टी, पेंट टचअप व वाटरप्रूफिंग",
    catAcTech: "एसी तकनीशियन",
    catAcTechDesc: "जेट पंप सर्विसिंग व गैस रीफिल",
    catDeepCleaning: "डीप क्लीनिंग",
    catDeepCleaningDesc: "रसोई की डीग्रीसिंग व बाथरूम की गहन सफाई",
    catOther: "अन्य घरेलू सेवाएं",
    catOtherDesc: "उपकरण मरम्मत, कीट नियंत्रण व हैंडीमैन",
    
    // Badges & Trust
    badgeIdChecked: "सरकारी पहचान सत्यापित",
    badgeAddressChecked: "पते का सत्यापन",
    badgeWorkHistory: "कार्य अनुभव उपलब्ध",
    badgeHighlyRated: "उत्कृष्ट रेटिंग",
    badgeRepeatCustomers: "नियमित ग्राहक",
    badgeAttendance: "समय की पाबंदी",
    badgeBgCheck: "पुलिस रिकॉर्ड जांच",
    verifiedBadge: "सत्यापित",
    pendingBadge: "प्रक्रिया में",
    explainTrust: "इस बैज का क्या अर्थ है?",
    
    // Actions & Common
    bookNow: "बुक करें",
    viewProfile: "प्रोफ़ाइल देखें",
    viewAll: "सभी देखें",
    rating: "रेटिंग",
    jobsDone: "काम पूरे किए",
    repeatCount: "नियमित परिवार",
    punctualityScore: "समयबद्धता",
    experienceYears: "वर्ष का अनुभव",
    perHour: "/ घंटा",
    doorstepOtpCode: "दरवाजे का सुरक्षा OTP",
    imSafeHeartbeat: "मैं सुरक्षित हूँ (चेक-इन)",
    emergencySos: "आपातकालीन सहायता",
    activeBookings: "सक्रिय सेवाएं",
    featuredWorkers: "शीर्ष सत्यापित कामगार",
    featuredWorkersSub: "100% पहचान सत्यापित और समयबद्ध घरेलू सहायक",
    whyKaamsetu: "कामसेतु क्यों अलग है?",
    why1Title: "दरवाजे पर 4-अंकों का OTP",
    why1Desc: "काम तभी शुरू होता है जब सहायक ग्राहक के फोन पर आया 4-अंकीय सुरक्षा कोड दर्ज करता है।",
    why2Title: "कामगार सुरक्षा चेक-इन",
    why2Desc: "कामगार 'मैं सुरक्षित हूँ' चेक-इन भेज सकते हैं और संकट में तुरंत सहायता प्राप्त कर सकते हैं।",
    why3Title: "0% वेतन कटौती",
    why3Desc: "कामगारों को उनके मेहनताने का 100% पूरा भुगतान बिना किसी अनुचित कमीशन के मिलता है।",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    footerDignity: "उचित व्यवहार, सुरक्षित कार्य वातावरण और श्रम की गरिमा के प्रति समर्पित।",
    footerCopyright: "© 2026 कामसेतु। सुरक्षित और भरोसेमंद भारतीय घरों के लिए निर्मित।",
    
    // Notifications & Status
    notificationsTitle: "सिम्युलेटेड अलर्ट",
    markAllRead: "सभी पढ़े हुए चिह्नित करें",
    noNotifications: "कोई नई सूचना नहीं",
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("kaamsetu_lang") || "en";
  });

  useEffect(() => {
    localStorage.setItem("kaamsetu_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  };

  const t = (key) => {
    if (!translations[lang]) return translations.en[key] || key;
    return translations[lang][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
