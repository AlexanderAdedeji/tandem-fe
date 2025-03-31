// src/app/_not-found/page.tsx
"use client"; // <-- This makes the page a client component

import React, { useEffect, useState } from 'react';

export default function NotFoundPage() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Now it's safe to reference window because this code runs on the client
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Your screen width is: {width}px</p>
    </div>
  );
}
