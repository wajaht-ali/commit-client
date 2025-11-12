/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const featuresList = [
    {
        id: '01',
        name: 'Real-Time Collaborative Editor',
        description: 'Write and edit code together in a shared environment. See changes from your teammates instantly, without any delay.'
    },
    {
        id: '02',
        name: 'Integrated Audio Communication',
        description: 'Communicate with your team directly within the editor. Discuss ideas and solve problems without switching applications.'
    },
    {
        id: '03',
        name: 'Multi-Language Support',
        description: 'From Python to JavaScript, our editor supports a wide range of popular programming languages with syntax highlighting.'
    },
    {
        id: '04',
        name: 'Code Snippet Sharing',
        description: 'Quickly save and share reusable blocks of code with your team. Boost productivity by building on previous work.'
    },
    {
        id: '05',
        name: 'Secure & Private Sessions',
        description: 'Your coding sessions are end-to-end encrypted and accessible only to invited members, ensuring your work remains confidential.'
    },
    // {
    //     id: '06',
    //     name: 'Version Control Integration ', 
    //     description: 'Easily connect with your GitHub repositories. Commit your collaborative work directly from the editor to your project.'
    // }
];

const FeaturesPage = () => {
    const textVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const gridContainerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariant = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    };

    return (
        <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen p-4 sm:p-6 lg:p-8 overflow-hidden">
            <div className="max-w-6xl mx-auto">

                <motion.section
                    className="text-center pt-8 my-12 md:my-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={textVariant}
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Powerful Features, Built for Collaboration
                    </h1>
                    <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                        Code Commit is equipped with a suite of tools designed to make remote development seamless and efficient. Explore the core functionalities that empower you and your team to build amazing software together.
                    </p>
                </motion.section>

                <section className="my-12 md:my-16">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={gridContainerVariant}
                    >

                        {featuresList.map((feature) => (
                            <motion.div
                                key={feature.id}
                                className="bg-[#161b22] border border-[#30363d] rounded-lg p-6"
                                variants={cardVariant}
                                whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
                            >
                                <span className="block text-3xl font-extrabold text-blue-500 mb-4">
                                    {feature.id}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {feature.name}
                                </h3>
                                <p className="text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}

                    </motion.div>
                </section>

            </div>
        </div>
    );
};

export default FeaturesPage;