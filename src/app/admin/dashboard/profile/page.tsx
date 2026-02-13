import { ProfileForm } from "./ProfileForm";

export default function ProfilePage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-4xl font-oswald font-bold tracking-tight">SANATÇI <span className="text-[#39ff14]">PROFİLİ</span></h2>
                <p className="text-gray-500 font-medium">Genel kimliğinizi ve biyografinizi buradan güncelleyin.</p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-3xl shadow-2xl">
                <ProfileForm />
            </div>
        </div>
    );
}
