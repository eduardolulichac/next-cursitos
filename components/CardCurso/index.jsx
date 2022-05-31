/* eslint-disable @next/next/no-img-element */
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

import Link from "next/link";

const CardCurso = ({ curso }) => {
  const { id, nombre, comentarios, creado, descripcion, votos, urlImage } =
    curso;

  return (
    <div className="col-md-4 mb-3">
      <div className="card ">
        <img className="card-img-top" src={urlImage} alt={nombre} />
        <div className="card-body">
          <Link href={"cursos/[id]"} as={`cursos/${id}`}>
            <h5 className="card-title" style={{ cursor: "pointer" }}>
              {nombre}
            </h5>
          </Link>
          <p className="card-text">{descripcion}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <div style={{ color: "rgb(73, 92, 255)" }}>
              {" "}
              <i className="fa fa-comments" aria-hidden="true"></i>{" "}
              {comentarios.length}
              comentarios
            </div>
            <div style={{ color: "rgb(255, 60, 60)" }}>
              {" "}
              <i className="fa fa-heart" aria-hidden="true"></i> {votos} me
              gusta
            </div>
          </li>
        </ul>
        <div className="card-footer">
          <small className="text-muted">
            Publicado hace{" "}
            {formatDistanceToNow(new Date(creado), { locale: es })}
          </small>
        </div>
      </div>
    </div>
  );
};

export default CardCurso;
