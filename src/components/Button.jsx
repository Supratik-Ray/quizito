function Button({
  onClick,
  children,
  disabled = false,
  style = "",
  bgColor,
  hoverBgColor,
}) {
  return (
    <button
      onClick={onClick}
      className={`${style} py-2 px-4 rounded-sm  transition duration-300 transform ${
        !disabled
          ? `${bgColor ? bgColor : "bg-slate-800"} hover:cursor-pointer ${
              hoverBgColor ? hoverBgColor : "hover:bg-slate-900"
            } hover:-translate-y-1`
          : `bg-slate-500`
      } `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
