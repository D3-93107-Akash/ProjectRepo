import { cn } from "@/lib/utils";

export default function SidebarItem({ label, icon: Icon, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-blue-50 text-blue-600 font-semibold"
          : "text-slate-600 hover:bg-slate-50"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </button>
  );
}