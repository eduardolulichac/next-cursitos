import React, { createContext, useReducer } from "react";
import Cookies from "js-cookie";
import firebase from "../../firebase";

export const AuthContext = createContext();

const initialState = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_CREATE":
    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_CLOSE":
      return { ...state, userInfo: null };

    default:
      return state;
  }
}

const AuthProvider = ({ children }) => {
  const crear = async (nombre, email, password) => {
    const nuevoUsuario = await firebase.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await nuevoUsuario.user.updateProfile({ displayName: nombre });

    Cookies.set("userInfo", JSON.stringify(nuevoUsuario.user));

    dispatch({
      type: "USER_CREATE",
      payload: nuevoUsuario.user,
    });
  };

  const iniciar = async (email, password) => {
    const resultado = await firebase.auth.signInWithEmailAndPassword(
      email,
      password
    );

    Cookies.set("userInfo", JSON.stringify(resultado.user));

    dispatch({
      type: "USER_LOGIN",
      payload: resultado.user,
    });
  };

  const cerrar = async () => {
    await firebase.auth.signOut();

    Cookies.remove("userInfo");

    dispatch({
      type: "USER_CLOSE",
    });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, crear, iniciar, cerrar };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
