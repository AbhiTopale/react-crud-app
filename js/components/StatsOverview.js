// Stats Overview Component
window.StatsOverview = function({ items }) {
  const total = items.length;
  const completed = items.filter(i => i.completed || i.status === 'Completed').length;
  const inProgress = items.filter(i => i.status === 'In Progress').length;
  const urgentCount = items.filter(i => i.priority === 'Urgent' || i.priority === 'High').length;
  const totalBudget = items.reduce((acc, i) => acc + (Number(i.budget) || 0), 0);
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* Stat Card 1: Total Items */}
      <div className="glass-panel p-4 rounded-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden card-hover">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total Workspace Items
            </p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
              {total}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold">
            📁
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{inProgress} active</span> in workflow
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      </div>

      {/* Stat Card 2: Completion Rate */}
      <div className="glass-panel p-4 rounded-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden card-hover">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Completion Rate
            </p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
              {completionPercentage}%
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-bold">
            ✅
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stat Card 3: Priority items */}
      <div className="glass-panel p-4 rounded-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden card-hover">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              High / Urgent Priority
            </p>
            <h3 className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">
              {urgentCount}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl font-bold">
            🔥
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <span>Requires attention</span>
          <span className="font-semibold text-rose-500">{total > 0 ? Math.round((urgentCount/total)*100) : 0}% of total</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500"></div>
      </div>

      {/* Stat Card 4: Total Budget */}
      <div className="glass-panel p-4 rounded-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden card-hover">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total Allocation
            </p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
              ${totalBudget.toLocaleString()}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl font-bold">
            💎
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Estimated budget across active items
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400"></div>
      </div>

    </div>
  );
};
