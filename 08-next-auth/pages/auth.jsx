// Built-in imports
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
// Component imports
import AuthForm from "../components/auth/AuthForm";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(
    function () {
      getSession().then((session) => {
        if (session) {
          router.replace("/");
        } else [setIsLoading(false)];
      });
    },
    [router]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
