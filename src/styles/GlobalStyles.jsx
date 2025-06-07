const GlobalStyles = () => (
  <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Forum&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sen:wght@400..800&display=swap");

:root {
  --background-color: #f8f9fa;
  --primary-color: #241e38;
  --accent-color: #f0edff;
  --text-color: #1a1a1a;
  --card-bg: #ffffff;
  --hover-color: #1b172b;
  --input-bg: #ffffff;
  --input-border: #e0e0e0;
  --active-bg-color: #2f214f;
  --active-text-color: #e6e0ff;
  --heading-color: #4b367c;
  --success-color: #10b981;
  --error-color: #ef4444;
  --warning-color: #f59e0b;
  --shadow-light: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-medium: 0 8px 25px rgba(0, 0, 0, 0.1);
  --shadow-heavy: 0 20px 40px rgba(0, 0, 0, 0.15);
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-accent: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

  --logo-font: "Forum", serif;
  --heading-font: "Playfair Display", serif;
  --body-font: "Lato", sans-serif;

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
  background: var(--gradient-primary);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.btn-secondary {
  background-color: var(--accent-color);
  color: var(--primary-color);
}

.btn-secondary:hover {
  background-color: #e0d7ff;
}

.btn-danger {
  background-color: var(--error-color);
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

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

.error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.success-message {
  color: var(--success-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

::placeholder {
  color: #9ca3af;
}

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

@media (max-width: 768px) {
  .container {
    padding: 0 0.75rem;
  }

  .main-content {
    padding: 1rem 0;
  }
}

}
`}</style>
);
export default GlobalStyles;
