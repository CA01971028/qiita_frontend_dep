import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://qiita-api-dccbbecyhma3dnbe.japaneast-01.azurewebsites.net/special', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          router.push('/login');
        }
      } catch (err) {
        console.error('エラー:', err);
        router.push('/login'); 
      }
    };

    checkAuth();
  }, [router]);
};

export default useAuth;
