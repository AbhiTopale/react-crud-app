// Main React Application Controller
const { useState, useEffect, useMemo } = React;

function App() {
  // State Initialization
  const [items, setItems] = useState(() => window.StorageUtil.getItems());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [activeView, setActiveView] = useState('kanban'); // 'kanban', 'grid', 'table', 'analytics'
  const [darkMode, setDarkMode] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Sync Dark Mode class on <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist items to LocalStorage on change
  useEffect(() => {
    window.StorageUtil.saveItems(items);
  }, [items]);

  // Toast Helper
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Derive unique categories dynamically
  const categories = useMemo(() => {
    const defaultCats = ['Engineering', 'Design', 'Marketing', 'QA & Testing', 'Documentation'];
    const customCats = items.map(i => i.category).filter(Boolean);
    return Array.from(new Set([...defaultCats, ...customCats]));
  }, [items]);

  // Search & Filter Logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search Query
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query ||
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(query)));

      // Category Filter
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

      // Priority Filter
      const matchesPriority = selectedPriority === 'All' || item.priority === selectedPriority;

      return matchesSearch && matchesCategory && matchesPriority;
    });
  }, [items, searchQuery, selectedCategory, selectedPriority]);

  // --- CRUD Handlers ---

  // CREATE & UPDATE
  const handleSaveItem = (itemData, isEditing) => {
    if (isEditing) {
      setItems(prev => prev.map(item => item.id === itemData.id ? itemData : item));
      addToast(`Updated "${itemData.title}" successfully!`, 'success');
    } else {
      setItems(prev => [itemData, ...prev]);
      addToast(`Created "${itemData.title}"!`, 'success');
    }
  };

  // DELETE
  const handleConfirmDelete = (id) => {
    const target = items.find(i => i.id === id);
    setItems(prev => prev.filter(item => item.id !== id));
    setItemToDelete(null);
    addToast(`Deleted "${target ? target.title : 'item'}"`, 'danger');
  };

  // QUICK COMPLETE TOGGLE
  const handleToggleComplete = (id) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextCompleted = !item.completed;
        const nextStatus = nextCompleted ? 'Completed' : 'In Progress';
        return { ...item, completed: nextCompleted, status: nextStatus };
      }
      return item;
    }));
  };

  // MOVE KANBAN STATUS
  const handleMoveStatus = (id, newStatus) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
          completed: newStatus === 'Completed'
        };
      }
      return item;
    }));
  };

  // EXPORT JSON
  const handleExportJSON = () => {
    window.StorageUtil.exportJSON(items);
    addToast('Workspace data exported to JSON file', 'info');
  };

  // RESET DEFAULT DATA
  const handleResetDefaults = () => {
    const defaultData = window.StorageUtil.resetDefaults();
    setItems(defaultData);
    addToast('Reset workspace to default sample data', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors">
      
      {/* Navigation Header */}
      <window.Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        activeView={activeView}
        setActiveView={setActiveView}
        categories={categories}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAddModal={() => { setItemToEdit(null); setIsModalOpen(true); }}
        onExportData={handleExportJSON}
        onResetData={handleResetDefaults}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-12">
        
        {/* Metric KPI Overview Cards */}
        <window.StatsOverview items={items} />

        {/* View Mode Router */}
        {activeView === 'kanban' && (
          <window.KanbanView
            items={filteredItems}
            onMoveStatus={handleMoveStatus}
            onEdit={(item) => { setItemToEdit(item); setIsModalOpen(true); }}
            onDelete={(item) => setItemToDelete(item)}
            onToggleComplete={handleToggleComplete}
          />
        )}

        {activeView === 'grid' && (
          <window.GridView
            items={filteredItems}
            onToggleComplete={handleToggleComplete}
            onEdit={(item) => { setItemToEdit(item); setIsModalOpen(true); }}
            onDelete={(item) => setItemToDelete(item)}
          />
        )}

        {activeView === 'table' && (
          <window.TableView
            items={filteredItems}
            onToggleComplete={handleToggleComplete}
            onEdit={(item) => { setItemToEdit(item); setIsModalOpen(true); }}
            onDelete={(item) => setItemToDelete(item)}
          />
        )}

        {activeView === 'analytics' && (
          <window.AnalyticsView items={items} />
        )}

        {/* Reset Data Toolbar */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div>
            Showing <strong className="text-gray-900 dark:text-white">{filteredItems.length}</strong> of <strong className="text-gray-900 dark:text-white">{items.length}</strong> items
          </div>
          <button
            onClick={handleResetDefaults}
            className="hover:text-rose-500 font-semibold transition"
          >
            🔄 Reset Sample Data
          </button>
        </div>

      </main>

      {/* Modal Dialogs */}
      <window.ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        itemToEdit={itemToEdit}
        categories={categories}
      />

      <window.DeleteModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemToDelete={itemToDelete}
      />

      {/* Toast Popup Notification */}
      <window.ToastContainer
        toasts={toasts}
        onCloseToast={removeToast}
      />

    </div>
  );
}

// Render React App to Root DOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
