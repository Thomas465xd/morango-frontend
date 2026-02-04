import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";

export default function page() {
    return (
        <section className="p-8">
            <h1 className="title">
                Administración
            </h1>
            <AdminDashboard />
        </section>
    )
}
