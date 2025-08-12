import Form from "../Components/Form/Form";

const SignInPage = () => {
  return (
    <div className="w-full xl:max-w-[50%] sm:max-w-[500px] max-w-full px-3">
      <Form isLogin={true} title={"Sign In"} />
    </div>
  );
};

export default SignInPage;
