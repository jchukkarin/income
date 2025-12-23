// components/StatCard.tsx
export default function StatCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{title}</p>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold">{value}</h2>
        <span className="text-sm text-green-600">↗ {change}</span>
      </div>
    </div>
  );
}
