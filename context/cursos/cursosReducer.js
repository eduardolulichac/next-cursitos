const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING_ADD_CURSO":
      return {
        ...state,
        loadingAddCurso: true,
        addCursoOk: false,
        errorAddCurso: null,
      };
    case "ADD_CURSO_OK":
      return {
        ...state,
        addCursoOk: true,
        loadingAddCurso: false,
        errorAddCurso: null,
      };
    case "ADD_CURSO_ERROR":
      return {
        ...state,
        addCursoOk: false,
        loadingAddCurso: false,
        errorAddCurso: "Hubo un error al crear el curso",
      };
    case "LISTADO":
      return {
        ...state,
        cursos: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
