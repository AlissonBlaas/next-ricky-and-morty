import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AppProps } from "next/app";
import Image from "next/image";

import "../../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath, router.events]);

  return (
    <div className="global-content">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
        width={350}
        height={140}
        alt="rickandmortylogo"
      />
      {loading ? (
        <h2>loading character info...</h2>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}

export default MyApp;
