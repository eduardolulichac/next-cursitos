import firebase, { FirebaseContext } from "../firebase";
import AuthProvider from "../context/auth";
import CursosState from "../context/cursos/cursosState";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <AuthProvider>
        <CursosState>
          <Component {...pageProps} />
        </CursosState>
      </AuthProvider>
    </FirebaseContext.Provider>
  );
}

export default MyApp;
