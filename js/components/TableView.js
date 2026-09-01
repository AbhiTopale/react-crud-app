// Data Table View Component with Column Sorting
window.TableView = function({ items, onToggleComplete, onEdit, onDelete }) {
  const [sortField, setSortField] = React.useState('createdAt');
  const [sortDirection, setSortDirection] = React.useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, sortField, sortDirection]);

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '🔼' : '🔽';
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl mb-8 animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 text-xs font-extrabold uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
              <th className="py-3.5 px-4 w-10 text-center">Done</th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-indigo-600 transition" onClick={() => handleSort('title')}>
                Item Title {getSortIcon('title')}
              </th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-indigo-600 transition" onClick={() => handleSort('category')}>
                Category {getSortIcon('category')}
              </th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-indigo-600 transition" onClick={() => handleSort('status')}>
                Status {getSortIcon('status')}
              </th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-indigo-600 transition" onClick={() => handleSort('priority')}>
                Priority {getSortIcon('priority')}
              </th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-indigo-600 transition" onClick={() => handleSort('dueDate')}>
                Due Date {getSortIcon('dueDate')}
              </th>
              <th className="py-3.5 px-4 text-right cursor-pointer hover:text-indigo-600 transition" onClick={() => handleSort('budget')}>
                Budget {getSortIcon('budget')}
              </th>
              <th className="py-3.5 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800/60 text-xs font-medium">
            {sortedItems.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No records found in table view.
                </td>
              </tr>
            ) : (
              sortedItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors"
                >
                  {/* Checkbox */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={item.completed || item.status === 'Completed'}
                      onChange={() => onToggleComplete(item.id)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                    />
                  </td>

                  {/* Title & Description */}
                  <td className="py-3 px-4 max-w-xs">
                    <div className={`font-bold text-gray-900 dark:text-white ${item.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/40">
                      {item.category}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-[11px] font-bold rounded-md ${
                      item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                      item.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                      item.status === 'In Review' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                      item.priority === 'Urgent' ? 'badge-urgent' :
                      item.priority === 'High' ? 'badge-high' :
                      item.priority === 'Medium' ? 'badge-medium' :
                      'badge-low'
                    }`}>
                      {item.priority}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {item.dueDate || '—'}
                  </td>

                  {/* Budget */}
                  <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                    ${Number(item.budget || 0).toLocaleString()}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="px-2 py-1 font-bold text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="px-2 py-1 font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
