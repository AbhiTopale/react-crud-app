// Delete Confirmation Modal Component
window.DeleteModal = function({ isOpen, onClose, onConfirm, itemToDelete }) {
  if (!isOpen || !itemToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6 text-center">
        
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center text-2xl font-bold mb-4">
          🗑️
        </div>

        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">
          Delete Workspace Item?
        </h3>

        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Are you sure you want to permanently delete <strong className="text-gray-900 dark:text-white">"{itemToDelete.title}"</strong>? This action cannot be undone.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(itemToDelete.id)}
            className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-xl shadow-lg shadow-rose-500/30 transition transform active:scale-95"
          >
            Delete Item
          </button>
        </div>

      </div>
    </div>
  );
};
