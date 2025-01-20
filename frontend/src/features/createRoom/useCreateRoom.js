import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createRoom } from '../../services/roomsApi.js';

export default function useCreateRoom() {
  const { mutate: createNewRoom, isPending: isCreatingRoom } = useMutation({
    mutationFn: (data) => createRoom(data),
    onSuccess: () => {
      // console.log("SUCESSS CREATING ROOM", res);
      toast.success('Room created');
    },
    onError: (err) => {
      console.error('ERROR', err);
      toast.error(err.message);
    },
  });
  return { createNewRoom, isCreatingRoom };
}
