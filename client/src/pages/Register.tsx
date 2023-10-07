import { useRegister } from "@/api/server/auth/mutate";
import { Button, Input } from "@nextui-org/react";
import { AxiosError } from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type RegisterType = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const RegisterFn = useRegister();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<RegisterType>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    RegisterFn.mutate(data);
  };

  return (
    <div className=" flex justify-center h-screen items-center">
      <div className=" w-96">
        <h1 className=" text-2xl text-center mb-3 text-purple-900   font-bold font-mono ">
          Register
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" p-5 justify-center border-2 border-purple-900 flex flex-col gap-5 shadow-lg shadow-purple-900"
        >
          <Controller
            name="username"
            control={control}
            rules={{
              required: "username is required!",
            }}
            render={({ field, fieldState }) => (
              <Input
                variant="underlined"
                size="lg"
                color="secondary"
                label="username"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error && fieldState.error.message}
                {...field}
              />
            )}
          />
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
                isInvalid={fieldState.invalid || RegisterFn.isError}
                errorMessage={
                  fieldState.invalid
                    ? fieldState.error && fieldState.error.message
                    : (RegisterFn.error as AxiosError<{ message: string }>)
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
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error && fieldState.error.message}
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            radius="sm"
            color="secondary"
            isLoading={RegisterFn.isLoading ? true : false}
          >
            Register
          </Button>
          <p className=" text-center">
            Already Have an Acccount?
            <small
              className=" text-blue-500 ms-2 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login Here
            </small>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
