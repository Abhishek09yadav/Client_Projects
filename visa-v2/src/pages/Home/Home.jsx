import React from 'react';
import { FaArrowRight, FaGlobe, FaUsers, FaChartLine } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="lg:w-1/2 mb-12 lg:mb-0">
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Welcome to Teleport
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Your gateway to global mobility solutions
                            </p>
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
                                Get Started <FaArrowRight className="ml-2" />
                            </button>
                        </div>
                        <div className="lg:w-1/2">
                            <img
                                src="/api/placeholder/600/400"
                                alt="Home Intro"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Our Global Network</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { image: "/api/placeholder/300/200", title: "United States" },
                            { image: "/api/placeholder/300/200", title: "Vietnam" },
                            { image: "/api/placeholder/300/200", title: "Singapore" },
                            { image: "/api/placeholder/300/200", title: "UAE" },
                        ].map((location, index) => (
                            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src={location.image}
                                    alt={location.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{location.title}</h3>
                                    <button className="text-blue-600 flex items-center hover:text-blue-700">
                                        Learn more <FaArrowRight className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FaGlobe className="w-12 h-12" />,
                                title: "Global Mobility",
                                description: "Seamless relocation services across borders"
                            },
                            {
                                icon: <FaUsers className="w-12 h-12" />,
                                title: "Immigration Support",
                                description: "Expert guidance through immigration processes"
                            },
                            {
                                icon: <FaChartLine className="w-12 h-12" />,
                                title: "Business Solutions",
                                description: "Comprehensive business expansion services"
                            }
                        ].map((service, index) => (
                            <div key={index} className="text-center p-8 bg-white rounded-lg shadow-lg">
                                <div className="flex justify-center mb-6 text-blue-600">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Ready to Start Your Journey?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied clients who have successfully expanded their horizons with Teleport
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Contact Us Today
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <img
                            src="/api/placeholder/120/40"
                            alt="Teleport Logo"
                            className="h-10"
                        />
                        <div className="text-sm">
                            © 2025 Teleport. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;