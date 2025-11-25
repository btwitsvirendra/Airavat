"use client";
import React, { useState, useEffect } from 'react';
import { ShieldCheck, CreditCard, Truck, AlertTriangle, CheckCircle, Lock, ArrowRight, Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TradeAssurancePage = () => {
    const [activeSection, setActiveSection] = useState('trade-assurance');

    const sections = [
        {
            id: 'trade-assurance',
            title: 'Trade Assurance',
            icon: <ShieldCheck className="w-5 h-5" />,
            content: (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Trade Assurance</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Trade Assurance is a free order protection service offered by Airavat. It&apos;s designed to create trust between buyers and suppliers and to protect your orders from payment to delivery.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'Payment Security', icon: <CreditCard className="w-8 h-8 text-[#3373FF]" />, desc: 'Your payment is held securely until you confirm satisfactory delivery.' },
                            { title: 'Extended Support', icon: <ShieldCheck className="w-8 h-8 text-[#3373FF]" />, desc: '30 days of protection after you receive your goods.' },
                            { title: 'Platform Support', icon: <AlertTriangle className="w-8 h-8 text-[#3373FF]" />, desc: 'Airavat mediates if any issues arise with your order.' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'order-protection',
            title: 'Order Protection',
            icon: <CreditCard className="w-5 h-5" />,
            content: (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Order Protection</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            From the moment you pay until 30 days after delivery, your order is protected. If the product quality or shipping date varies from what you and the supplier agreed to in the online order, we will help you reach a satisfactory outcome, including getting your money back.
                        </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Key Protections</h3>
                        <ul className="space-y-4">
                            {[
                                'Product quality does not meet the standards agreed in your contract.',
                                'Products are not shipped on time according to the contract.',
                                'Supplier fails to comply with other terms of the purchase agreement.'
                            ].map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-1 bg-blue-500 rounded-full p-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        },
        {
            id: 'dispute-resolution',
            title: 'Dispute Resolution',
            icon: <AlertTriangle className="w-5 h-5" />,
            content: (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Fair & Fast Dispute Resolution</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            In the unlikely event of an issue, Airavat provides a structured dispute resolution process. We encourage buyers and suppliers to negotiate directly first, but our team is ready to step in if an agreement cannot be reached.
                        </p>
                    </div>

                    <div className="relative mt-12">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 md:left-1/2 md:-ml-0.5"></div>
                        <div className="space-y-12">
                            {[
                                { step: 1, title: 'Apply for Refund', desc: 'Submit a refund application within 30 days of delivery if there are quality or shipping issues.' },
                                { step: 2, title: 'Negotiate with Supplier', desc: 'The supplier has 5 days to respond. Most issues are resolved at this stage through direct communication.' },
                                { step: 3, title: 'Airavat Intervention', desc: 'If no agreement is reached, escalate the dispute to us. Our trade experts will review evidence and make a binding decision.' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className={`relative flex items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="flex-1 md:w-1/2 p-4"></div>
                                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#3373FF] rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                                        <span className="text-white font-bold">{item.step}</span>
                                    </div>
                                    <div className={`flex-1 md:w-1/2 pl-20 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                            <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'verified-suppliers',
            title: 'Verified Suppliers',
            icon: <CheckCircle className="w-5 h-5" />,
            content: (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Verified Suppliers</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            &quot;Verified Supplier&quot; is a premium membership status for high-quality suppliers on Airavat. These suppliers have passed a rigorous on-site verification process conducted by third-party inspection companies.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm"
                        >
                            <h3 className="font-bold text-gray-900 mb-6 text-xl flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-[#3373FF]" /> What is Verified?
                            </h3>
                            <ul className="space-y-4">
                                {['Company profile & structure', 'Management & ownership', 'Production capabilities', 'Quality control processes'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3.5 h-3.5 text-green-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-br from-[#3373FF] to-[#2563EB] p-8 rounded-2xl text-white shadow-lg"
                        >
                            <h3 className="font-bold text-white mb-6 text-xl flex items-center gap-2">
                                <CheckCircle className="w-6 h-6 text-white" /> Benefits for Buyers
                            </h3>
                            <ul className="space-y-4">
                                {['Trustworthy partners', 'Accurate capability info', 'Reduced trading risk', 'Consistent quality'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-blue-50">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-6 border-t border-white/20">
                                <Link href="/suppliers?verified=true" className="inline-flex items-center gap-2 bg-white text-[#3373FF] px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                                    Browse Verified Suppliers <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )
        },
        {
            id: 'get-verified',
            title: 'Get Verified',
            icon: <Truck className="w-5 h-5" />,
            content: (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Verified</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            For suppliers, the Verified badge is a symbol of trust and capability. It signals to buyers worldwide that your business is legitimate, operational, and capable of meeting their needs.
                        </p>
                    </div>

                    <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
                        <h3 className="text-xl font-bold mb-8 relative z-10">Verification Process</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                            {[
                                { step: '01', title: 'Application' },
                                { step: '02', title: 'Doc Review' },
                                { step: '03', title: 'On-site Audit' },
                                { step: '04', title: 'Badge Awarded' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-center hover:bg-gray-750 transition-colors">
                                    <div className="text-2xl font-bold text-[#3373FF] mb-2">{item.step}</div>
                                    <div className="text-sm font-medium text-gray-300">{item.title}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center relative z-10">
                            <Link href="/supplier/verify" className="inline-flex items-center gap-2 text-[#3373FF] font-bold hover:text-blue-400 transition-colors">
                                Apply for Verification <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'security-center',
            title: 'Security Center',
            icon: <Lock className="w-5 h-5" />,
            content: (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Center</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We employ state-of-the-art security measures to protect your data and transactions. Our Security Center provides resources and tips to help you trade safely on Airavat.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="flex gap-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm"
                        >
                            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                                <Lock className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2">Data Encryption</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">All sensitive data is encrypted using industry-standard TLS protocols. We never store your full credit card details.</p>
                            </div>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="flex gap-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm"
                        >
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                                <ShieldCheck className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2">Account Protection</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">Two-factor authentication and suspicious activity monitoring keep your account safe from unauthorized access.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            let currentActive = '';
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentActive = section.id;
                        break;
                    }
                }
            }
            if (currentActive) setActiveSection(currentActive);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-[#000000] text-white py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-blue-900 opacity-50"></div>
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-[#F59E0B] p-3 rounded-xl">
                                <ShieldCheck className="w-10 h-10 text-black" />
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight">Trade Assurance</h1>
                        </div>
                        <p className="text-2xl text-gray-300 mb-10 leading-relaxed font-light">
                            Trade with confidence. We protect your orders from payment to delivery, ensuring a safe and reliable sourcing experience.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-[#F59E0B] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#D97706] transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                                Start Ordering Now <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
                                Watch Video
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-64 flex-shrink-0 hidden lg:block relative">
                        <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-fit">
                            <div className="p-4 bg-gray-50 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900 text-base">Table of Contents</h3>
                            </div>
                            <nav className="p-2 space-y-1">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${activeSection === section.id
                                                ? 'bg-[#3373FF] text-white shadow-md transform scale-105'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-[#3373FF]'
                                            }`}
                                    >
                                        <span className={activeSection === section.id ? 'text-white' : 'text-gray-400'}>
                                            {section.icon}
                                        </span>
                                        <span className="truncate">{section.title}</span>
                                        {activeSection === section.id && (
                                            <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
                                        )}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Articles */}
                    <div className="flex-1 space-y-24">
                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className="scroll-mt-32">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {section.content}
                                </motion.div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TradeAssurancePage;
