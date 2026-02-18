import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TextEditorWindow({ file, onSave, onClose }) {
  const [content, setContent] = useState(file?.content || '');
  const [fileName, setFileName] = useState(file?.name || 'Untitled.txt');

  const handleSave = () => {
    onSave({ ...file, content, name: fileName });
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-white/10">
        <button
          onClick={handleSave}
          className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="flex-1 bg-[#2d2d2d] text-white text-sm px-3 py-1.5 rounded border border-white/10 focus:border-blue-500 focus:outline-none"
        />
      </div>
      
      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full bg-[#1e1e1e] text-white p-4 font-mono text-sm resize-none focus:outline-none"
        placeholder="Start typing..."
      />
    </div>
  );
}
