import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RecordRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/list/all', { replace: true });
  }, [navigate]);

  return null;
}

export default RecordRedirect;