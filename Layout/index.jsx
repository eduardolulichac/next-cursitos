import React from "react";
import Head from "next/head";
import Header from "../components/Header";

const origin = typeof window === "undefined" ? "" : window.location.origin;

const Layout = ({ children, textTitle = "Cursos Academia", urlImage }) => {
  const urlImageMeta = urlImage ? urlImage : `${origin}/academiaMoviles.png`;

  return (
    <>
      <Head>
        <title>{textTitle}</title>
        <meta name="description" content={`Info sober ${textTitle}`} />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={textTitle} />
        <meta property="og:description" content={`Info sober ${textTitle}`} />
        <meta property="og:image" content={urlImageMeta} />
      </Head>
      <Header />
      <main className="container">{children}</main>
    </>
  );
};

export default Layout;
