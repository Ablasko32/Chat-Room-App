import { useMutation } from "@tanstack/react-query";
import { createRoom } from "../../services/roomsApi.js";

export default function useCreateRoom() {
  const { mutate: createNewRoom, isPending: isCreatingRoom } = useMutation({
    mutationFn: (data) => createRoom(data),
    onSuccess: (res) => {
      console.log("SUCESSS CREATING ROOM", res);
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });
  return { createNewRoom, isCreatingRoom };
}
