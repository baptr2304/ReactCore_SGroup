import { Loader } from "lucide-react";
import React from "react";
interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "danger";
  loading?: boolean;
}
const sizeStyles: Record<"small" | "medium" | "large", string> = {
  small: "text-sm px-2 py-1",
  medium: "text-base px-4 py-1.5",
  large: "text-lg px-6 py-3",
};
const colorStyles: Record<"primary" | "secondary" | "danger", string> = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};
const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  disabled,
  className = "",
  icon: Icon,

  iconPosition = "left",
  size = "medium",
  color = "primary",
  loading = false,
  ...props
}) => {
  const isIconVisible = loading || Icon;
  const IconToRender = loading ? Loader : Icon;
  return (
    <button
      className={`inline-flex items-center justify-center gap-1 rounded-xl font-medium shadow-sm 
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {iconPosition === "left" && isIconVisible && IconToRender && (
        <IconToRender className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      )}
      <span>{label}</span>
      {iconPosition === "right" && isIconVisible && IconToRender && (
        <IconToRender className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      )}
    </button>
  );
};

export default CustomButton;
