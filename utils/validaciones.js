export const validarLogin = (valores) => {
  let errores = {};
  validarEmail(valores.email, errores);
  validarPassword(valores.password, errores);

  return errores;
};

export const validarCrearCuenta = (valores) => {
  let errores = {};
  validarEmail(valores.email, errores);
  validarPassword(valores.password, errores);
  validarNombre(valores.nombre, errores);

  return errores;
};

export const validarCrearCurso = (valores) => {
  let errores = {};
  validarNombre(valores.nombre, errores);
  validarEmpresa(valores.empresa, errores);
  validarUrl(valores.url, errores);
  validarDescripcion(valores.descripcion, errores);

  return errores;
};

const validarEmail = (email, errores) => {
  if (!email) {
    errores.email = "El email es obligatorio";
  } else {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errores.email = "El email no es valido";
    }
  }
};

const validarPassword = (password, errores) => {
  if (!password) {
    errores.password = "La contraseña es obligatoria";
  } else {
    if (password.length < 6) {
      errores.password = "La contraseña debe tener al menos 6 caracteres";
    }
  }
};

const validarNombre = (nombre, errores) => {
  if (!nombre) {
    errores.nombre = " El nombre es obligatorio";
  }
};
const validarEmpresa = (empresa, errores) => {
  if (!empresa) {
    errores.empresa = " La empresa es obligatoria";
  }
};

const validarDescripcion = (descripcion, errores) => {
  if (!descripcion) {
    errores.descripcion = " La descripcion es obligatoria";
  }
};

const validarUrl = (url, errores) => {
  if (!url) {
    errores.url = "La url es obligatoria";
  } else {
    if (!/^(ftp|http|https):\/\/[^"]+$/.test(url)) {
      errores.url = "La url no es valida";
    }
  }
};
