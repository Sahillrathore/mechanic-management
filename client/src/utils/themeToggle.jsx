export default function ThemeToggle() {
    const toggle = () => {
        document.documentElement.classList.toggle("dark");
    };

    return (
        <button className="btn" onClick={toggle}>
            Toggle Theme
        </button>
    );
}
