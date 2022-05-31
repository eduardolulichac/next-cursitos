import { useState, useContext, useEffect } from "react";
import Botones from "./Botones";
import Buscador from "./Buscador";
import Navegacion from "./Navegacion";

import { AuthContext } from "../../context/auth";

const Header = () => {
  const [estaLogeado, setEstaLogeado] = useState(false);
  const { state, cerrar } = useContext(AuthContext);

  useEffect(() => {
    if (state.userInfo) {
      setEstaLogeado(true);
    } else {
      setEstaLogeado(false);
    }
  }, [state]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Logo
      </a>
      <div className="collapse navbar-collapse">
        <Buscador />
        <Navegacion estaLogeado={estaLogeado} />
        <Botones estaLogeado={estaLogeado} cerrar={() => cerrar()} />
      </div>
    </nav>
  );
};

export default Header;
