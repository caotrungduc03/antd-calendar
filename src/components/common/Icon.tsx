interface IIconProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

const Icon = ({ icon, onClick }: IIconProps) => {
  return (
    <div
      className={`tw-flex tw-justify-center tw-items-center tw-w-6 tw-h-6 tw-rounded tw-p-1 tw-bg-[#F9F9F9] tw-text-[#252F4A] ${
        onClick ? "tw-cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default Icon;
