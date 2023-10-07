import useAuthStore from "@/api/client/authslice";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const auth = useAuthStore((state) => state.auth);
  const navigate = useNavigate();

  console.log(auth);
  const resetAuth = useAuthStore((state) => state.resetAuth);
  useEffect(() => {
    if (!auth.accessToken) {
      navigate("/login");
    }
  }, [navigate, auth]);

  return (
    <div className=" flex h-screen justify-center items-center">
      <h1 className=" font-bold text-xl text-red-400">Hello Dashboard</h1>

      <Button onClick={() => resetAuth()}>Logout</Button>
    </div>
  );
};

export default Dashboard;
