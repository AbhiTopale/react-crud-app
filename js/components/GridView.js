// Grid View Component
window.GridView = function({ items, onToggleComplete, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center border border-gray-200 dark:border-gray-800 my-6">
        <div className="text-4xl mb-3">🔍</div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">No items match your criteria</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search query or filters.</p>
      </div>
    );
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Urgent': return <span className="px-2.5 py-0.5 text-xs font-bold rounded-full badge-urgent">🔥 Urgent</span>;
      case 'High': return <span className="px-2.5 py-0.5 text-xs font-bold rounded-full badge-high">⚠️ High</span>;
      case 'Medium': return <span className="px-2.5 py-0.5 text-xs font-bold rounded-full badge-medium">🔷 Medium</span>;
      case 'Low': return <span className="px-2.5 py-0.5 text-xs font-bold rounded-full badge-low">🌱 Low</span>;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="glass-panel rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 card-hover flex flex-col justify-between animate-fade-in relative group"
        >
          {/* Decorative Gradient Cover Banner */}
          <div className={`h-2.5 bg-gradient-to-r ${item.coverColor || 'from-indigo-500 to-purple-600'}`}></div>

          <div className="p-5 flex-1 flex flex-col">
            {/* Top Row: Checkbox, Category & Priority */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.completed || item.status === 'Completed'}
                  onChange={() => onToggleComplete(item.id)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                />
                <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50">
                  {item.category}
                </span>
              </div>
              {getPriorityBadge(item.priority)}
            </div>

            {/* Title & Description */}
            <h3 className={`text-base font-extrabold text-gray-900 dark:text-white mb-2 leading-snug ${item.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
              {item.title}
            </h3>

            <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed flex-1">
              {item.description || 'No detailed description provided.'}
            </p>

            {/* Tags list */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Status Indicator Pill */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
              <span>Status:</span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                item.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                item.status === 'In Review' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}>
                {item.status}
              </span>
            </div>
          </div>

          {/* Card Bottom Toolbar */}
          <div className="px-5 py-3.5 bg-gray-50/80 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-medium">
              {item.dueDate && <span>📅 {item.dueDate}</span>}
              {item.budget > 0 && (
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ${Number(item.budget).toLocaleString()}
                </span>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(item)}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item)}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/70 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
