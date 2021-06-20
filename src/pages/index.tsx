import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const [session, loading] = useSession();

  if (loading) {
    return 'Loading...';
  }

  if (!session) {
    return router.push('/api/auth/signin');
  }

  return (
    <main>
      <h1>Logged In</h1>

      <button onClick={() => signOut()}>Logout</button>
    </main>
  );
};

export default Home;
