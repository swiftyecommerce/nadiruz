"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { Button } from "@/components/Button";
import {
    Plus,
    Trash2,
    Edit2,
    Check,
    X,
    Loader2,
    Star,
    Music,
    Image as ImageIcon,
    Link as LinkIcon
} from "lucide-react";

interface Release {
    id: string;
    title: string;
    releaseType: string;
    coverImageUrl: string;
    description: string | null;
    releaseDate: Date | string;
    spotifyUrl: string | null;
    appleMusicUrl: string | null;
    youtubeMusicUrl: string | null;
    deezerUrl: string | null;
    isFeatured: boolean;
}

interface ReleasesManagerProps {
    initialData: Release[];
}

export function ReleasesManager({ initialData }: ReleasesManagerProps) {
    const [releases, setReleases] = useState<Release[]>(initialData);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const emptyForm: Partial<Release> = {
        title: "",
        releaseType: "Single",
        coverImageUrl: "",
        description: "",
        releaseDate: new Date().toISOString().split('T')[0],
        spotifyUrl: "",
        appleMusicUrl: "",
        youtubeMusicUrl: "",
        deezerUrl: "",
        isFeatured: false,
    };

    const [formData, setFormData] = useState<Partial<Release>>(emptyForm);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Clean payload to ensure only valid fields are sent
            const payload = {
                id: editingId || undefined,
                title: formData.title,
                releaseType: formData.releaseType,
                coverImageUrl: formData.coverImageUrl,
                description: formData.description,
                releaseDate: formData.releaseDate,
                spotifyUrl: formData.spotifyUrl,
                appleMusicUrl: formData.appleMusicUrl,
                youtubeMusicUrl: formData.youtubeMusicUrl,
                deezerUrl: formData.deezerUrl,
                isFeatured: formData.isFeatured,
            };

            const res = await fetchWithTimeout("/api/admin/releases", {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert(`Hata: ${errorData.message || "Kaydetme işlemi başarısız oldu."}`);
                return;
            }

            if (res.ok) {
                const savedRelease = await res.json();
                if (savedRelease.isFeatured) {
                    // Unset featured for others if this one is featured
                    setReleases(releases.map(r => ({
                        ...r,
                        isFeatured: r.id === savedRelease.id ? true : false
                    })));
                }

                if (editingId) {
                    setReleases(prev => prev.map(r => r.id === editingId ? savedRelease : r));
                } else {
                    setReleases(prev => [savedRelease, ...prev]);
                }

                setIsFormOpen(false);
                setEditingId(null);
                setFormData(emptyForm);
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "Bağlantı hatası";
            alert(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu yayını silmek istediğinize emin misiniz?")) return;
        setIsLoading(true);
        try {
            const res = await fetchWithTimeout(`/api/admin/releases?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setReleases(releases.filter(r => r.id !== id));
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "Bağlantı hatası";
            alert(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h3 className="text-xl font-oswald font-bold uppercase tracking-widest text-gray-400">Diskografi</h3>
                <Button className="w-full md:w-auto" onClick={() => { setIsFormOpen(true); setEditingId(null); setFormData(emptyForm); }}>
                    <Plus className="h-4 w-4 mr-2" /> Yeni Yayın
                </Button>
            </div>

            {isFormOpen && (
                <div className="bg-black border border-[#39ff14]/30 p-4 md:p-8 rounded-3xl animate-in fade-in zoom-in duration-300">
                    <form onSubmit={handleSave} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left Column: Basic Info */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Yayın Başlığı</label>
                                    <input
                                        required
                                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Tür</label>
                                        <select
                                            className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none"
                                            value={formData.releaseType}
                                            onChange={e => setFormData({ ...formData, releaseType: e.target.value })}
                                        >
                                            <option value="Single">Single</option>
                                            <option value="EP">EP</option>
                                            <option value="Album">Album</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Yayın Tarihi</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none"
                                            value={typeof formData.releaseDate === 'string' ? formData.releaseDate : new Date(formData.releaseDate!).toISOString().split('T')[0]}
                                            onChange={e => setFormData({ ...formData, releaseDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Kapak Görseli URL</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="w-full bg-[#111111] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#39ff14] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#39ff14] file:text-black hover:file:bg-[#39ff14]/90"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setIsLoading(true);
                                                    const formData = new FormData();
                                                    formData.append("file", file);
                                                    try {
                                                        const res = await fetch("/api/upload", {
                                                            method: "POST",
                                                            body: formData,
                                                        });
                                                        if (res.ok) {
                                                            const data = await res.json();
                                                            setFormData(prev => ({ ...prev, coverImageUrl: data.url }));
                                                        }
                                                    } catch (err) {
                                                        console.error("Upload failed", err);
                                                    } finally {
                                                        setIsLoading(false);
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                    {formData.coverImageUrl && (
                                        <div className="mt-2 relative w-full h-32 bg-black rounded-xl overflow-hidden border border-white/10">
                                            <img src={formData.coverImageUrl} alt="Kapak önizleme" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => setFormData(prev => ({ ...prev, coverImageUrl: "" }))}
                                                className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                    <input
                                        type="checkbox"
                                        id="isFeatured"
                                        className="w-5 h-5 rounded border-white/10 bg-black text-[#39ff14] focus:ring-[#39ff14]"
                                        checked={formData.isFeatured}
                                        onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    />
                                    <label htmlFor="isFeatured" className="font-oswald uppercase text-sm tracking-widest cursor-pointer">
                                        SON YAYIN OLARAK ÖNE ÇIKAR
                                    </label>
                                </div>
                            </div>

                            {/* Right Column: Streaming Links */}
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Dijital Platform Linkleri</label>
                                    {[
                                        { label: "Spotify", key: "spotifyUrl" },
                                        { label: "Apple Music", key: "appleMusicUrl" },
                                        { label: "YouTube Music", key: "youtubeMusicUrl" },
                                        { label: "Deezer", key: "deezerUrl" }
                                    ].map(platform => (
                                        <div key={platform.key} className="relative">
                                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                                            <input
                                                placeholder={`${platform.label} URL`}
                                                className="w-full bg-[#111111] border border-white/10 rounded-xl pl-12 pr-4 py-2 text-sm text-white focus:border-[#39ff14] outline-none"
                                                value={(formData as any)[platform.key] || ""}
                                                onChange={e => setFormData({ ...formData, [platform.key]: e.target.value })}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Açıklama</label>
                                    <textarea
                                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none min-h-[100px]"
                                        value={formData.description || ""}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-4 border-t border-white/5">
                            <Button variant="outline" className="w-full md:w-auto" onClick={() => setIsFormOpen(false)}>İptal</Button>
                            <Button type="submit" disabled={isLoading} className="w-full md:w-auto min-w-[150px]">
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (editingId ? "YAYINI GÜNCELLE" : "YAYIN OLUŞTUR")}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Grid of Releases */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {releases.map((release) => (
                    <div key={release.id} className="group bg-black rounded-3xl border border-white/5 overflow-hidden hover:border-[#39ff14]/30 transition-all flex flex-col">
                        <div className="relative aspect-square">
                            <img src={release.coverImageUrl} className="w-full h-full object-cover" alt={release.title} />
                            {release.isFeatured && (
                                <div className="absolute top-4 left-4 bg-[#39ff14] text-black p-2 rounded-full shadow-lg">
                                    <Star className="h-4 w-4 fill-current" />
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                                <p className="text-[#39ff14] font-oswald text-xs uppercase tracking-widest">{release.releaseType}</p>
                                <h4 className="text-xl font-oswald font-bold truncate">{release.title}</h4>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                            <p className="text-xs text-gray-500 font-oswald uppercase tracking-widest">
                                Yayın Tarihi: {format(new Date(release.releaseDate), "dd MMM yyyy")}
                            </p>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => {
                                        setEditingId(release.id);
                                        setFormData(release);
                                        setIsFormOpen(true);
                                    }}
                                >
                                    <Edit2 className="h-4 w-4 mr-2" /> Düzenle
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white"
                                    onClick={() => handleDelete(release.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
