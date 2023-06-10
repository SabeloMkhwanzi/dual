import { useEffect, useState } from "react";

export default function useDarkModeToggler() {
    const [theme, setTheme] = useState('light');
    const colorScheme = theme === 'dark' ? 'light' : 'dark';
    
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove(colorScheme);
        root.classList.add(theme);
    }, [theme, colorScheme]);

    return [colorScheme, setTheme];
}


