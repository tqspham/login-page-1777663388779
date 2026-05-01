import { redirect } from 'next/navigation';

export default function DashboardPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Dashboard</h1>
        <p className="text-slate-300 text-lg">
          Welcome! You have successfully logged in.
        </p>
      </div>
    </div>
  );
}
