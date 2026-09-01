// Analytics View Component
window.AnalyticsView = function({ items }) {
  const total = items.length;

  const getStatusCount = (status) => items.filter(i => i.status === status).length;
  const getPriorityCount = (priority) => items.filter(i => i.priority === priority).length;

  // Category Aggregation
  const categoryStats = React.useMemo(() => {
    const map = {};
    items.forEach(item => {
      const cat = item.category || 'Uncategorized';
      if (!map[cat]) map[cat] = { count: 0, budget: 0 };
      map[cat].count += 1;
      map[cat].budget += Number(item.budget || 0);
    });
    return Object.keys(map).map(cat => ({
      category: cat,
      count: map[cat].count,
      budget: map[cat].budget
    }));
  }, [items]);

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Status Distribution Panel */}
        <div className="glass-panel p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>📊</span> Workflow Status Distribution
          </h3>

          <div className="space-y-4">
            {[
              { label: 'To Do', count: getStatusCount('To Do'), color: 'bg-blue-500' },
              { label: 'In Progress', count: getStatusCount('In Progress'), color: 'bg-indigo-500' },
              { label: 'In Review', count: getStatusCount('In Review'), color: 'bg-amber-500' },
              { label: 'Completed', count: getStatusCount('Completed'), color: 'bg-emerald-500' }
            ].map(st => {
              const pct = total > 0 ? Math.round((st.count / total) * 100) : 0;
              return (
                <div key={st.label}>
                  <div className="flex justify-between text-xs font-bold mb-1 text-gray-700 dark:text-gray-300">
                    <span>{st.label} ({st.count})</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${st.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Breakdown Panel */}
        <div className="glass-panel p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>🔥</span> Priority Demographics
          </h3>

          <div className="space-y-4">
            {[
              { label: 'Urgent Priority', count: getPriorityCount('Urgent'), color: 'bg-rose-500' },
              { label: 'High Priority', count: getPriorityCount('High'), color: 'bg-amber-500' },
              { label: 'Medium Priority', count: getPriorityCount('Medium'), color: 'bg-blue-500' },
              { label: 'Low Priority', count: getPriorityCount('Low'), color: 'bg-emerald-500' }
            ].map(pr => {
              const pct = total > 0 ? Math.round((pr.count / total) * 100) : 0;
              return (
                <div key={pr.label}>
                  <div className="flex justify-between text-xs font-bold mb-1 text-gray-700 dark:text-gray-300">
                    <span>{pr.label} ({pr.count})</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${pr.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Category Budget Allocation */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>💰</span> Category Budget Allocations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map(cat => (
            <div key={cat.category} className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {cat.category}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {cat.count} items
                </span>
              </div>
              <div className="text-xl font-black text-gray-900 dark:text-white">
                ${cat.budget.toLocaleString()}
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                Avg: ${cat.count > 0 ? Math.round(cat.budget / cat.count).toLocaleString() : 0} / item
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
