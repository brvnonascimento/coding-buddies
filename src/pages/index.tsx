import { useSession } from 'next-auth/client';

const Home = () => {
  const [session, loading] = useSession();

  if (loading) {
    return 'Loading...';
  }

  if (session) {
    return 'Logged In';
  }

  return (
    <main>
      <h1>Login</h1>

      <section>
        <form>
          <label id="email">E-mail</label>
          <input id="email" />

          <label id="password">Password</label>
          <input id="password" type="password" />

          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
};

export default Home;
