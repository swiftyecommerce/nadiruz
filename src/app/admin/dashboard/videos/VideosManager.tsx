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
    Star,
    Youtube,
    Image as ImageIcon,
    Play
} from "lucide-react";

interface Video {
    id: string;
    title: string;
    youtubeUrl: string;
    thumbnailUrl: string;
    isFeatured: boolean;
}

interface VideosManagerProps {
    initialData: Video[];
}

export function VideosManager({ initialData }: VideosManagerProps) {
    const [videos, setVideos] = useState<Video[]>(initialData);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const emptyForm: Partial<Video> = {
        title: "",
        youtubeUrl: "",
        thumbnailUrl: "",
        isFeatured: false,
    };

    const [formData, setFormData] = useState<Partial<Video>>(emptyForm);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/videos", {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingId ? { ...formData, id: editingId } : formData),
            });

            if (res.ok) {
                const savedVideo = await res.json();
                if (savedVideo.isFeatured) {
                    setVideos(videos.map(v => ({
                        ...v,
                        isFeatured: v.id === savedVideo.id ? true : false
                    })));
                }

                if (editingId) {
                    setVideos(prev => prev.map(v => v.id === editingId ? savedVideo : v));
                } else {
                    setVideos(prev => [savedVideo, ...prev]);
                }

                setEditingId(null);
                setFormData(emptyForm);
            } else {
                alert("Failed to save video. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this video?")) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/videos?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setVideos(videos.filter(v => v.id !== id));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-oswald font-bold uppercase tracking-widest text-gray-400">Video Content</h3>
                <Button onClick={() => { setIsFormOpen(true); setEditingId(null); setFormData(emptyForm); }}>
                    <Plus className="h-4 w-4 mr-2" /> Add Video
                </Button>
            </div>

            {isFormOpen && (
                <div className="bg-black border border-[#39ff14]/30 p-8 rounded-3xl animate-in fade-in zoom-in duration-300">
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Video Title</label>
                                <input
                                    required
                                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none"
                                    value={formData.title || ""}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">YouTube URL</label>
                                <div className="relative">
                                    <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <input
                                        required
                                        placeholder="https://youtube.com/watch?v=..."
                                        className="w-full bg-[#111111] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#39ff14] outline-none"
                                        value={formData.youtubeUrl || ""}
                                        onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Thumbnail Image URL</label>
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
                                                        setFormData(prev => ({ ...prev, thumbnailUrl: data.url }));
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
                                {formData.thumbnailUrl && (
                                    <div className="mt-2 relative w-full h-32 bg-black rounded-xl overflow-hidden border border-white/10">
                                        <img src={formData.thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setFormData(prev => ({ ...prev, thumbnailUrl: "" }))}
                                            className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 mt-auto">
                                <input
                                    type="checkbox"
                                    id="videoFeatured"
                                    className="w-5 h-5 rounded border-white/10 bg-black text-[#39ff14] focus:ring-[#39ff14]"
                                    checked={formData.isFeatured}
                                    onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                                />
                                <label htmlFor="videoFeatured" className="font-oswald uppercase text-sm tracking-widest cursor-pointer">
                                    FEATURE ON HERO SECTION
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isLoading} className="min-w-[150px]">
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (editingId ? "UPDATE VIDEO" : "ADD VIDEO")}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <div key={video.id} className="group bg-black rounded-3xl border border-white/5 overflow-hidden hover:border-[#39ff14]/30 transition-all flex flex-col">
                        <div className="relative aspect-video">
                            <img src={video.thumbnailUrl} className="w-full h-full object-cover" alt={video.title} />
                            {video.isFeatured && (
                                <div className="absolute top-4 left-4 bg-[#39ff14] text-black p-2 rounded-full shadow-lg z-10">
                                    <Star className="h-4 w-4 fill-current" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Play className="h-6 w-6 text-white fill-current ml-1" />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                            <h4 className="text-xl font-oswald font-bold line-clamp-2">{video.title}</h4>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => {
                                        setEditingId(video.id);
                                        setFormData(video);
                                        setIsFormOpen(true);
                                    }}
                                >
                                    <Edit2 className="h-4 w-4 mr-2" /> Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white"
                                    onClick={() => handleDelete(video.id)}
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
