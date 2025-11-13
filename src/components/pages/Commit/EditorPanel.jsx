// src/components/editor/EditorPanel.jsx

import Editor from '@monaco-editor/react';
import { monacoLanguageMap } from '../../../utils/Utilities';

const EditorPanel = ({ language, code, handleEditorChange }) => {
    return (
        <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#30363d] h-full">
            <Editor
                height="100%"
                theme="vs-dark"
                language={monacoLanguageMap[language] || "javascript"}
                value={code}
                onChange={handleEditorChange}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default EditorPanel;