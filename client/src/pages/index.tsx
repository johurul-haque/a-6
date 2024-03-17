import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <main className="font-mono text-xl font-medium text-centers pt-20">
      <h1 className="text-xl font-medium">You should not see this page😶‍🌫️</h1>
      Go to{' '}
      <Link href="/dashboard" className="underline">
        /dashboard <span className="sr-only">page</span>
      </Link>
    </main>
  );
}
