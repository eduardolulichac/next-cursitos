import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth";
import Layout from "../Layout";
import { useValidation } from "../hooks/useValidation";
import { validarLogin } from "../utils/validaciones";
import ErrorInput from "../components/ErrorInput";

const intialState = {
  email: "",
  password: "",
};

const login = () => {
  const [valores, errores, handleChange, handleSubmit] = useValidation(
    intialState,
    validarLogin,
    () => iniciarSesion()
  );

  const router = useRouter();

  const { iniciar } = useContext(AuthContext);

  const iniciarSesion = async () => {
    const { email, password } = valores;
    await iniciar(email, password);
    router.push("/");
  };

  return (
    <Layout textTitle="inicio de sesión">
      <h1 className="text-center">Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit}
        noValidate={true}
        style={{ maxWidth: "30em", margin: "0px auto" }}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Correo</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
            value={valores.email}
          />
          {errores.email && <ErrorInput text={errores.email} />}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
            value={valores.password}
          />
          {errores.password && <ErrorInput text={errores.password} />}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            iniciar{" "}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default login;
