import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useRouter() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      backtoback:() => navigate(-2),
      forward: () => navigate(1),
      refresh: () => navigate(0),
      push: (href) => navigate(href),
      replace: (href, state) => navigate(href, { state, replace: true }),
    }),
    [navigate]
  );

  return router;
}