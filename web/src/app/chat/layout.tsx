export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <ul className="space-y-2">
          <li className="p-2 bg-gray-700 rounded">Chat 1</li>
          <li className="p-2 bg-gray-700 rounded">Chat 2</li>
        </ul>
      </aside>

      <main className="flex-1 p-4 bg-white">{children}</main>
    </div>
  );
}
