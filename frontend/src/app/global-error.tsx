'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Stale client bundle referencing a Server Action ID from an old
    // build/tab — reload once to pick up the current build instead of
    // leaving the user on a dead page.
    // https://nextjs.org/docs/messages/failed-to-find-server-action
    if (error.message?.includes('Failed to find Server Action')) {
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <p>Something went wrong. Reloading the page usually fixes this.</p>
          <button type="button" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
