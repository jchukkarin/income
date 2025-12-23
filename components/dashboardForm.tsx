// components/Dashboard.tsx
import Sidebar from "./Sidebar";
import StatCard from "./StatCard";
import LineChart from "./LineChart";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-gray-500 font-semibold">Dashboard</h1>

          <div className="flex gap-2 text-gray-500">
            <button className="btn">Select dates</button>
            <button className="btn">Filters</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["12 months", "30 days", "7 days", "24 hours"].map((t) => (
            <button
              key={t}
              className="px-3 py-1 rounded-md border text-sm text-gray-500 bg-white hover:bg-gray-100"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left */}
          <div className="col-span-8 bg-white p-6 rounded-xl">
            <StatCard title="MRR" value="$18,880" change="7.4%" />
            <div className="mt-6">
              <LineChart />
            </div>
          </div>

          {/* Right */}
          <div className="col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-xl">
              <StatCard title="Total members" value="4,862" change="9.2%" />
            </div>
            <div className="bg-white p-6 rounded-xl">
              <StatCard title="Paid members" value="2,671" change="6.6%" />
            </div>
            <div className="bg-white p-6 rounded-xl">
              <StatCard title="Email open rate" value="82%" change="8.1%" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
