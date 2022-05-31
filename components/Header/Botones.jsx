import React from "react";
import Link from "next/link";

const Botones = ({ estaLogeado, cerrar }) => {
  return (
    <>
      {estaLogeado ? (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <p className="nav-link m-0">
              <strong>Hola: eduardo </strong>
            </p>
          </li>
          <li className="nav-item">
            <button className="mt-1 btn btn-danger btn-sm" onClick={cerrar}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-1">
            <Link href={"/login"}>
              <button className="mt-1 btn btn-success btn-sm">Login</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link href={"/crear-cuenta"}>
              <button className="mt-1 btn btn-info btn-sm">Crear cuenta</button>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Botones;
