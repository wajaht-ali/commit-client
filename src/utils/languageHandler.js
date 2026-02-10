import toast from 'react-hot-toast';
import { defaultCodeTemplates, languageOptions } from './Utilities';

export const handleLanguageSwitch = (
    newLanguage,
    languageCodeMap,
    socket,
    roomId,
    setLanguage,
    setLanguageCodeMap
) => {
    setLanguage(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);

    const codeToUse =
        languageCodeMap[newLanguage] ||
        defaultCodeTemplates[newLanguage] ||
        '// Start coding here...';

    setLanguageCodeMap(prev => ({
        ...prev,
        [newLanguage]: codeToUse,
    }));

    socket.emit('language-change', { roomId, language: newLanguage });
    socket.emit('code-change', { roomId, code: codeToUse });
    toast.success(
        `Language switched to ${languageOptions.find(l => l.value === newLanguage)?.label ||
        'a new language'
        }`
    );
};
