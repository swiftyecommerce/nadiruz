"use client";

import { useState, useEffect } from "react";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { Button } from "@/components/Button";
import { Check, Loader2 } from "lucide-react";

const defaultProfile = {
    id: "default_profile",
    stageName: "",
    realName: "",
    heroTagline: "",
    heroHighlight: "",
    shortBio: "",
    longBio: "",
    location: "",
    genre: "",
    activeSince: "",
    profileImageUrl: "",
    heroButtonText: "",
    heroButtonUrl: "",
    aboutTitle: "",
    aboutHighlight: "",
};

export function ProfileForm() {
    const [formData, setFormData] = useState(defaultProfile as any);
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchWithTimeout("/api/admin/profile")
            .then(res => res.json())
            .then(data => setFormData(data))
            .catch(() => alert("Profil verileri yüklenemedi."))
            .finally(() => setIsLoaded(true));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccess(false);

        try {
            const res = await fetchWithTimeout("/api/admin/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                alert("Kaydetme başarısız oldu. Lütfen tekrar deneyin.");
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "Bağlantı hatası";
            alert(msg);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Sahne Adı</label>
                    <input
                        type="text"
                        value={formData.stageName}
                        onChange={(e) => setFormData({ ...formData, stageName: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Gerçek Adı</label>
                    <input
                        type="text"
                        value={formData.realName || ""}
                        onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Hero Alt Başlık</label>
                    <input
                        type="text"
                        value={formData.heroTagline}
                        onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Hero Vurgusu (Rozet)</label>
                    <input
                        type="text"
                        value={formData.heroHighlight}
                        onChange={(e) => setFormData({ ...formData, heroHighlight: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Hero Buton Metni</label>
                    <input
                        type="text"
                        value={formData.heroButtonText || ""}
                        onChange={(e) => setFormData({ ...formData, heroButtonText: e.target.value })}
                        placeholder="Örn: Spotify'da Dinle"
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Hero Buton Linki</label>
                    <input
                        type="text"
                        value={formData.heroButtonUrl || ""}
                        onChange={(e) => setFormData({ ...formData, heroButtonUrl: e.target.value })}
                        placeholder="https://open.spotify.com/..."
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Kısa Biyografi</label>
                <textarea
                    value={formData.shortBio}
                    onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium min-h-[100px]"
                    required
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Hakkında Bölümü Başlığı</label>
                    <input
                        type="text"
                        value={formData.aboutTitle || ""}
                        onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
                        placeholder="Örn: Sesteki Vizyon"
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Hakkında Başlık Vurgusu (Renkli Kısım)</label>
                    <input
                        type="text"
                        value={formData.aboutHighlight || ""}
                        onChange={(e) => setFormData({ ...formData, aboutHighlight: e.target.value })}
                        placeholder="Örn: Vizyon"
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Sesteki Vizyon (Hakkında Bölümü İçeriği)</label>
                <textarea
                    value={formData.longBio}
                    onChange={(e) => setFormData({ ...formData, longBio: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium min-h-[200px]"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Konum / Şehir</label>
                <input
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Tarz / Genre</label>
                    <input
                        type="text"
                        value={formData.genre || ""}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        placeholder="Örn: Hip-Hop / Hikaye Anlatımı"
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Aktif Yıllar</label>
                    <input
                        type="text"
                        value={formData.activeSince || ""}
                        onChange={(e) => setFormData({ ...formData, activeSince: e.target.value })}
                        placeholder="Örn: 2018'den Beri"
                        className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#39ff14]/50 transition-all font-medium"
                    />
                </div>

                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Hakkında Görseli</label>
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#39ff14] file:text-black hover:file:bg-[#39ff14]/90"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setIsSaving(true);
                                    const formData = new FormData();
                                    formData.append("file", file);
                                    try {
                                        const res = await fetch("/api/upload", {
                                            method: "POST",
                                            body: formData,
                                        });
                                        if (res.ok) {
                                            const data = await res.json();
                                            setFormData((prev: any) => ({ ...prev, profileImageUrl: data.url }));
                                        }
                                    } catch (err) {
                                        console.error("Upload failed", err);
                                    } finally {
                                        setIsSaving(false);
                                    }
                                }
                            }}
                        />
                    </div>
                    {formData.profileImageUrl && (
                        <div className="mt-2 relative w-full h-64 bg-black rounded-xl overflow-hidden border border-white/10">
                            <img src={formData.profileImageUrl} alt="Profil Önizleme" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => setFormData((prev: any) => ({ ...prev, profileImageUrl: "" }))}
                                className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-6 pt-4">
                <Button
                    type="submit"
                    disabled={isSaving}
                    className="min-w-[200px]"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            KAYDEDİLİYOR...
                        </>
                    ) : (
                        "PROFİLİ KAYDET"
                    )}
                </Button>

                {success && (
                    <div className="flex items-center gap-2 text-[#39ff14] font-oswald animate-in fade-in slide-in-from-left duration-500">
                        <Check className="h-5 w-5" />
                        DEĞİŞİKLİKLER BAŞARIYLA KAYDEDİLDİ
                    </div>
                )}
            </div>
        </form>
    );
}
