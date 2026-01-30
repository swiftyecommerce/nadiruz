"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Plus, Trash2, Edit2, Check, X, Loader2, GripVertical } from "lucide-react";

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    isPrimary: boolean;
    order: number;
}

interface SocialLinksManagerProps {
    initialData: SocialLink[];
}

export function SocialLinksManager({ initialData }: SocialLinksManagerProps) {
    const [links, setLinks] = useState<SocialLink[]>(initialData);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState<Partial<SocialLink>>({ platform: "", url: "", isPrimary: false, order: 0 });
    const [isLoading, setIsLoading] = useState(false);

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
                if (!updatedLink || !updatedLink.id) {
                    console.error("Invalid response from server:", updatedLink);
                    return;
                }

                if (id) {
                    setLinks(links.map(l => l.id === id ? updatedLink : l));
                    setIsEditing(null);
                } else {
                    setLinks([...links, updatedLink]);
                    setIsAdding(false);
                }
                setFormData({ platform: "", url: "", isPrimary: false, order: 0 });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this link?")) return;
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

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center px-2">
                <h3 className="text-xl font-oswald font-bold uppercase tracking-widest text-gray-400">Social Inventory</h3>
                <Button size="sm" onClick={() => { setIsAdding(true); setFormData({ platform: "", url: "", isPrimary: false, order: links.length }); }}>
                    <Plus className="h-4 w-4 mr-2" /> Add Link
                </Button>
            </div>

            <div className="space-y-4">
                {isAdding && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-black rounded-2xl border border-[#39ff14]/30 animate-in fade-in zoom-in duration-300">
                        <input
                            placeholder="Platform (e.g. Spotify)"
                            className="bg-[#111111] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#39ff14]"
                            value={formData.platform}
                            onChange={e => setFormData({ ...formData, platform: e.target.value })}
                        />
                        <input
                            placeholder="URL"
                            className="bg-[#111111] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#39ff14] md:col-span-2"
                            value={formData.url}
                            onChange={e => setFormData({ ...formData, url: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <Button className="flex-1" onClick={() => handleSave()} disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                            <Button variant="outline" className="flex-1" onClick={() => setIsAdding(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                <div className="divide-y divide-white/5">
                    {links.filter(link => link && link.id).sort((a, b) => (a.order || 0) - (b.order || 0)).map((link) => (
                        <div key={link.id} className="group py-4 flex flex-wrap items-center justify-between gap-4 px-2 hover:bg-white/5 rounded-xl px-4 transition-colors">
                            {isEditing === link.id ? (
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                                    <input
                                        className="bg-black border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#39ff14]"
                                        value={formData.platform}
                                        onChange={e => setFormData({ ...formData, platform: e.target.value })}
                                    />
                                    <input
                                        className="bg-black border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#39ff14] md:col-span-2"
                                        value={formData.url}
                                        onChange={e => setFormData({ ...formData, url: e.target.value })}
                                    />
                                    <div className="flex gap-2">
                                        <Button className="flex-1" size="sm" onClick={() => handleSave(link.id)} disabled={isLoading}>
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsEditing(null)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-6">
                                        <GripVertical className="h-5 w-5 text-gray-700 cursor-grab" />
                                        <div>
                                            <h4 className="font-oswald font-bold text-lg text-white group-hover:text-[#39ff14] transition-colors">
                                                {link.platform}
                                            </h4>
                                            <p className="text-xs text-gray-500 font-medium truncate max-w-[200px] md:max-w-md">{link.url}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                            onClick={() => { setIsEditing(link.id); setFormData(link); }}
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
                                </>
                            )}
                        </div>
                    ))}
                    {links.length === 0 && !isAdding && (
                        <p className="py-12 text-center text-gray-500 italic">No social links added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
