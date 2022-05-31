import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import { es } from "date-fns/locale";

import Layout from "../../Layout";
import { useCurso } from "../../hooks/useCurso";

import firebase from "../../firebase";

const Curso = ({ curso }) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const {
    miCurso,
    usuario,
    mensaje,
    loaderComentario,
    loaderMeGusta,
    loaderEliminar,
    comentarioChange,
    agregarComentario,
    votarCurso,
    eliminarCurso,
  } = useCurso(id, curso);

  const {
    nombre,
    creado,
    urlImage,
    url,
    votos,
    empresa,
    descripcion,
    comentarios,
    creador,
  } = miCurso;

  console.log("mira el loader Comentario", loaderComentario);
  const puedoEliminarCurso = () => {
    if (!usuario) return false;
    if (creador.id === usuario.uid) return true;
  };

  return (
    <Layout textTitle={`Curso con id ${id}`} urlImage={urlImage}>
      <section className="row">
        <div className="col-md-12 mt-4">
          <h4 className="text-center">{nombre}</h4>
        </div>
        <div className="col-md-6">
          <small className="text-muted">
            Publicado hace{" "}
            {formatDistanceToNow(new Date(creado), { locale: es })}
          </small>
          <img src={urlImage} className="img-fluid" alt={nombre} />
          {usuario && (
            <>
              <h4 className="mt-2">Agregar comentario</h4>
              <form className="row" onSubmit={agregarComentario}>
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control"
                    name="mensaje"
                    value={mensaje}
                    onChange={comentarioChange}
                  />
                </div>
                <div className="col-3">
                  <button type="submit" className="btn btn-primary btn-block">
                    Agregar
                    {loaderComentario && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      ></span>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          <h4 className="mt-3">Comentarios</h4>
          {comentarios.length === 0 ? (
            <p>Se el primero en dejar tu comentario</p>
          ) : (
            <ul className="list-group">
              {comentarios.map((comentario, index) => (
                <li key={index} className="list-group-item">
                  {comentario.mensaje}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <div className="mt-4">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  type="button"
                  className="btn btn-info"
                >
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>{" "}
                  ir a la página oficial
                </a>
              </div>
              <div className="mt-3">
                {usuario && (
                  <button
                    type="button"
                    className="btn btn-danger mr-2"
                    onClick={votarCurso}
                  >
                    Me gusta{" "}
                    <i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
                  </button>
                )}

                {loaderMeGusta ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                ) : (
                  <span
                    className="badge badge-primary"
                    style={{ fontSize: "20px" }}
                  >
                    {votos} <i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
                  </span>
                )}
              </div>
              <div></div>
            </div>
            <div className="col-12 mt-2">
              <h4>
                Descripción{" "}
                <small className="text-muted">(empresa: {empresa})</small>
              </h4>
              <small className="text-muted">(publicado por : eduardo)</small>
              <p>{descripcion}</p>
            </div>
            <div className="col-md-12">
              {puedoEliminarCurso() && (
                <button
                  className="btn btn-danger btn-block"
                  onClick={eliminarCurso}
                >
                  Eliminar Producto{" "}
                  {loaderEliminar && (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Curso;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const doc = await firebase.db.collection("cursos").doc(id);

  const curso = await doc.get();

  return {
    props: {
      curso: curso.data(),
    },
  };
}
