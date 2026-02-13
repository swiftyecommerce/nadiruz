import { SocialLinksManager } from "./SocialLinksManager";

export default function SocialsPage() {
    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h2 className="text-4xl font-oswald font-bold tracking-tight">SOSYAL <span className="text-[#39ff14]">LİNKLER</span></h2>
                <p className="text-gray-500 font-medium">Dijital platformlarınızı ve sosyal medya profillerinizi yönetin.</p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-3xl shadow-2xl">
                <SocialLinksManager />
            </div>
        </div>
    );
}
