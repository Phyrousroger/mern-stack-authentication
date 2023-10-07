import { useLogin } from "@/api/server/auth/mutate";
import { Button, Input } from "@nextui-org/react";
import { AxiosError } from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginFn = useLogin();
  const naviagte = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => loginFn.mutate(data);
  return (
    <div className=" flex justify-center h-screen items-center">
      <div className=" w-96  ">
        <h1 className=" text-2xl text-center mb-3 text-purple-900   font-bold font-mono ">
          Login
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" p-5 justify-center border-2 border-purple-900 flex flex-col gap-5 shadow-lg shadow-purple-900"
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Invalid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                variant="underlined"
                size="lg"
                color="secondary"
                isInvalid={fieldState.invalid || loginFn.isError}
                errorMessage={
                  fieldState.invalid
                    ? fieldState.error && fieldState.error.message
                    : (loginFn.error as AxiosError<{ message: string }>)
                        ?.response?.data.message
                }
                label="email"
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "password is required!",
            }}
            render={({ field, fieldState }) => (
              <Input
                variant="underlined"
                size="lg"
                color="secondary"
                label="password"
                isInvalid={fieldState.invalid || loginFn.isError}
                errorMessage={
                  fieldState.invalid
                    ? fieldState.error && fieldState.error.message
                    : (loginFn.error as AxiosError<{ message: string }>)
                        ?.response?.data.message
                }
                {...field}
              />
            )}
          />

          {/* <Input
            variant="underlined"
            size="lg"
            type="password"
            color="secondary"
            label="password"
            value={"ptk123456789"}
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <span className=" text-red-500"> your password is required!</span>
          )} */}

          <Button
            type="submit"
            radius="sm"
            color="secondary"
            isLoading={loginFn.isLoading ? true : false}
          >
            Login
          </Button>
          <p>
            Don't You Have an Account yet?{" "}
            <small
              className=" text-blue-500 ms-2 cursor-pointer"
              onClick={() => naviagte("/register")}
            >
              Register Here
            </small>
          </p>
          <p
            className=" cursor-pointer text-red-600 text-end"
            onClick={() => naviagte("/forgot")}
          >
            Forgot Password
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
