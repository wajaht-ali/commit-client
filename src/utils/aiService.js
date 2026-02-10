import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URI = import.meta.env.VITE_API_URL;

export const generateCode = async (prompt, language, setGeneratedCode, setIsGenerating) => {
    setIsGenerating(true);
    setGeneratedCode('');
    try {
        const response = await axios.post(
            `${BASE_URI}/api/v1/ai/code-generation`,
            { prompt, language }
        );
        setGeneratedCode(response.data.generatedCode);
    } catch (error) {
        toast.error('Failed to generate code. Please try again.');
        console.error(error);
    } finally {
        setIsGenerating(false);
    }
};

export const insertGeneratedCode = (
    currentCode,
    generatedCode,
    language,
    socket,
    roomId,
    setLanguageCodeMap,
    setIsAiModalOpen,
    setAiPrompt,
    setGeneratedCode
) => {
    const newCode = currentCode + '\n\n' + generatedCode;
    setLanguageCodeMap(prev => ({
        ...prev,
        [language]: newCode,
    }));

    if (socket) {
        socket.emit('code-change', { roomId, code: newCode });
    }

    setIsAiModalOpen(false);
    setAiPrompt('');
    setGeneratedCode('');
};
