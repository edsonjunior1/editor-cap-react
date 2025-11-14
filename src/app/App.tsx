import { AlertForm } from "../features/alerts/components/AlertForm";
import { AlertList } from "../features/alerts/components/AlertList";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5x1 mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-semibold text-lg">Alert Editor</h1>
          <span className="text-xs text-gray-500">
            React 19 - Vite - Redux Toolkit
          </span>
        </div>
      </header>

      <main className="max-w-5x1 mx-auto px-4 py-6 space-y=4">
        <AlertForm />
        <AlertList />
      </main>
    </div>
  );
}

export default App;
