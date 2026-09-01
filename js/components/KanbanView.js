// Kanban Board View Component
window.KanbanView = function({ items, onMoveStatus, onEdit, onDelete, onToggleComplete }) {
  const columns = [
    { id: 'To Do', title: 'To Do', icon: '📝', color: 'border-blue-400 dark:border-blue-500' },
    { id: 'In Progress', title: 'In Progress', icon: '⚡', color: 'border-indigo-400 dark:border-indigo-500' },
    { id: 'In Review', title: 'In Review', icon: '🔍', color: 'border-amber-400 dark:border-amber-500' },
    { id: 'Completed', title: 'Completed', icon: '🎉', color: 'border-emerald-400 dark:border-emerald-500' }
  ];

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Urgent': return 'badge-urgent';
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-medium';
      case 'Low': return 'badge-low';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-8">
      {columns.map((col) => {
        const colItems = items.filter(item => item.status === col.id);
        
        return (
          <div
            key={col.id}
            className={`kanban-col p-4 rounded-2xl border-t-4 ${col.color} border-x border-b border-gray-200 dark:border-gray-800 flex flex-col`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700/60">
              <div className="flex items-center gap-2">
                <span className="text-base">{col.icon}</span>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                  {col.title}
                </h3>
              </div>
              <span className="px-2 py-0.5 text-xs font-extrabold rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {colItems.length}
              </span>
            </div>

            {/* Column Card List */}
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {colItems.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-200 dark:border-gray-700/50 rounded-xl">
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">No items in {col.title}</p>
                </div>
              ) : (
                colItems.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel p-4 rounded-xl border border-gray-200 dark:border-gray-700/60 card-hover relative group animate-fade-in"
                  >
                    {/* Header: Category & Priority */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50">
                        {item.category}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${getPriorityBadgeClass(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>

                    {/* Item Title */}
                    <h4 className={`font-bold text-sm text-gray-900 dark:text-white mb-1.5 leading-snug ${item.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                      {item.title}
                    </h4>

                    {/* Item Description */}
                    {item.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Footer: Due Date, Budget & Action Toolbar */}
                    <div className="pt-2.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        {item.dueDate && (
                          <span className="flex items-center gap-1">
                            📅 {item.dueDate}
                          </span>
                        )}
                        {item.budget > 0 && (
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            ${Number(item.budget).toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Action Menu Buttons */}
                      <div className="flex items-center gap-1">
                        {/* Status Move Controls */}
                        {col.id !== 'To Do' && (
                          <button
                            onClick={() => {
                              const prevStatus = col.id === 'Completed' ? 'In Review' : col.id === 'In Review' ? 'In Progress' : 'To Do';
                              onMoveStatus(item.id, prevStatus);
                            }}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
                            title="Move Back"
                          >
                            👈
                          </button>
                        )}
                        
                        {col.id !== 'Completed' && (
                          <button
                            onClick={() => {
                              const nextStatus = col.id === 'To Do' ? 'In Progress' : col.id === 'In Progress' ? 'In Review' : 'Completed';
                              onMoveStatus(item.id, nextStatus);
                            }}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
                            title="Move Forward"
                          >
                            👉
                          </button>
                        )}

                        <button
                          onClick={() => onEdit(item)}
                          className="p-1 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 font-semibold"
                          title="Edit Item"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => onDelete(item)}
                          className="p-1 rounded hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 font-semibold"
                          title="Delete Item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
