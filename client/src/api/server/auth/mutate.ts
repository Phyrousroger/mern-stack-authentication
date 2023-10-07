import { useMutation } from "@tanstack/react-query";
import axios from "..";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/api/client/authslice";

interface RegisterPayloadProps {
  username: string;
  email: string;
  password: string;
}

/** register function  */
const register = async (payload: RegisterPayloadProps) => {
  const response = await axios.post("/auth/register", payload);

  console.log({ response });
  return response.data;
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: RegisterPayloadProps) => register(payload),
    onSuccess: (data, variable) => {
      console.log(data, variable);
      navigate("/login");
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
};
interface LoginPayloadProps {
  email: string;
  password: string;
}

/** login function */
const login = async (payload: LoginPayloadProps) => {
  const response = await axios.post("/auth/login", payload);
  return response.data;
};

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  // const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: LoginPayloadProps) => login(payload),
    onSuccess: (data) => {
      console.log({ data });
      if (data) {
        const accessToken = data.accesstoken;
        const refreshToken = data.refreshtoken;

        setAuth({ accessToken, refreshToken });
        // navigate("/");
      }
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
};
