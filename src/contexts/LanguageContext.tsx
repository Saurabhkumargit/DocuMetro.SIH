import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.chatbot': 'Chatbot',
    'nav.database': 'Database',
    'nav.about': 'About',
    'nav.language': 'English',
    'nav.profile': 'Profile',
    'nav.history': 'History',
    
    // Home Page
    'home.title': 'KMRL Document Management System',
    'home.subtitle': 'Streamline your document workflow with our intelligent management system',
    'home.upload.title': 'Upload Document',
    'home.upload.description': 'Upload and organize your documents',
    'home.documents.title': 'My Documents',
    'home.documents.description': 'View and manage uploaded files',
    'home.dashboard.title': 'Dashboard',
    'home.dashboard.description': 'Access system overview',
    'home.chatbot.title': 'AI Assistant',
    'home.chatbot.description': 'Get instant help with document queries',
    
    // Upload Page
    'upload.title': 'Upload Document',
    'upload.subtitle': 'Add new documents to the system',
    'upload.form.title': 'Document Title',
    'upload.form.description': 'Description',
    'upload.form.section': 'Section',
    'upload.form.date': 'Date',
    'upload.form.language': 'Language',
    'upload.form.submit': 'Upload Document',
    'upload.form.file': 'Choose File',
    'upload.form.drop': 'Drop files here or click to browse',
    
    // Chatbot Page
    'chatbot.title': 'KMRL Document Assistant',
    'chatbot.subtitle': 'Ask questions about your documents and get instant answers with citations',
    'chatbot.placeholder': 'Ask about documents, policies, procedures...',
    'chatbot.welcome': 'Hello! I\'m your KMRL document assistant. I can help you find information from uploaded documents, search the database, and answer questions about KMRL policies and procedures. What would you like to know?',
    'chatbot.sources': 'Sources:',
    'chatbot.voice.start': 'Start voice input',
    'chatbot.voice.stop': 'Stop voice input',
    'chatbot.voice.listening': 'Listening...',
    
    // Database Page
    'database.title': 'Document Database',
    'database.subtitle': 'Browse and search all documents',
    'database.search': 'Search documents...',
    'database.filter.all': 'All Documents',
    'database.filter.pdf': 'PDF Files',
    'database.filter.image': 'Images',
    'database.sort.date': 'Sort by Date',
    'database.sort.name': 'Sort by Name',
    'database.sort.type': 'Sort by Type',
    
    // Profile Page
    'profile.title': 'Profile',
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.designation': 'Designation',
    'profile.station': 'Station',
    'profile.logout': 'Logout',
    'profile.documents': 'My Documents',
    
    // History Page
    'history.title': 'Activity History',
    'history.subtitle': 'Track your recent activities',
    'history.upload': 'Document uploaded',
    'history.delete': 'Document deleted',
    'history.search': 'Database search',
    'history.chat': 'Chatbot conversation',
    
    // About Page
    'about.title': 'About DocuMetro',
    'about.subtitle': 'Smart India Hackathon 2025 Solution',
    'about.problem': 'Problem Statement',
    'about.solution': 'Our Solution',
    'about.features': 'Key Features',
    
    // Footer
    'footer.copyright': '© 2024 DocuMetro - KMRL. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    
    // Privacy Policy
    'privacy.title': 'Privacy Policy – DocuMetro',
    'privacy.data.title': 'Data Collection',
    'privacy.data.content': 'We only collect documents, user credentials (Name, Email, Designation, Station), and chatbot queries to improve the system.',
    'privacy.usage.title': 'Data Usage',
    'privacy.usage.content': 'Uploaded documents are used strictly for internal operations of Kochi Metro Rail Limited (KMRL). The AI chatbot only references these documents and does not use external data.',
    'privacy.sharing.title': 'Data Sharing',
    'privacy.sharing.content': 'No data is shared with third parties; it remains within the KMRL system.',
    'privacy.security.title': 'Security',
    'privacy.security.content': 'All data is stored securely with encryption and role-based access to prevent unauthorized usage.',
    'privacy.reason.title': 'Reason for Privacy Policy',
    'privacy.reason.content': 'Since this project is built for Smart India Hackathon 2025 and directly handles sensitive government documents, privacy is critical to ensure compliance, data confidentiality, and trust in the solution.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.download': 'Download',
    'common.search': 'Search',
    
    // Authentication
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.designation': 'Designation',
    'auth.station': 'Station',
    'auth.signin': 'Sign In',
    'auth.welcome': 'Welcome back',
    'auth.credentials': 'Enter your credentials to access your account',
    'auth.noaccount': 'Don\'t have an account?',
    'auth.signup.here': 'Sign up here',
  },
  ml: {
    // Navbar
    'nav.home': 'ഹോം',
    'nav.chatbot': 'ചാറ്റ്ബോട്ട്',
    'nav.database': 'ഡാറ്റാബേസ്',
    'nav.about': 'വിശേഷങ്ങൾ',
    'nav.language': 'മലയാളം',
    'nav.profile': 'പ്രൊഫൈൽ',
    'nav.history': 'ചരിത്രം',
    
    // Home Page
    'home.title': 'കെഎംആർഎൽ ഡോക്യുമെന്റ് മാനേജ്മെന്റ് സിസ്റ്റം',
    'home.subtitle': 'ഞങ്ങളുടെ ബുദ്ധിമാനായ മാനേജ്മെന്റ് സിസ്റ്റം ഉപയോഗിച്ച് നിങ്ങളുടെ ഡോക്യുമെന്റ് വർക്ക്ഫ്ലോ കാര്യക്ഷമമാക്കുക',
    'home.upload.title': 'ഡോക്യുമെന്റ് അപ്‌ലോഡ് ചെയ്യുക',
    'home.upload.description': 'നിങ്ങളുടെ ഡോക്യുമെന്റുകൾ അപ്‌ലോഡ് ചെയ്ത് ക്രമീകരിക്കുക',
    'home.documents.title': 'എന്റെ ഡോക്യുമെന്റുകൾ',
    'home.documents.description': 'അപ്‌ലോഡ് ചെയ്ത ഫയലുകൾ കാണുകയും മാനേജ് ചെയ്യുകയും ചെയ്യുക',
    'home.dashboard.title': 'ഡാഷ്ബോർഡ്',
    'home.dashboard.description': 'സിസ്റ്റം ഓവർവ്യൂ ആക്സസ് ചെയ്യുക',
    'home.chatbot.title': 'AI അസിസ്റ്റന്റ്',
    'home.chatbot.description': 'ഡോക്യുമെന്റ് ചോദ്യങ്ങൾക്ക് തൽക്ഷണ സഹായം ലഭിക്കുക',
    
    // Upload Page
    'upload.title': 'ഡോക്യുമെന്റ് അപ്‌ലോഡ് ചെയ്യുക',
    'upload.subtitle': 'സിസ്റ്റത്തിലേക്ക് പുതിയ ഡോക്യുമെന്റുകൾ ചേർക്കുക',
    'upload.form.title': 'ഡോക്യുമെന്റ് ടൈറ്റിൽ',
    'upload.form.description': 'വിവരണം',
    'upload.form.section': 'വിഭാഗം',
    'upload.form.date': 'തീയതി',
    'upload.form.language': 'ഭാഷ',
    'upload.form.submit': 'ഡോക്യുമെന്റ് അപ്‌ലോഡ് ചെയ്യുക',
    'upload.form.file': 'ഫയൽ തിരഞ്ഞെടുക്കുക',
    'upload.form.drop': 'ഫയലുകൾ ഇവിടെ ഡ്രോപ്പ് ചെയ്യുക അല്ലെങ്കിൽ ബ്രൗസ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക',
    
    // Chatbot Page
    'chatbot.title': 'കെഎംആർഎൽ ഡോക്യുമെന്റ് അസിസ്റ്റന്റ്',
    'chatbot.subtitle': 'നിങ്ങളുടെ ഡോക്യുമെന്റുകളെക്കുറിച്ച് ചോദ്യങ്ങൾ ചോദിക്കുകയും ഉദ്ധരണികൾക്കൊപ്പം തൽക്ഷണ ഉത്തരങ്ങൾ നേടുകയും ചെയ്യുക',
    'chatbot.placeholder': 'ഡോക്യുമെന്റുകൾ, നയങ്ങൾ, നടപടിക്രമങ്ങൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...',
    'chatbot.welcome': 'ഹലോ! ഞാൻ നിങ്ങളുടെ കെഎംആർഎൽ ഡോക്യുമെന്റ് അസിസ്റ്റന്റാണ്. അപ്‌ലോഡ് ചെയ്ത ഡോക്യുമെന്റുകളിൽ നിന്ന് വിവരങ്ങൾ കണ്ടെത്താനും ഡാറ്റാബേസ് തിരയാനും കെഎംആർഎൽ നയങ്ങളെയും നടപടിക്രമങ്ങളെയും കുറിച്ചുള്ള ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകാനും എനിക്ക് കഴിയും. നിങ്ങൾ എന്തറിയാൻ ആഗ്രഹിക്കുന്നു?',
    'chatbot.sources': 'ഉറവിടങ്ങൾ:',
    'chatbot.voice.start': 'വോയ്സ് ഇൻപുട്ട് ആരംഭിക്കുക',
    'chatbot.voice.stop': 'വോയ്സ് ഇൻപുട്ട് നിർത്തുക',
    'chatbot.voice.listening': 'കേൾക്കുന്നു...',
    
    // Database Page
    'database.title': 'ഡോക്യുമെന്റ് ഡാറ്റാബേസ്',
    'database.subtitle': 'എല്ലാ ഡോക്യുമെന്റുകളും ബ്രൗസ് ചെയ്യുകയും തിരയുകയും ചെയ്യുക',
    'database.search': 'ഡോക്യുമെന്റുകൾ തിരയുക...',
    'database.filter.all': 'എല്ലാ ഡോക്യുമെന്റുകളും',
    'database.filter.pdf': 'PDF ഫയലുകൾ',
    'database.filter.image': 'ചിത്രങ്ങൾ',
    'database.sort.date': 'തീയതി അനുസരിച്ച് അടുക്കുക',
    'database.sort.name': 'പേര് അനുസരിച്ച് അടുക്കുക',
    'database.sort.type': 'തരം അനുസരിച്ച് അടുക്കുക',
    
    // Profile Page
    'profile.title': 'പ്രൊഫൈൽ',
    'profile.name': 'പേര്',
    'profile.email': 'ഇമെയിൽ',
    'profile.designation': 'പദവി',
    'profile.station': 'സ്റ്റേഷൻ',
    'profile.logout': 'ലോഗ്ഔട്ട്',
    'profile.documents': 'എന്റെ ഡോക്യുമെന്റുകൾ',
    
    // History Page
    'history.title': 'പ്രവർത്തന ചരിത്രം',
    'history.subtitle': 'നിങ്ങളുടെ സമീപകാല പ്രവർത്തനങ്ങൾ ട്രാക്ക് ചെയ്യുക',
    'history.upload': 'ഡോക്യുമെന്റ് അപ്‌ലോഡ് ചെയ്തു',
    'history.delete': 'ഡോക്യുമെന്റ് ഇല്ലാതാക്കി',
    'history.search': 'ഡാറ്റാബേസ് തിരച്ചിൽ',
    'history.chat': 'ചാറ്റ്ബോട്ട് സംഭാഷണം',
    
    // About Page
    'about.title': 'ഡോക്യുമെട്രോയെക്കുറിച്ച്',
    'about.subtitle': 'സ്മാർട്ട് ഇന്ത്യ ഹാക്കത്തൺ 2025 പരിഹാരം',
    'about.problem': 'പ്രശ്ന പ്രസ്താവന',
    'about.solution': 'ഞങ്ങളുടെ പരിഹാരം',
    'about.features': 'പ്രധാന സവിശേഷതകൾ',
    
    // Footer
    'footer.copyright': '© 2024 ഡോക്യുമെട്രോ - കെഎംആർഎൽ. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',
    'footer.privacy': 'സ്വകാര്യതാ നയം',
    
    // Privacy Policy
    'privacy.title': 'സ്വകാര്യതാ നയം – ഡോക്യുമെട്രോ',
    'privacy.data.title': 'ഡാറ്റ ശേഖരണം',
    'privacy.data.content': 'സിസ്റ്റം മെച്ചപ്പെടുത്താൻ ഞങ്ങൾ ഡോക്യുമെന്റുകൾ, ഉപയോക്തൃ ക്രെഡൻഷ്യലുകൾ (പേര്, ഇമെയിൽ, പദവി, സ്റ്റേഷൻ), ചാറ്റ്ബോട്ട് ചോദ്യങ്ങൾ എന്നിവ മാത്രം ശേഖരിക്കുന്നു.',
    'privacy.usage.title': 'ഡാറ്റ ഉപയോഗം',
    'privacy.usage.content': 'അപ്‌ലോഡ് ചെയ്ത ഡോക്യുമെന്റുകൾ കൊച്ചി മെട്രോ റെയിൽ ലിമിറ്റഡിന്റെ (കെഎംആർഎൽ) ആന്തരിക പ്രവർത്തനങ്ങൾക്കായി മാത്രമാണ് ഉപയോഗിക്കുന്നത്. AI ചാറ്റ്ബോട്ട് ഈ ഡോക്യുമെന്റുകളെ മാത്രം പരാമർശിക്കുകയും ബാഹ്യ ഡാറ്റ ഉപയോഗിക്കാതിരിക്കുകയും ചെയ്യുന്നു.',
    'privacy.sharing.title': 'ഡാറ്റ പങ്കിടൽ',
    'privacy.sharing.content': 'മൂന്നാം കക്ഷികളുമായി ഡാറ്റ പങ്കിടാറില്ല; അത് കെഎംആർഎൽ സിസ്റ്റത്തിനുള്ളിൽ തന്നെ തുടരുന്നു.',
    'privacy.security.title': 'സുരക്ഷ',
    'privacy.security.content': 'അനധികൃത ഉപയോഗം തടയാൻ എൻക്രിപ്ഷനും റോൾ-ബേസ്ഡ് ആക്സസുമുള്ള എല്ലാ ഡാറ്റയും സുരക്ഷിതമായി സംഭരിക്കുന്നു.',
    'privacy.reason.title': 'സ്വകാര്യതാ നയത്തിന്റെ കാരണം',
    'privacy.reason.content': 'ഈ പ്രോജക്റ്റ് സ്മാർട്ട് ഇന്ത്യ ഹാക്കത്തൺ 2025-നായി നിർമ്മിച്ചതും സെൻസിറ്റീവ് സർക്കാർ ഡോക്യുമെന്റുകൾ നേരിട്ട് കൈകാര്യം ചെയ്യുന്നതും ആയതിനാൽ, കംപ്ലയൻസ്, ഡാറ്റ രഹസ്യം, പരിഹാരത്തിലുള്ള വിശ്വാസം എന്നിവ ഉറപ്പാക്കാൻ സ്വകാര്യത നിർണായകമാണ്.',
    
    // Common
    'common.loading': 'ലോഡിംഗ്...',
    'common.error': 'പിശക് സംഭവിച്ചു',
    'common.success': 'വിജയം',
    'common.cancel': 'റദ്ദാക്കുക',
    'common.save': 'സേവ് ചെയ്യുക',
    'common.delete': 'ഇല്ലാതാക്കുക',
    'common.edit': 'എഡിറ്റ് ചെയ്യുക',
    'common.view': 'കാണുക',
    'common.download': 'ഡൗൺലോഡ് ചെയ്യുക',
    'common.search': 'തിരയുക',
    
    // Authentication
    'auth.login': 'ലോഗിൻ',
    'auth.signup': 'സൈൻ അപ്പ്',
    'auth.email': 'ഇമെയിൽ',
    'auth.password': 'പാസ്വേഡ്',
    'auth.name': 'പേര്',
    'auth.designation': 'പദവി',
    'auth.station': 'സ്റ്റേഷൻ',
    'auth.signin': 'സൈൻ ഇൻ',
    'auth.welcome': 'വീണ്ടും സ്വാഗതം',
    'auth.credentials': 'നിങ്ങളുടെ അക്കൗണ്ട് ആക്സസ് ചെയ്യാൻ നിങ്ങളുടെ ക്രെഡൻഷ്യലുകൾ നൽകുക',
    'auth.noaccount': 'അക്കൗണ്ട് ഇല്ലേ?',
    'auth.signup.here': 'ഇവിടെ സൈൻ അപ്പ് ചെയ്യുക',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};