import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteMessages } from '../../services/messagesApi';

export default function useDeleteAllMessages() {
  const queryClient = useQueryClient();

  const { mutate: deleteAllMessages, isPending: isDeletingMessages } =
    useMutation({
      mutationFn: (room) => deleteMessages(room),
      onSuccess: () => {
        queryClient.invalidateQueries(['messages']);
      },
      onError: (err) => {
        console.error(err);
        toast.error(err.message);
      },
    });
  return { deleteAllMessages, isDeletingMessages };
}
