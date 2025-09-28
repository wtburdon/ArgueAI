export default function Sidebar() {
    const items = [
        { label: "Learn", icon: "🏠" },
        { label: "Characters", icon: "🔤" },
        { label: "Practice", icon: "📝" },
        { label: "Leaderboards", icon: "🏆" },
        { label: "Quests", icon: "🗺️" },
        { label: "Shop", icon: "🛒" },
        { label: "Profile", icon: "👤" },
        { label: "More", icon: "⋯" },
    ];

    return (
        <aside className="bg-[#131F24] text-white w-56 h-screen p-4 flex flex-col">
            <h1 className="text-green-500 text-2xl font-bold mb-6">duolingo</h1>
            <nav className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#202F36] cursor-pointer"
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
