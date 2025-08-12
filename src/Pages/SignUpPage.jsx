import Form from "../Components/Form/Form";

const SignUpPage = () => {
  return (
    <div className="w-full xl:max-w-[50%] sm:max-w-[500px] max-w-full px-3">
      <Form isLogin={false} title={"Sign Up"} />
    </div>
  );
};

export default SignUpPage;
