import axios from 'axios';

const BASE_URI = import.meta.env.VITE_API_URL;

export const executeCode = async (language, code, setOutput) => {
    setOutput('Executing...');

    if (language === 'javascript') {
        try {
            let consoleOutput = '';
            const originalConsoleLog = console.log;
            console.log = (...args) => {
                consoleOutput += args.map(String).join(' ') + '\n';
            };
            new Function(code)();
            console.log = originalConsoleLog;
            setOutput(consoleOutput || 'Execution finished with no output.');
        } catch (err) {
            setOutput(
                err instanceof Error
                    ? `Error: ${err.message}`
                    : 'An unknown error occurred.'
            );
        }
        return;
    }

    if (language === 'python' || language === 'cpp') {
        try {
            const response = await axios.post(
                `${BASE_URI}/api/v1/code/execute`,
                { language, code }
            );
            setOutput(response.data.output || 'Execution finished with no output.');
        } catch (error) {
            if (error.response?.data?.output) {
                setOutput(`Error: ${error.response.data.output}`);
            } else {
                setOutput(
                    'Failed to connect to the execution service. Please check the server.'
                );
            }
        }
        return;
    }

    setOutput(`Execution for language "${language}" is not supported.`);
};
