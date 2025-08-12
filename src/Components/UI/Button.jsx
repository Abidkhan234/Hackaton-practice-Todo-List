const Button = ({ btnType, btnText, isRounded }) => {
  return (
    <button
      type={btnType || "button"}
      className={`font-medium text-lg py-1.5 w-full border border-red-500 cursor-pointer ${
        isRounded ? "rounded-full" : "rounded-md"
      } bg-transparent overflow-hidden relative group z-20`}
    >
      <span className="group-hover:text-white transition-colors duration-300">
        {btnText}
      </span>
      {/* top */}
      <div className="absolute top-0 w-full h-[50%] translate-y-[-100%] bg-red-500 group-hover:translate-y-[0%] transition-transform -z-10 duration-300"></div>

      {/* bottom */}
      <div className="absolute bottom-0 w-full translate-y-[100%] h-[50%] bg-red-500 group-hover:translate-y-[0%] transition-transform -z-10 duration-300"></div>
    </button>
  );
};

export default Button;
