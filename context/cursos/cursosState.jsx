import { useReducer } from "react";

import CursosContext from "./cursosContext";
import CursosReducer from "./cursosReducer";

import firebase from "../../firebase";

const CursosState = ({ children }) => {
  const initialState = {
    addCursoOk: false,
    loadingAddCurso: false,
    errorAddCurso: null,

    // LIDATADO DE CURSOS
    cursos: null,
  };

  const crearCursoContext = async (curso) => {
    dispatch({
      type: "LOADING_ADD_CURSO",
    });
    try {
      await firebase.db.collection("cursos").add(curso);
      dispatch({
        type: "ADD_CURSO_OK",
      });
    } catch (error) {
      dispatch({
        type: "ADD_CURSO_ERROR",
      });
      console.log(error);
    }
  };

  const listarCursosContext = async () => {
    const doc = await firebase.db.collection("cursos").get();
    const cursos = [];

    doc.forEach((curso) => cursos.push({ id: curso.id, ...curso.data() }));

    console.log("los cursos son : ", cursos);
    dispatch({
      type: "LISTADO",
      payload: cursos,
    });
  };

  const [state, dispatch] = useReducer(CursosReducer, initialState);
  const value = {
    addCursoOk: state.addCursoOk,
    cursos: state.cursos,
    crearCursoContext,
    listarCursosContext,
  };

  return (
    <CursosContext.Provider value={value}>{children}</CursosContext.Provider>
  );
};

export default CursosState;
