// Item Create / Edit Modal Form Component
window.ItemModal = function({ isOpen, onClose, onSave, itemToEdit, categories }) {
  if (!isOpen) return null;

  const isEditing = Boolean(itemToEdit && itemToEdit.id);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('Engineering');
  const [priority, setPriority] = React.useState('Medium');
  const [status, setStatus] = React.useState('To Do');
  const [dueDate, setDueDate] = React.useState('');
  const [budget, setBudget] = React.useState(0);
  const [tagsInput, setTagsInput] = React.useState('');
  const [coverColor, setCoverColor] = React.useState('from-indigo-500 to-purple-600');

  const [errors, setErrors] = React.useState({});

  // Populate state if editing
  React.useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title || '');
      setDescription(itemToEdit.description || '');
      setCategory(itemToEdit.category || 'Engineering');
      setPriority(itemToEdit.priority || 'Medium');
      setStatus(itemToEdit.status || 'To Do');
      setDueDate(itemToEdit.dueDate || '');
      setBudget(itemToEdit.budget || 0);
      setTagsInput(itemToEdit.tags ? itemToEdit.tags.join(', ') : '');
      setCoverColor(itemToEdit.coverColor || 'from-indigo-500 to-purple-600');
    } else {
      // Reset form defaults for create
      setTitle('');
      setDescription('');
      setCategory('Engineering');
      setPriority('Medium');
      setStatus('To Do');
      setDueDate('');
      setBudget(0);
      setTagsInput('');
      setCoverColor('from-indigo-500 to-purple-600');
    }
    setErrors({});
  }, [itemToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const parsedTags = tagsInput
      ? tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const itemData = {
      id: isEditing ? itemToEdit.id : `item-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status,
      dueDate,
      budget: Number(budget) || 0,
      tags: parsedTags,
      coverColor,
      completed: status === 'Completed',
      createdAt: isEditing ? itemToEdit.createdAt : new Date().toISOString()
    };

    onSave(itemData, isEditing);
    onClose();
  };

  const colorPresets = [
    { label: 'Indigo Purple', value: 'from-indigo-500 to-purple-600' },
    { label: 'Rose Pink', value: 'from-rose-500 to-pink-600' },
    { label: 'Blue Cyan', value: 'from-blue-500 to-cyan-600' },
    { label: 'Emerald Teal', value: 'from-emerald-500 to-teal-600' },
    { label: 'Amber Orange', value: 'from-amber-500 to-orange-600' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50/80 dark:bg-gray-900/80">
          <div className="flex items-center gap-2">
            <span className="text-xl">{isEditing ? '✏️' : '✨'}</span>
            <h2 className="text-lg font-black text-gray-900 dark:text-white">
              {isEditing ? 'Edit Workspace Item' : 'Create New Workspace Item'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold transition text-xs"
          >
            ✕
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs font-medium">
          
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Redesign Modern Landing Page"
              className={`w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border ${
                errors.title ? 'border-rose-500' : 'border-gray-200 dark:border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.title && <p className="text-rose-500 text-[11px] mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
              Description
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add key objectives, technical context or notes..."
              className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          {/* Category & Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1.5">
              Priority Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['Low', 'Medium', 'High', 'Urgent'].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`py-1.5 rounded-xl font-bold transition text-center border ${
                    priority === p
                      ? p === 'Urgent' ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                        : p === 'High' ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                        : p === 'Medium' ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                        : 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date & Budget Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                Estimated Budget ($)
              </label>
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. React, Tailwind, Frontend"
              className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Cover Color Theme Accent */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1.5">
              Card Theme Accent
            </label>
            <div className="flex items-center gap-2">
              {colorPresets.map(preset => (
                <button
                  type="button"
                  key={preset.value}
                  onClick={() => setCoverColor(preset.value)}
                  className={`w-7 h-7 rounded-full bg-gradient-to-r ${preset.value} ${
                    coverColor === preset.value ? 'ring-2 ring-indigo-500 ring-offset-2 scale-110' : 'opacity-70'
                  } transition transform`}
                  title={preset.label}
                ></button>
              ))}
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-xl shadow-lg shadow-indigo-500/30 transition transform active:scale-95"
            >
              {isEditing ? 'Save Changes' : 'Create Item'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
