import { useMutation } from "@tanstack/react-query";
import { loginToRoom } from "../../services/roomsApi";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: loginRoom, isPending: isLogingIn } = useMutation({
    mutationFn: (data) => loginToRoom(data),
    onSuccess: (data) => {
      console.log("SUCESS", data);

      const { token, room, name } = data;

      localStorage.setItem("authToken", token);

      navigate(`/room/${room}/${name}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });
  return { loginRoom, isLogingIn };
}
