import componentStyles from "./components.module.css";

export default function Button({ label, onClick, disabled = false }) {
  return (
    <button
      disabled={disabled}
      className={componentStyles.btn}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
