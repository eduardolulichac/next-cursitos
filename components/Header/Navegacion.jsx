import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const Navegacion = ({ estaLogeado }) => {
  const [localPath, setLocalPath] = useState("");

  useEffect(() => {
    setLocalPath(Router.router.asPath);
  }, []);

  const classPath = (path) => {
    return "nav-item", localPath === path ? "active" : "";
  };
  return (
    <ul className="navbar-nav m-auto">
      <li className={classPath("/")}>
        <Link href="/">
          <a className="nav-link">Inicio</a>
        </Link>
      </li>
      <li className={classPath("/populares")}>
        <Link href="/populares">
          <a className="nav-link">Populares</a>
        </Link>
      </li>
      {estaLogeado && (
        <li className={classPath("/nuevo-curso")}>
          <Link href="/nuevo-curso">
            <a className="nav-link">Nuevo Curso</a>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Navegacion;
