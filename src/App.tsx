import React from 'react';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  return (
    <div className="App min-h-screen bg-[var(--background)] text-[var(--text)]">
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>
      <Calculator />
      <p className="developer">
        Developed for COMP354 <span className="text-[var(--accent-color)]">Group E</span>
      </p>
    </div>
  );
};

export default App;