import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../config/axios';
import Spinner from './Spinner';

// COMPARES DATA STORED IN LOCAL STORAGE WITH PARAMS OF ACESSED URL AND REDIRECTS OR LETS GO
// BACKEND ROUTE IS VERIFY JWT

function ProtectedRoute({ children }) {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { room, name } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function verifyJWT() {
      // console.log(token);
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token not found');

        const axiosRes = await axiosClient.post('/verify-jwt', {
          token,
          paramData: { roomName: room, name },
        });

        if (axiosRes.status === 200) {
          setAuth(true);
        } else {
          throw new Error('JWT auth failed');
        }
      } catch (err) {
        console.error(err.message);
        setAuth(false);
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    }
    verifyJWT();
  }, [name, room, navigate]);

  // Better loader required
  if (isLoading) return <Spinner />;

  if (isAuth) return children;

  return null;
}

export default ProtectedRoute;
