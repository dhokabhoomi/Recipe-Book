const GlobalStyles = () => (
  <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Forum&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sen:wght@400..800&display=swap");

:root {
  /* Primary Color Palette */
  --primary-color: #456da8;
  --primary-dark: #2e4a73;
  --primary-light: #6b8bc7;
  --primary-lighter: #9bb3d9;
  --primary-lightest: #ccd9ea;
  
  /* Secondary Color Palette */
  --secondary-color: #fff6c7;
  --secondary-dark: #f4e89c;
  --secondary-light: #fffadc;
  --secondary-lighter: #fffdef;
  --secondary-lightest: #fefff8;
  
  /* Neutral Colors */
  --background-color: #fafbfc;
  --text-color: #1a1a1a;
  --text-light: #4a5568;
  --text-lighter: #6b7280;
  --text-lightest: #9ca3af;
  
  /* Card and UI Colors */
  --card-bg: #ffffff;
  --card-border: #e2e8f0;
  --input-bg: #ffffff;
  --input-border: #d1d5db;
  --input-border-focus: var(--primary-color);
  
  /* Interactive Colors */
  --hover-color: var(--primary-dark);
  --active-bg-color: var(--primary-color);
  --active-text-color: #ffffff;
  
  /* Status Colors */
  --success-color: #10b981;
  --success-bg: #ecfdf5;
  --error-color: #ef4444;
  --error-bg: #fef2f2;
  --warning-color: #f59e0b;
  --warning-bg: #fffbeb;
  
  /* Shadows */
  --shadow-light: 0 4px 6px rgba(69, 109, 168, 0.05);
  --shadow-medium: 0 8px 25px rgba(69, 109, 168, 0.1);
  --shadow-heavy: 0 20px 40px rgba(69, 109, 168, 0.15);
  
  /* Typography */
  --logo-font: "Forum", serif;
  --heading-font: "Playfair Display", serif;
  --body-font: "Lato", sans-serif;
  
  /* Spacing and Radius */
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
  --transition-fast: 0.2s ease;
  --transition-medium: 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: var(--body-font);
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  gap: 0.5rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: 1px solid var(--secondary-dark);
}

.btn-secondary:hover {
  background-color: var(--secondary-dark);
  border-color: var(--primary-color);
}

.btn-danger {
  background-color: var(--error-color);
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Loading Spinner */
.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Animations */
.fade-in {
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Message Styles */
.error-message {
  color: var(--error-color);
  background-color: var(--error-bg);
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #fecaca;
}

.success-message {
  color: var(--success-color);
  background-color: var(--success-bg);
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #a7f3d0;
}

.success-alert {
  background-color: var(--success-bg);
  border: 1px solid var(--success-color);
  color: #065f46;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Form Styles */
.form-input,
.form-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--input-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--input-bg);
  font-size: 1rem;
  font-family: var(--body-font);
  transition: all var(--transition-fast);
  resize: vertical;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--input-border-focus);
  box-shadow: 0 0 0 3px rgba(69, 109, 168, 0.1);
}

.form-textarea {
  min-height: 120px;
}

.form-input.error,
.form-textarea.error {
  border-color: var(--error-color);
}

.form-label {
  display: block;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 2rem;
}

/* Placeholder styles */
::placeholder {
  color: var(--text-lightest);
}

/* Layout */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: auto;
}

/* Tags */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid var(--secondary-dark);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 0.75rem;
  }

  .main-content {
    padding: 1rem 0;
  }
}
`}</style>
);
export default GlobalStyles;
