document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const themeSelect = document.getElementById('theme-select');
  const editBtn = document.getElementById('edit-btn');
  const resetBtn = document.getElementById('reset-btn');
  const printBtn = document.getElementById('print-btn');
  const editBanner = document.getElementById('edit-banner');
  const body = document.body;
  const editableElements = document.querySelectorAll('.editable');

  // State
  let isEditMode = false;
  const STORAGE_KEY = 'ariharasuthan_resume_data';
  const THEME_KEY = 'ariharasuthan_resume_theme';

  // Default values mapping to restore on reset
  const defaultValues = {};
  editableElements.forEach((el, index) => {
    // Generate a unique ID if one doesn't exist
    if (!el.id) {
      el.id = `editable-item-${index}`;
    }
    defaultValues[el.id] = el.innerHTML.trim();
  });

  // Load Saved Data
  function loadSavedData() {
    try {
      const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (savedData) {
        Object.keys(savedData).forEach(id => {
          const el = document.getElementById(id);
          if (el) {
            el.innerHTML = savedData[id];
          }
        });
      }
    } catch (e) {
      console.error('Error loading data from localStorage:', e);
    }
  }

  // Save Data
  function saveData() {
    try {
      const dataToSave = {};
      editableElements.forEach(el => {
        dataToSave[el.id] = el.innerHTML.trim();
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Error saving data to localStorage:', e);
    }
  }

  // Load Theme
  function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      body.className = '';
      body.classList.add(savedTheme);
      themeSelect.value = savedTheme;
    }
  }

  // Save Theme
  function saveTheme(themeName) {
    localStorage.setItem(THEME_KEY, themeName);
  }

  // Toggle Edit Mode
  function toggleEditMode() {
    isEditMode = !isEditMode;
    body.classList.toggle('edit-active', isEditMode);
    editBanner.classList.toggle('hidden', !isEditMode);

    editableElements.forEach(el => {
      el.setAttribute('contenteditable', isEditMode ? 'true' : 'false');
      // Set placeholder attribute if empty
      if (isEditMode) {
        el.setAttribute('placeholder', 'Click to add text...');
      } else {
        el.removeAttribute('placeholder');
      }
    });

    if (isEditMode) {
      editBtn.innerHTML = '<span class="btn-icon">✔️</span> Save Changes';
      editBtn.classList.remove('btn-secondary');
      editBtn.classList.add('btn-primary');
    } else {
      editBtn.innerHTML = '<span class="btn-icon">✏️</span> Edit Mode';
      editBtn.classList.remove('btn-primary');
      editBtn.classList.add('btn-secondary');
      saveData(); // Save changes when turning edit mode off
    }
  }

  // Reset Data to Defaults
  function resetData() {
    if (confirm('Are you sure you want to discard all changes and restore default values?')) {
      localStorage.removeItem(STORAGE_KEY);
      Object.keys(defaultValues).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.innerHTML = defaultValues[id];
        }
      });
      if (isEditMode) {
        toggleEditMode(); // Turn off edit mode
      }
    }
  }

  // Add event listeners to save immediately on input (blur) when in edit mode
  editableElements.forEach(el => {
    el.addEventListener('blur', () => {
      if (isEditMode) {
        saveData();
      }
    });
  });

  // Prevent link navigation when in edit mode
  document.addEventListener('click', (e) => {
    if (isEditMode && e.target.closest('.contact-link')) {
      e.preventDefault();
    }
  });

  // Sync href attributes when link texts are edited
  const phoneLink = document.getElementById('res-phone');
  const emailLink = document.getElementById('res-email');
  const linkedinLink = document.getElementById('res-linkedin');

  if (phoneLink) {
    phoneLink.addEventListener('blur', () => {
      const val = phoneLink.innerText.trim();
      phoneLink.setAttribute('href', `tel:${val.replace(/\s+/g, '')}`);
    });
  }
  if (emailLink) {
    emailLink.addEventListener('blur', () => {
      const val = emailLink.innerText.trim();
      emailLink.setAttribute('href', `mailto:${val}`);
    });
  }
  if (linkedinLink) {
    linkedinLink.addEventListener('blur', () => {
      let val = linkedinLink.innerText.trim();
      if (!val.startsWith('http://') && !val.startsWith('https://')) {
        val = 'https://' + val;
      }
      linkedinLink.setAttribute('href', val);
    });
  }

  // Event Listeners
  themeSelect.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    body.className = '';
    body.classList.add(selectedTheme);
    if (isEditMode) {
      body.classList.add('edit-active');
    }
    saveTheme(selectedTheme);
  });

  editBtn.addEventListener('click', toggleEditMode);
  resetBtn.addEventListener('click', resetData);
  printBtn.addEventListener('click', () => {
    if (isEditMode) {
      toggleEditMode(); // Turn off edit mode before printing
    }
    window.print();
  });

  // Initialize
  loadSavedData();
  loadTheme();
});
