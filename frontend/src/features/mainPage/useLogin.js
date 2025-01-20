import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginToRoom } from '../../services/roomsApi';

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: loginRoom, isPending: isLogingIn } = useMutation({
    mutationFn: (data) => loginToRoom(data),
    onSuccess: (data) => {
      // console.log("SUCESS", data);
      // toast.success("Login sucesfull");

      const { token, room, name } = data;

      localStorage.setItem('authToken', token);

      navigate(`/room/${room}/${name}`);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });
  return { loginRoom, isLogingIn };
}
