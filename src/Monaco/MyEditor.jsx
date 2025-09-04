import React from "react";
import Editor from "@monaco-editor/react";

export default function MyEditor() {
  return (
    <div className="h-screen w-full">
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// Start coding here..."
        theme="vs-dark"
        onChange={(value) => console.log("Code changed:", value)}
      />
      
     
    </div>
  );
}
