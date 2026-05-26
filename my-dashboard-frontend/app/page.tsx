import { Dashboard } from '../components/Dashboard';
import NewsSummarizer from '../components/NewsSummarizer';

export default function Home() {
  return (
    <main className="flex min-h-screen p-6 gap-6 bg-slate-50">
      <div className="w-2/3">
        <Dashboard />
      </div>
      <div className="w-1/3 border-l border-slate-300 pl-6">
        <NewsSummarizer />
      </div>
    </main>
  );
}