/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import Router from "next/router";
import Layout from "../Layout";

import CursosContext from "../context/cursos/cursosContext";
import { AuthContext } from "../context/auth";
import { FirebaseContext } from "../firebase";

import { useValidation } from "../hooks/useValidation";
import { validarCrearCurso } from "../utils/validaciones";
import ErrorInput from "../components/ErrorInput";

const intialState = {
  nombre: "",
  empresa: "",
  url: "",
  imagen: "",
  descripcion: "",
};

const nuevoCurso = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [nombreImage, setNombreImagen] = useState("");
  const [urlImage, setUrlImage] = useState(null);
  const [loadingUpImage, setLoadingUpImage] = useState(null);

  const [valores, errores, handleChange, handleSubmit] = useValidation(
    intialState,
    validarCrearCurso,
    () => crearCurso()
  );

  const { crearCursoContext } = useContext(CursosContext);
  const { firebase } = useContext(FirebaseContext);
  const { state } = useContext(AuthContext);

  const handleUploadImage = (e) => {
    // console.log(e.target.files[0]);
    const image = e.target.files[0];

    const uploadTask = firebase.storage.ref(`/cursos/${image.name}`).put(image);

    setLoadingUpImage(true);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log("snapShot");
        console.log(snapShot);
      },
      (error) => {
        console.log("error");
        console.log(error);
      },
      (event) => {
        firebase.storage
          .ref("cursos")
          .child(image.name)
          .getDownloadURL()
          .then((filebaseURL) => {
            console.log("la url de la imagen guardada es: ");
            console.log(filebaseURL);
            setLoadingUpImage(false);
            setNombreImagen(image.name);
            setUrlImage(filebaseURL);
          });
      }
    );
  };

  const crearCurso = async () => {
    console.log("vamos al crear el curso", valores);

    const { nombre, empresa, url, descripcion } = valores;

    const curso = {
      nombre,
      empresa,
      url,
      descripcion,
      nombreImage,
      urlImage,
      votos: 0,
      votantes: [],
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: state.userInfo.uid,
        nombre: state.userInfo.displayName,
      },
    };

    await crearCursoContext(curso);
    Router.push("/");
  };

  return (
    <Layout textTitle="nuevo curso">
      <h1 className="text-center">crear nuevo curso</h1>
      <form onSubmit={handleSubmit} className="jumbotron" noValidate={true}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={valores.nombre}
            />
            {errores.nombre && <ErrorInput text={errores.nombre} />}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="empresa">Empresa</label>
            <input
              type="text"
              className="form-control"
              name="empresa"
              onChange={handleChange}
              value={valores.empresa}
            />
            {errores.empresa && <ErrorInput text={errores.empresa} />}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="empresa">Url</label>
            <input
              type="text"
              className="form-control"
              name="url"
              onChange={handleChange}
              value={valores.url}
            />
            {errores.url && <ErrorInput text={errores.url} />}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="archivo">Subir Archivo</label> <br />
            <input
              type="file"
              accept="image/*"
              name="imagen"
              onChange={handleUploadImage}
            />
            {loadingUpImage && (
              <div className="spinner-border text-info">
                <span className="sr-only">Cargando ...</span>
              </div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="exampleFormControlTextarea1">
              Descripción del curso
            </label>
            <textarea
              className="form-control"
              name="descripcion"
              rows="3"
              onChange={handleChange}
              value={valores.descripcion}
            ></textarea>
            {errores.descripcion && <ErrorInput text={errores.descripcion} />}
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            crear curso{" "}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default nuevoCurso;
