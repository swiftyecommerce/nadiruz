"use client";

import { useState } from "react";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { Button } from "@/components/Button";
import { Check, Loader2, Mail, Phone, Instagram } from "lucide-react";

interface ContactInfo {
    id: string;
    managementEmail: string;
    bookingEmail: string;
    pressEmail: string | null;
    whatsappNumber: string | null;
    instagramDmLink: string | null;
}

interface ContactManagerProps {
    initialData: ContactInfo;
}

export function ContactManager({ initialData }: ContactManagerProps) {
    const [formData, setFormData] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccess(false);

        try {
            const res = await fetchWithTimeout("/api/admin/contact", {
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
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-xl font-oswald font-bold uppercase tracking-widest text-[#39ff14] border-b border-white/5 pb-2">E-posta Kanalları</h3>

                    <div className="space-y-2">
                        <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Menajerlik E-postası</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input
                                type="email"
                                required
                                className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#39ff14] outline-none"
                                value={formData.managementEmail}
                                onChange={e => setFormData({ ...formData, managementEmail: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Booking E-postası</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input
                                type="email"
                                required
                                className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#39ff14] outline-none"
                                value={formData.bookingEmail}
                                onChange={e => setFormData({ ...formData, bookingEmail: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Basın E-postası (Opsiyonel)</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input
                                type="email"
                                className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#39ff14] outline-none"
                                value={formData.pressEmail || ""}
                                onChange={e => setFormData({ ...formData, pressEmail: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-oswald font-bold uppercase tracking-widest text-purple-500 border-b border-white/5 pb-2">Direkt Bağlantılar</h3>

                    <div className="space-y-2">
                        <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">WhatsApp Numarası</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input
                                placeholder="+90 5XX XXX XX XX"
                                className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#39ff14] outline-none"
                                value={formData.whatsappNumber || ""}
                                onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Instagram DM Linki</label>
                        <div className="relative">
                            <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input
                                placeholder="https://instagram.com/direct/t/..."
                                className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#39ff14] outline-none"
                                value={formData.instagramDmLink || ""}
                                onChange={e => setFormData({ ...formData, instagramDmLink: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                <Button
                    type="submit"
                    disabled={isSaving}
                    className="min-w-[200px]"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            GÜNCELLENİYOR...
                        </>
                    ) : (
                        "İLETİŞİM BİLGİLERİNİ GÜNCELLE"
                    )}
                </Button>

                {success && (
                    <div className="flex items-center gap-2 text-[#39ff14] font-oswald animate-in fade-in slide-in-from-left duration-500">
                        <Check className="h-5 w-5" />
                        İLETİŞİM BİLGİLERİ GÜNCELLENDİ
                    </div>
                )}
            </div>
        </form>
    );
}
