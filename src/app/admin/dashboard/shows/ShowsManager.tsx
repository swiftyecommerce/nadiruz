"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/Button";
import {
    Plus,
    Trash2,
    Edit2,
    Check,
    X,
    Loader2,
    MapPin,
    Calendar as CalendarIcon,
    Ticket,
    AlertTriangle
} from "lucide-react";

interface Show {
    id: string;
    city: string;
    venue: string;
    date: Date | string;
    ticketUrl: string | null;
    note: string | null;
    isCancelled: boolean;
}

interface ShowsManagerProps {
    initialData: Show[];
}

export function ShowsManager({ initialData }: ShowsManagerProps) {
    const [shows, setShows] = useState<Show[]>(initialData);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const emptyForm: Partial<Show> = {
        city: "",
        venue: "",
        date: new Date().toISOString().split('T')[0],
        ticketUrl: "",
        note: "",
        isCancelled: false,
    };

    const [formData, setFormData] = useState<Partial<Show>>(emptyForm);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/shows", {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingId ? { ...formData, id: editingId } : formData),
            });

            if (res.ok) {
                const savedShow = await res.json();
                if (editingId) {
                    setShows(prev => prev.map(s => s.id === editingId ? savedShow : s).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
                } else {
                    setShows(prev => [...prev, savedShow].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
                }
                setIsFormOpen(false);
                setEditingId(null);
                setFormData(emptyForm);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this show?")) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/shows?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setShows(shows.filter(s => s.id !== id));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const upcomingShows = shows.filter(s => new Date(s.date) >= new Date());
    const pastShows = shows.filter(s => new Date(s.date) < new Date());

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-oswald font-bold uppercase tracking-widest text-gray-400">Scheduled Shows</h3>
                <Button onClick={() => { setIsFormOpen(true); setEditingId(null); setFormData(emptyForm); }}>
                    <Plus className="h-4 w-4 mr-2" /> Add Show
                </Button>
            </div>

            {isFormOpen && (
                <div className="bg-black border border-[#39ff14]/30 p-8 rounded-3xl animate-in fade-in zoom-in duration-300">
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">City</label>
                                <input
                                    required
                                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none"
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Venue</label>
                                <input
                                    required
                                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none"
                                    value={formData.venue}
                                    onChange={e => setFormData({ ...formData, venue: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    required
                                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none"
                                    value={typeof formData.date === 'string' ? formData.date.slice(0, 16) : new Date(formData.date!).toISOString().slice(0, 16)}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Ticket URL (Optional)</label>
                                <input
                                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none"
                                    value={formData.ticketUrl || ""}
                                    onChange={e => setFormData({ ...formData, ticketUrl: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-oswald uppercase text-gray-400 tracking-widest ml-1">Note (Optional)</label>
                                <input
                                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#39ff14] outline-none"
                                    placeholder="e.g. VIP packages available"
                                    value={formData.note || ""}
                                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                            <input
                                type="checkbox"
                                id="isCancelled"
                                className="w-5 h-5 rounded border-red-500/20 bg-black text-red-500 focus:ring-red-500"
                                checked={formData.isCancelled}
                                onChange={e => setFormData({ ...formData, isCancelled: e.target.checked })}
                            />
                            <label htmlFor="isCancelled" className="font-oswald uppercase text-sm tracking-widest cursor-pointer text-red-500">
                                MARK AS CANCELLED
                            </label>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isLoading} className="min-w-[150px]">
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (editingId ? "UPDATE SHOW" : "ADD SHOW")}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-12">
                <section className="space-y-6">
                    <h4 className="text-lg font-oswald font-bold uppercase tracking-widest text-[#39ff14]">Upcoming</h4>
                    <div className="space-y-4">
                        {upcomingShows.map((show) => (
                            <div key={show.id} className={`p-6 bg-black border border-white/5 rounded-2xl flex flex-wrap items-center justify-between gap-6 transition-all hover:border-white/20 ${show.isCancelled ? 'opacity-50' : ''}`}>
                                <div className="flex items-center gap-8">
                                    <div className="text-center min-w-[60px]">
                                        <p className="text-2xl font-oswald font-bold text-[#39ff14]">{format(new Date(show.date), "dd")}</p>
                                        <p className="text-xs font-oswald uppercase text-gray-500">{format(new Date(show.date), "MMM")}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-oswald font-bold flex items-center gap-2">
                                            {show.venue} {show.isCancelled && <span className="text-red-500 text-[10px] border border-red-500/30 px-2 py-0.5 rounded">CANCELLED</span>}
                                        </h5>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {show.city}</span>
                                            <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> {format(new Date(show.date), "HH:mm")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        className="p-3 text-gray-500 hover:text-[#39ff14] transition-colors"
                                        onClick={() => { setEditingId(show.id); setFormData(show); setIsFormOpen(true); }}
                                    >
                                        <Edit2 className="h-5 w-5" />
                                    </button>
                                    <button
                                        className="p-3 text-gray-500 hover:text-red-500 transition-colors"
                                        onClick={() => handleDelete(show.id)}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {upcomingShows.length === 0 && <p className="text-gray-600 italic text-center p-8 bg-white/5 rounded-2xl border border-dashed border-white/10">No upcoming shows.</p>}
                    </div>
                </section>

                {pastShows.length > 0 && (
                    <section className="space-y-6 opacity-60">
                        <h4 className="text-lg font-oswald font-bold uppercase tracking-widest text-gray-500">Past Gigs</h4>
                        <div className="space-y-2">
                            {pastShows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(show => (
                                <div key={show.id} className="p-4 bg-white/5 rounded-xl flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-6">
                                        <span className="text-gray-500 font-oswald uppercase w-20">{format(new Date(show.date), "MMM dd")}</span>
                                        <span className="font-bold text-gray-300">{show.venue}, {show.city}</span>
                                    </div>
                                    <button
                                        className="p-2 text-gray-700 hover:text-red-500 transition-colors"
                                        onClick={() => handleDelete(show.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
