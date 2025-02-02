export type ButtonType = "button" | "submit" | "reset";

export type ButtonColor = "primary" | "default";

interface IButtonProps {
  type?: ButtonType;
  color?: ButtonColor;
  hoverColor?: ButtonColor;
  onClick?: () => void;
  children: any;
}

const Button = ({ type = "button", color = "default", onClick, children }: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`tw-py-3 tw-px-5 tw-rounded-md tw-text-sm btn-${color} tw-hover:bg-primary tw-hover:text-white tw-cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
