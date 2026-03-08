'use client'
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({ theme: "dark", toggle: () => { } })

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark")

    const toggle = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"))
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const { theme, toggle } = useContext(ThemeContext)
    return { theme, toggle }
}

