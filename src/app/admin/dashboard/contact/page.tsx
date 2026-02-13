import { ContactManager } from "./ContactManager";

export default function ContactInfoPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-4xl font-oswald font-bold tracking-tight">İLETİŞİM <span className="text-[#39ff14]">BİLGİLERİ</span></h2>
                <p className="text-gray-500 font-medium">Sitede görünen profesyonel iletişim detaylarını güncelleyin.</p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-3xl shadow-2xl">
                <ContactManager />
            </div>
        </div>
    );
}
