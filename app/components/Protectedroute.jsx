"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const logged = localStorage.getItem("loggedIn");

    if (logged !== "true") {
      window.location.replace("/login");
    }
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
}
