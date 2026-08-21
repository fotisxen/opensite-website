import AdminAuthGate from "@/components/admin/AdminAuthGate";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGate>
      <AdminNav />
      <div className="mx-auto max-w-container-max px-margin-mobile py-10 md:px-margin-desktop">{children}</div>
    </AdminAuthGate>
  );
}
