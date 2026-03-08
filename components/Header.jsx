"use client";
import { useTheme } from "@/app/context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

export default function Header() {
    const { theme, toggle } = useTheme();
    const isDark = theme === "dark";

    return (
        <header style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "16px 20px",
        }}>
            <button
                onClick={toggle}
                aria-label="Toggle theme"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    background: "var(--btn-secondary-bg)",
                    color: "var(--foreground)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--accent-muted)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = "var(--btn-secondary-bg)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--foreground)";
                }}
            >
                {isDark
                    ? <BsSun size={17} />
                    : <BsMoon size={17} />
                }
            </button>
        </header>
    );
}
