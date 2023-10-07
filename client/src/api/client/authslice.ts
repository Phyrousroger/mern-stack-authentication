import { create } from "zustand";
import Cookies from "js-cookie";
interface Auth {
  accessToken: string;
  refreshToken: string;
}
interface AuthSlice {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  resetAuth: () => void;
}

const initialAuth = { accessToken: "", refreshToken: "" };

const useAuthStore = create<AuthSlice>((set) => {
  const cookie = Cookies.get("access");
  const initialAuthState = cookie ? JSON.parse(cookie) : initialAuth;
  return {
    auth: initialAuthState,
    setAuth: (auth) => {
      set((state) => {
        Cookies.set("access", JSON.stringify(auth));
        return { ...state, auth };
      });
    },
    resetAuth: () => {
      set((state) => {
        Cookies.remove("access");
        return { ...state, auth: initialAuth };
      });
    },
  };
});

export default useAuthStore;
