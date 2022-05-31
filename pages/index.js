// import { useContext, useEffect } from "react";
import Layout from "../Layout";

// import CursosContext from "../context/cursos/cursosContext";
import CardCurso from "../components/CardCurso";

import firebase from "../firebase";

export default function Home({ cursos }) {
  // console.log("los props de mi componente son: ");
  // console.log(props);

  // const { listarCursosContext, cursos } = useContext(CursosContext);

  // useEffect(() => {
  //   listarCursosContext();
  // }, []);

  return (
    <Layout textTitle="Cursos de academia moviles">
      <div className="row mt-4">
        {cursos &&
          cursos.map((curso) => <CardCurso key={curso.id} curso={curso} />)}
      </div>
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  const doc = await firebase.db.collection("cursos").get();
  const cursos = [];

  doc.forEach((curso) => cursos.push({ id: curso.id, ...curso.data() }));

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      saludando: "Hola mundo",
      cursos,
    },
  };
}
