// Storage utility module for LocalStorage CRUD & JSON import/export
const STORAGE_KEY = 'apex_workspace_items_v1';

window.StorageUtil = {
  // Read all items
  getItems: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Initialize with default sample data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(window.INITIAL_ITEMS || []));
        return window.INITIAL_ITEMS || [];
      }
      return JSON.parse(stored);
    } catch (err) {
      console.error('Error reading from localStorage:', err);
      return window.INITIAL_ITEMS || [];
    }
  },

  // Save all items
  saveItems: function(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }
  },

  // Export items to JSON file
  exportJSON: function(items) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `apex_workspace_export_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  // Reset to initial sample data
  resetDefaults: function() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(window.INITIAL_ITEMS || []));
    return window.INITIAL_ITEMS || [];
  }
};
