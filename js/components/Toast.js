// Toast Notification Popup Component
window.ToastContainer = function({ toasts, onCloseToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border flex items-center justify-between gap-3 text-xs font-bold animate-fade-in ${
            toast.type === 'success' ? 'bg-emerald-900/90 text-emerald-100 border-emerald-700/80 backdrop-blur-md' :
            toast.type === 'danger' ? 'bg-rose-900/90 text-rose-100 border-rose-700/80 backdrop-blur-md' :
            'bg-indigo-900/90 text-indigo-100 border-indigo-700/80 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>
              {toast.type === 'success' ? '✅' : toast.type === 'danger' ? '🗑️' : 'ℹ️'}
            </span>
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => onCloseToast(toast.id)}
            className="text-white/70 hover:text-white font-black text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
