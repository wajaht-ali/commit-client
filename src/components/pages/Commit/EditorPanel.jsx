// src/components/editor/EditorPanel.jsx

import Editor from '@monaco-editor/react';
import { monacoLanguageMap } from '../../../utils/Utilities';

const EditorPanel = ({ language, code, handleEditorChange }) => {
    return (
        <div className="h-full overflow-hidden">
            <Editor
                height="100%"
                theme="hc-black"
                language={monacoLanguageMap[language] || "javascript"}
                value={code}
                onChange={handleEditorChange}
                options={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                    fontLigatures: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    smoothScrolling: true,
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    bracketPairColorization: { enabled: true },
                    renderLineHighlight: 'all',
                    // padding: { top: 16, bottom: 16 },
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderWhitespace: 'selection',
                    scrollbar: {
                        vertical: 'auto',
                        horizontal: 'auto',
                        useShadows: false,
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10,
                    }
                }}
            />
        </div>
    );
};

export default EditorPanel;