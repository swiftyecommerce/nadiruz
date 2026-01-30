import { Mail, MessageSquare, Phone } from "lucide-react";

interface ContactProps {
    contact: {
        managementEmail: string;
        bookingEmail: string;
        pressEmail: string | null;
        whatsappNumber: string | null;
        instagramDmLink: string | null;
    };
}

export function Contact({ contact }: ContactProps) {
    return (
        <section className="py-24 bg-[#0a0a0a]">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center space-y-16">
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter">
                            İletişime <span className="text-[#39ff14]">Geç</span>
                        </h2>
                        <p className="text-gray-400 text-xl font-light">
                            Profesyonel talepler, rezervasyonlar ve iş birlikleri için.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        <div className="p-10 bg-[#111111] rounded-3xl border border-white/5 space-y-6 hover:border-[#39ff14]/30 transition-all duration-300">
                            <div className="w-16 h-16 bg-[#39ff14]/10 rounded-2xl flex items-center justify-center mx-auto">
                                <Mail className="h-8 w-8 text-[#39ff14]" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-oswald text-2xl uppercase font-bold">Talepler</h3>
                                <div className="space-y-4 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Menajerlik</span>
                                        <a href={`mailto:${contact.managementEmail}`} className="text-[#39ff14] hover:text-white transition-colors text-lg">
                                            {contact.managementEmail}
                                        </a>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Rezervasyon</span>
                                        <a href={`mailto:${contact.bookingEmail}`} className="text-[#39ff14] hover:text-white transition-colors text-lg">
                                            {contact.bookingEmail}
                                        </a>
                                    </div>
                                    {contact.pressEmail && (
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Basın</span>
                                            <a href={`mailto:${contact.pressEmail}`} className="text-[#39ff14] hover:text-white transition-colors text-lg">
                                                {contact.pressEmail}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-10 bg-[#111111] rounded-3xl border border-white/5 space-y-6 hover:border-[#39ff14]/30 transition-all duration-300">
                            <div className="w-16 h-16 bg-[#39ff14]/10 rounded-2xl flex items-center justify-center mx-auto">
                                <MessageSquare className="h-8 w-8 text-[#39ff14]" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-oswald text-2xl uppercase font-bold">Doğrudan Kanallar</h3>
                                <div className="space-y-4 pt-4 flex flex-col items-center">
                                    {contact.whatsappNumber && (
                                        <a
                                            href={`https://wa.me/${contact.whatsappNumber.replace(/\s+/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-4 bg-[#25D366]/10 text-[#25D366] rounded-xl font-oswald font-bold uppercase tracking-wider border border-[#25D366]/20 hover:bg-[#25D366] hover:text-black transition-all"
                                        >
                                            <Phone className="inline-block mr-2 h-5 w-5" />
                                            WhatsApp
                                        </a>
                                    )}
                                    {contact.instagramDmLink && (
                                        <a
                                            href={contact.instagramDmLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-pink-400 rounded-xl font-oswald font-bold uppercase tracking-wider border border-pink-500/20 hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all"
                                        >
                                            <MessageSquare className="inline-block mr-2 h-5 w-5" />
                                            Instagram DM
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
