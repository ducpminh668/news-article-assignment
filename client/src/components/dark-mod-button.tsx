import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function DarkModeButton() {
  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    document.body.className = checked ? 'dark bg-gray-900' : 'bg-[#f3f6f9]';
  };

  return (
    <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} size={30} />
  );
}
