import React from 'react';
import Navbar from '../../../components/Navbar'; // Corrected import path
import Footer from '../../../components/Footer'; // Corrected import path

const ContactUs = ({ navigate }) => {
    return (
        <>
            <Navbar navigate={navigate} />
            <main className="pt-24">
                {/* Page Header Section */}
                <section className="py-16">
                    <div className="container mx-auto text-center px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Contact Us</h1>
                        <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto">We’d love to hear from you! Get in touch with our team for any inquiries.</p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="pb-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                            {/* Contact Form */}
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-teal-100">Full Name</label>
                                        <input type="text" id="name" name="name" required className="mt-1 block w-full bg-white/20 border border-white/30 rounded-lg shadow-sm px-4 py-2 text-white placeholder-teal-200 focus:ring-accent focus:border-accent" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-teal-100">Email Address</label>
                                        <input type="email" id="email" name="email" required className="mt-1 block w-full bg-white/20 border border-white/30 rounded-lg shadow-sm px-4 py-2 text-white placeholder-teal-200 focus:ring-accent focus:border-accent" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-teal-100">Message</label>
                                        <textarea id="message" name="message" rows="5" required className="mt-1 block w-full bg-white/20 border border-white/30 rounded-lg shadow-sm px-4 py-2 text-white placeholder-teal-200 focus:ring-accent focus:border-accent"></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full bg-accent text-white px-6 py-3 rounded-lg hover:opacity-90 font-semibold">Send Message</button>
                                    </div>
                                </form>
                            </div>

                            {/* Contact Info */}
                            <div className="lg:pl-8">
                                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <i className="ri-map-pin-2-line text-2xl text-accent mr-4 mt-1"></i>
                                        <div>
                                            <h4 className="font-semibold text-white">Address</h4>
                                            <p className="text-teal-200">Webapp Studio Sdn Bhd,<br />83, Jalan KH 5, Kita Harmoni,<br />Cybersouth, 47810 Dengkil,<br />Selangor Darul Ehsan, Malaysia</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <i className="ri-mail-send-line text-2xl text-accent mr-4 mt-1"></i>
                                        <div>
                                            <h4 className="font-semibold text-white">Email</h4>
                                            <a href="mailto:support@webappstudio.my" className="text-teal-200 hover:text-white">support@webappstudio.my</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <i className="ri-phone-line text-2xl text-accent mr-4 mt-1"></i>
                                        <div>
                                            <h4 className="font-semibold text-white">Phone</h4>
                                            <a href="tel:+60194892806" className="text-teal-200 hover:text-white">+60 19-489 2806</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer navigate={navigate} />
        </>
    );
};

export default ContactUs;
