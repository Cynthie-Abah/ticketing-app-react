
export function StatCard({ icon, title, value, bgColor, borderColor }) {
  return (
    <div className={`${bgColor} border ${borderColor} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-center gap-4">
        <div>{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}