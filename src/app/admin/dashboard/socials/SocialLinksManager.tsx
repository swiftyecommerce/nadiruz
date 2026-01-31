"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import {
    Plus,
    Trash2,
    Edit2,
    Check,
    X,
    Loader2,
    GripVertical,
    Music,
    Youtube,
    Instagram,
    Disc,
    Globe,
    Music2,
    Cloud,
    Facebook,
    Twitter,
    Radio,
    Play,
    Mic2,
    Share2
} from "lucide-react";

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    iconType?: string | null;
    isPrimary: boolean;
    order: number;
}

const PREDEFINED_PLATFORMS = [
    { name: "Spotify", icon: "Spotify" },
    { name: "YouTube", icon: "YouTube" },
    { name: "Instagram", icon: "Instagram" },
    { name: "TikTok", icon: "TikTok" },
    { name: "Apple Music", icon: "Apple Music" },
    { name: "Deezer", icon: "Deezer" },
    { name: "Twitter", icon: "Twitter" },
    { name: "Facebook", icon: "Facebook" },
    { name: "Diğer", icon: "Globe" }
];

const ICON_OPTIONS = [
    { name: "Küresel", id: "Globe", icon: Globe },
    { name: "Müzik", id: "Music", icon: Music },
    { name: "Video", id: "YoutubeIcon", icon: Youtube },
    { name: "Fotoğraf", id: "InstagramIcon", icon: Instagram },
    { name: "Radyo", id: "Radio", icon: Radio },
    { name: "Oynat", id: "Play", icon: Play },
    { name: "Mikrofon", id: "Mic", icon: Mic2 },
    { name: "Plak", id: "Disc", icon: Disc },
    { name: "Paylaş", id: "Share", icon: Share2 },
];

interface SocialLinksManagerProps {
    initialData: SocialLink[];
}

export function SocialLinksManager({ initialData }: SocialLinksManagerProps) {
    const [links, setLinks] = useState<SocialLink[]>(initialData);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState<Partial<SocialLink>>({ platform: "", url: "", iconType: "", isPrimary: false, order: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [showCustomFields, setShowCustomFields] = useState(false);

    const handleSave = async (id?: string) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/socials", {
                method: id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(id ? { ...formData, id } : formData),
            });

            if (res.ok) {
                const updatedLink = await res.json();
                if (id) {
                    setLinks(links.map(l => l.id === id ? updatedLink : l));
                    setIsEditing(null);
                } else {
                    setLinks([...links, updatedLink]);
                    setIsAdding(false);
                }
                setFormData({ platform: "", url: "", iconType: "", isPrimary: false, order: 0 });
                setShowCustomFields(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu linki silmek istediğinize emin misiniz?")) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/socials?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setLinks(links.filter(l => l.id !== id));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlatformSelect = (platformName: string) => {
        if (platformName === "Diğer") {
            setShowCustomFields(true);
            setFormData({ ...formData, platform: "", iconType: "Globe" });
        } else {
            setShowCustomFields(false);
            setFormData({ ...formData, platform: platformName, iconType: platformName });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-2">
                <h3 className="text-xl font-oswald font-bold uppercase tracking-widest text-gray-400">Sosyal Medya Envanteri</h3>
                <Button size="sm" className="w-full md:w-auto" onClick={() => { setIsAdding(true); setFormData({ platform: "", url: "", iconType: "", isPrimary: false, order: links.length }); setShowCustomFields(false); }}>
                    <Plus className="h-4 w-4 mr-2" /> Link Ekle
                </Button>
            </div>

            <div className="space-y-4">
                {(isAdding || isEditing) && (
                    <div className="p-4 md:p-6 bg-[#0a0a0a] rounded-2xl border border-[#39ff14]/30 animate-in fade-in zoom-in duration-300 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-oswald uppercase text-gray-500 tracking-widest ml-1">Platform Seç</label>
                                <select
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:border-[#39ff14] outline-none"
                                    value={showCustomFields ? "Diğer" : formData.platform}
                                    onChange={(e) => handlePlatformSelect(e.target.value)}
                                >
                                    <option value="" disabled>Seçiniz...</option>
                                    {PREDEFINED_PLATFORMS.map(p => (
                                        <option key={p.name} value={p.name}>{p.name}</option>
                                    ))}
                                </select>
                            </div>

                            {showCustomFields && (
                                <div className="space-y-2 animate-in slide-in-from-top duration-300">
                                    <label className="text-xs font-oswald uppercase text-gray-500 tracking-widest ml-1">Özel Platform Adı</label>
                                    <input
                                        placeholder="Platform İsmi"
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:border-[#39ff14] outline-none"
                                        value={formData.platform}
                                        onChange={e => setFormData({ ...formData, platform: e.target.value })}
                                    />
                                </div>
                            )}

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-oswald uppercase text-gray-500 tracking-widest ml-1">Profil / Şarkı Linki</label>
                                <input
                                    placeholder="https://..."
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:border-[#39ff14] outline-none"
                                    value={formData.url}
                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                />
                            </div>

                            {showCustomFields && (
                                <div className="md:col-span-2 space-y-3">
                                    <label className="text-xs font-oswald uppercase text-gray-500 tracking-widest ml-1">Simge Seç</label>
                                    <div className="flex flex-wrap gap-3">
                                        {ICON_OPTIONS.map(opt => (
                                            <button
                                                key={opt.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, iconType: opt.id })}
                                                className={`p-3 rounded-xl border transition-all ${formData.iconType === opt.id ? 'border-[#39ff14] bg-[#39ff14]/10 text-[#39ff14]' : 'border-white/5 bg-white/5 text-gray-500 hover:border-white/20'}`}
                                                title={opt.name}
                                            >
                                                <opt.icon className="h-5 w-5" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4 border-t border-white/5">
                            <Button variant="outline" size="sm" className="w-full md:w-auto" onClick={() => { setIsAdding(false); setIsEditing(null); }}>
                                İptal
                            </Button>
                            <Button size="sm" className="w-full md:w-auto" onClick={() => handleSave(isEditing || undefined)} disabled={isLoading || !formData.platform || !formData.url}>
                                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <Check className="h-4 w-4 mr-2" />}
                                {isEditing ? "Güncelle" : "Kaydet"}
                            </Button>
                        </div>
                    </div>
                )}

                <div className="divide-y divide-white/5">
                    {links.filter(link => link && link.id).sort((a, b) => (a.order || 0) - (b.order || 0)).map((link) => (
                        <div key={link.id} className="group py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 md:px-4 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <GripVertical className="h-5 w-5 text-gray-700 cursor-grab flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-oswald font-bold text-lg text-white group-hover:text-[#39ff14] transition-colors truncate">
                                        {link.platform}
                                    </h4>
                                    <p className="text-xs text-gray-500 font-medium truncate block">{link.url}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <button
                                    className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                    onClick={() => {
                                        setIsEditing(link.id);
                                        setFormData(link);
                                        setShowCustomFields(!PREDEFINED_PLATFORMS.some(p => p.name === link.platform && p.name !== "Diğer"));
                                    }}
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                    onClick={() => handleDelete(link.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {links.length === 0 && !isAdding && (
                        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                            <Globe className="h-12 w-12 text-gray-800 mx-auto mb-4" />
                            <p className="text-gray-500 font-oswald uppercase tracking-widest">Henüz link eklenmemiş</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
