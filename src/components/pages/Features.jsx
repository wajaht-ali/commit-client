/* eslint-disable no-unused-vars */
import React from 'react';
import { FaCode, FaMicrophone, FaLanguage, FaShareAlt, FaShieldAlt } from 'react-icons/fa';

const featuresList = [
    {
        id: '01',
        name: 'Real-Time Collaborative Editor',
        description: 'Write and edit code together in a shared environment. See changes from your teammates instantly, without any delay.',
        icon: <FaCode />
    },
    {
        id: '02',
        name: 'Integrated Audio Communication',
        description: 'Communicate with your team directly within the editor. Discuss ideas and solve problems without switching applications.',
        icon: <FaMicrophone />
    },
    {
        id: '03',
        name: 'Multi-Language Support',
        description: 'From Python to JavaScript, our editor supports a wide range of popular programming languages with syntax highlighting.',
        icon: <FaLanguage />
    },
    {
        id: '04',
        name: 'Code Snippet Sharing',
        description: 'Quickly save and share reusable blocks of code with your team. Boost productivity by building on previous work.',
        icon: <FaShareAlt />
    },
    {
        id: '05',
        name: 'Secure & Private Sessions',
        description: 'Your coding sessions are end-to-end encrypted and accessible only to invited members, ensuring your work remains confidential.',
        icon: <FaShieldAlt />
    }
];

const FeaturesPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <section className="text-center mb-20 fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-semibold mb-6">
                        Unlock Potential
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-50">
                        Powerful Features, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">Built for Collaboration</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Code Commit is equipped with a suite of tools designed to make remote development seamless and efficient.
                    </p>
                </section>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresList.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={`group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:bg-slate-800/60 hover:border-sky-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden fade-in-up`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Decorative Blur */}
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all duration-500"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-5xl font-extrabold text-slate-800 group-hover:text-slate-700 transition-colors duration-500 select-none">
                                        {feature.id}
                                    </span>
                                    <div className="h-12 w-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-sky-400 text-xl group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-lg">
                                        {feature.icon}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-sky-300 transition-colors">
                                    {feature.name}
                                </h3>
                                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FeaturesPage;