import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#0a0a0a] text-white">
            <AdminSidebar />
            <main className="flex-1 p-10 overflow-auto">
                {children}
            </main>
        </div>
    );
}
