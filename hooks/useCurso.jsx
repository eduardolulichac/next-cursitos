import { useState, useContext } from "react";
import Router from "next/router";

import { FirebaseContext } from "../firebase";
import { AuthContext } from "../context/auth";

export const useCurso = (id, curso) => {
  const [miCurso, setMicurso] = useState(curso);
  const [comentario, setComentario] = useState({});
  const [loaderComentario, setLoaderComentario] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [loaderMeGusta, setLoaderMeGusta] = useState(false);
  const [loaderEliminar, setLoaderEliminar] = useState(false);

  const { firebase } = useContext(FirebaseContext);
  const { state } = useContext(AuthContext);

  const { comentarios, votos, votantes, creador, nombreImage } = miCurso;

  const obtenerCurso = async () => {
    const cursoQuery = await firebase.db.collection("cursos").doc(id);
    const curso = await cursoQuery.get();
    if (curso.exists) {
      setMicurso(curso.data());
    }
  };

  const comentarioChange = (e) => {
    setMensaje(e.target.value);
    setComentario({ ...comentario, [e.target.name]: e.target.value });
  };

  const agregarComentario = async (e) => {
    e.preventDefault();
    comentario.usuarioId = state.userInfo.uid;
    comentario.usuarioNombre = state.userInfo.displayName;

    const nuevosComentario = [...comentarios, comentario];

    setLoaderComentario(true);

    try {
      await firebase.db
        .collection("cursos")
        .doc(id)
        .update({ ...miCurso, comentarios: nuevosComentario });
      obtenerCurso();
      setMensaje("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderComentario(false);
    }
  };

  const votarCurso = async () => {
    let votosAcumulados = votos + 1;
    if (votantes.includes(state.userInfo.uid)) return;

    const nuevaListaDeVotantes = [...votantes, state.userInfo.uid];

    setLoaderMeGusta(true);

    try {
      await firebase.db.collection("cursos").doc(id).update({
        votos: votosAcumulados,
        votantes: nuevaListaDeVotantes,
      });
      obtenerCurso();
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderMeGusta(false);
    }
  };

  const eliminarCurso = async () => {
    if (!state.userInfo) return Router.push("/");
    if (creador.id !== state.userInfo.uid) return Router.push("/");

    setLoaderEliminar(true);

    console.log('el nombre de la imagen es:', nombreImage);

    try {
      await firebase.db.collection("cursos").doc(id).delete();
      await firebase.storage.ref("cursos").child(nombreImage).delete();
      Router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderEliminar(false);
    }
  };

  return {
    miCurso,
    usuario: state.userInfo,
    mensaje,
    loaderComentario,
    loaderMeGusta,
    loaderEliminar,
    comentarioChange,
    agregarComentario,
    votarCurso,
    eliminarCurso,
  };
};
