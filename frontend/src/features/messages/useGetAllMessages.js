import { useQuery } from '@tanstack/react-query';
import { getMessages } from '../../services/messagesApi.js';

// FETCHING ALL MESSAGES FROM ROOM BACKEND ROUTE get-message/<roomName>
export default function useGetAllMessages(room) {
  const { data, isPending, error } = useQuery({
    queryKey: ['messages', room],
    queryFn: () => getMessages(room),
  });
  // console.log("DATA IN HOOK ", data);

  return { data, isPending, error };
}
