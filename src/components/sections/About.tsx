interface AboutProps {
    profile: {
        longBio: string;
        location: string | null;
        genre?: string | null;
        activeSince?: string | null;
        profileImageUrl?: string | null;
        aboutTitle?: string | null;
        aboutHighlight?: string | null;
    };
}

export function About({ profile }: AboutProps) {
    return (
        <section className="py-24 bg-[#0d0d0d] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                        <h2 className="text-5xl font-oswald font-bold leading-none">
                            {profile.aboutTitle ? (
                                <>
                                    {profile.aboutTitle.replace(profile.aboutHighlight || "", "")}
                                    <span className="text-[#39ff14]">{profile.aboutHighlight}</span>
                                </>
                            ) : (
                                <>Sesteki <span className="text-[#39ff14]">Vizyon</span></>
                            )}
                        </h2>

                        <div className="space-y-6 text-xl text-gray-400 leading-relaxed font-light">
                            {profile.longBio.split('\n').map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                            <div>
                                <p className="text-[#39ff14] font-oswald text-sm uppercase tracking-widest mb-1">Lokasyon</p>
                                <p className="text-white font-oswald text-xl">{profile.location || "Türkiye"}</p>
                            </div>
                            <div>
                                <p className="text-[#39ff14] font-oswald text-sm uppercase tracking-widest mb-1">Tarz</p>
                                <p className="text-white font-oswald text-xl">{profile.genre || "Hip-Hop"}</p>
                            </div>
                            <div>
                                <p className="text-[#39ff14] font-oswald text-sm uppercase tracking-widest mb-1">Aktif</p>
                                <p className="text-white font-oswald text-xl">{profile.activeSince || "2018'den Beri"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative group animate-in fade-in slide-in-from-right duration-1000">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#39ff14]/20 to-[#9d00ff]/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative bg-[#111111] rounded-2xl border border-white/10 p-4 transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
                            <div className="aspect-[4/5] overflow-hidden rounded-xl">
                                <img
                                    src={profile.profileImageUrl || "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?auto=format&fit=crop&q=80&w=1000"}
                                    alt="Nadir UZ"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute bottom-12 -left-8 bg-black border border-[#39ff14]/30 p-6 rounded-xl shadow-2xl transform -rotate-6">
                                <p className="text-4xl font-oswald font-bold text-[#39ff14]">NADİR UZ</p>
                                <p className="text-gray-500 font-oswald text-sm tracking-widest">RESMİ SANATÇI</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
