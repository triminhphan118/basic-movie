function Button({
  onClick = () => {},
  children,
  className,
  type = "primary",
  wFull = false,
  ...props
}) {
  let bgColor = "primary";
  switch (type) {
    case "primary":
      bgColor = "bg-primary";
      break;
    case "secondary":
      bgColor = "bg-secondary";
      break;
    case "third":
      bgColor = "bg-third";
      break;
    default:
      break;
  }
  return (
    <button
      className={`px-4 py-2 ${bgColor} rounded-lg text-lg font-bold ${
        wFull ? "w-full" : ""
      } ${className || ""}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
