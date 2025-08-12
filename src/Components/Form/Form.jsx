import { LuEye, LuEyeClosed } from "react-icons/lu";
import useAuth from "../../../Context/AuthContext";
import Button from "../UI/Button";

const Form = ({ isLogin, title }) => {
  const {
    userNameValue,
    emailValue,
    passwordValue,
    setUserNameValue,
    setPasswordValue,
    togglePassword,
    setTogglePassword,
    setEmailValue,
    handleLogin,
    handleRegister,
  } = useAuth();

  if (isLogin) {
    return (
      <form
        action={"post"}
        className="flex flex-col gap-4 w-full h-full p-3 border rounded-sm"
        onSubmit={(e) => handleLogin(e)}
      >
        <div className="text-center">
          <h1 className="font-semibold text-3xl relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 w-full h-[3px] rounded-sm bg-black"></span>
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-base  ms-1" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={emailValue}
            autoComplete="off"
            className="py-2 px-1.5 font-medium text-base placeholder:text-black border outline-none rounded-sm"
            placeholder="Enter Email"
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-base  ms-1" htmlFor="password">
            Password:
          </label>
          <div className="flex justify-between items-center border rounded-sm pe-1">
            <input
              type={togglePassword ? "text" : "password"}
              id="password"
              value={passwordValue}
              autoComplete="off"
              className="py-2 px-1.5 font-medium text-base placeholder:text-black grow outline-none"
              placeholder="Enter Password"
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            <button
              type="button"
              className="text-lg pe-1 cursor-pointer"
              onClick={() => setTogglePassword(!togglePassword)}
            >
              {togglePassword ? <LuEye /> : <LuEyeClosed />}
            </button>
          </div>
        </div>
        <div className="w-full">
          <Button btnText={title} btnType={"submit"} isRounded={false} />
        </div>
      </form>
    );
  } else {
    return (
      <form
        action={"post"}
        className="flex flex-col gap-4 w-full h-full p-3 border rounded-sm"
        onSubmit={(e) => {
          handleRegister(e);
        }}
      >
        <div className="text-center">
          <h1 className="font-semibold text-3xl relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 w-full h-[3px] rounded-sm bg-black"></span>
          </h1>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-base ms-1" htmlFor="username">
            Enter User Name
          </label>
          <input
            type="text"
            id="username"
            value={userNameValue}
            autoComplete="off"
            className="py-2 px-1.5 font-medium text-base placeholder:text-black border outline-none rounded-sm"
            placeholder="Enter User Name"
            onChange={(e) => setUserNameValue(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-base  ms-1" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={emailValue}
            autoComplete="off"
            className="py-2 px-1.5 font-medium text-base placeholder:text-black border outline-none rounded-sm"
            placeholder="Enter Email"
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-base  ms-1" htmlFor="password">
            Password:
          </label>
          <div className="flex justify-between items-center border rounded-sm pe-1">
            <input
              type={togglePassword ? "text" : "password"}
              id="password"
              value={passwordValue}
              autoComplete="off"
              className="py-2 px-1.5 font-medium text-base placeholder:text-black grow outline-none"
              placeholder="Enter Password"
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            <button
              type="button"
              className="text-lg pe-1 cursor-pointer"
              onClick={() => setTogglePassword(!togglePassword)}
            >
              {togglePassword ? <LuEye /> : <LuEyeClosed />}
            </button>
          </div>
        </div>
        <div className="w-full">
          <Button btnText={title} btnType={"submit"} isRounded={false} />
        </div>
      </form>
    );
  }
};

export default Form;
