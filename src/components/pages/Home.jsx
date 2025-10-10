import { useOutletContext } from 'react-router-dom';
import { FaCode, FaUsers, FaLaptopCode } from 'react-icons/fa';

const HomePage = () => {
    const { toggleModal } = useOutletContext();

    return (
        <>
            {/* Hero */}
            <header className="container mx-auto px-6 py-20 md:py-32 text-center md:text-left">
                <div className="md:flex md:items-center">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Code in Sync, <span className="text-green-400">Learn in Sync.</span>
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-gray-400">
                            Your collaborative coding environment for seamless peer programming.
                        </p>
                        <p className="mt-6 text-gray-500">
                            Peer programming is an agile software development technique where two programmers work together at one workstation.
                        </p>
                        <button
                            onClick={toggleModal}
                            className="mt-8 px-8 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300 hover:cursor-pointer"
                        >
                            Create or Join Room
                        </button>
                    </div>
                    <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                        <FaLaptopCode className="text-9xl md:text-[12rem] text-green-400 opacity-80" />
                    </div>
                </div>
            </header>

            {/* Features */}
            <section id="features" className="bg-gray-800 py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Commit?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-900 p-8 rounded-lg text-center">
                            <FaCode className="text-5xl text-green-400 mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2">Real-time Collaboration</h3>
                            <p className="text-gray-400">
                                Work with peers in a shared environment. See changes live and learn from each other's approaches.
                            </p>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-lg text-center">
                            <FaUsers className="text-5xl text-green-400 mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2">Enhanced Learning</h3>
                            <p className="text-gray-400">
                                Accelerate your learning by observing how others solve problems. Get instant feedback and share knowledge.
                            </p>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-lg text-center">
                            <FaLaptopCode className="text-5xl text-green-400 mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2">Efficient Problem Solving</h3>
                            <p className="text-gray-400">
                                Two heads are better than one. Tackle complex problems more effectively and produce higher quality code.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
                    <div className="text-center">
                        <div className="bg-gray-800 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-bold text-green-400">1</span>
                        </div>
                        <p>Create a new code room.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-800 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-bold text-green-400">2</span>
                        </div>
                        <p>Share the unique room ID with your peer.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-800 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-bold text-green-400">3</span>
                        </div>
                        <p>Start coding and collaborating in real-time!</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;