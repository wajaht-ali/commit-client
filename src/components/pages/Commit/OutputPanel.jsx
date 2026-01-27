import { useState } from 'react';
import { FaTerminal, FaBug, FaRobot, FaCopy, FaExpand } from 'react-icons/fa';
import toast from 'react-hot-toast';

const OutputPanel = ({ output }) => {
    const [activeTab, setActiveTab] = useState('output');

    const handleCopyOutput = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            toast.success('Output copied to clipboard!');
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'output':
                return (
                    <div className="flex-1 flex flex-col">
                        <pre
                            className="flex-1 text-sm whitespace-pre-wrap overflow-y-auto font-mono p-2 editor-scrollbar"
                            style={{ backgroundColor: '#000000' }}
                        >
                            {output ? (
                                <span style={{ color: '#10b981' }}>{output}</span>
                            ) : (
                                <>
                                    <span style={{ color: '#6e7681' }}>No output available.</span>
                                </>
                            )}
                        </pre>
                    </div>
                );
            case 'console':
                return (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <FaBug size={32} style={{ color: '#3d4452' }} className="mx-auto mb-3" />
                            <p style={{ color: '#8b949e' }} className="text-sm">Debug console coming soon...</p>
                            <p style={{ color: '#6e7681' }} className="text-xs mt-1">Track errors, warnings, and logs</p>
                        </div>
                    </div>
                );
            case 'ai':
                return (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <FaRobot size={32} style={{ color: '#3d4452' }} className="mx-auto mb-3" />
                            <p style={{ color: '#8b949e' }} className="text-sm">AI Assistant coming soon...</p>
                            <p style={{ color: '#6e7681' }} className="text-xs mt-1">Get instant help and suggestions</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const TabButton = ({ name, label, icon: Icon }) => {
        const isActive = activeTab === name;

        return (
            <button
                onClick={() => setActiveTab(name)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative cursor-pointer"
                style={{
                    color: isActive ? '#e6edf3' : '#6e7681',
                    backgroundColor: isActive ? '#000000' : 'transparent'
                }}
                onMouseEnter={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.color = '#8b949e';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.color = '#6e7681';
                    }
                }}
            >
                {isActive && (
                    <span
                        className="absolute top-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: '#3b82f6' }}
                    />
                )}
                <Icon size={14} />
                {label}
            </button>
        );
    };

    return (
        <div
            className="flex flex-col h-full overflow-hidden"
            style={{ backgroundColor: '#0f1419' }}
        >
            <div
                className="flex items-center"
                style={{ borderBottom: '1px solid #1e2530' }}
            >
                <TabButton name="output" label="Output" icon={FaTerminal} />
                <TabButton name="console" label="Debug Console" icon={FaBug} />
                <TabButton name="ai" label="AI Assistant" icon={FaRobot} />
            </div>

            {renderContent()}
        </div>
    );
};

export default OutputPanel;