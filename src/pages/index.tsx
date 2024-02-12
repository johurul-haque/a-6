import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <main className="font-mono text-xl font-medium">
      <h1>You should not see this page😶‍🌫️</h1>
      Go to <Link href="/dashboard">dashboard page</Link>
    </main>
  );
}
