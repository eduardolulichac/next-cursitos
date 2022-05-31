import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "../firebase";

import Layout from "../Layout";
import CardCurso from "../components/CardCurso";

export default function Buscar({ cursos }) {
  const [resultado, setResultado] = useState([]);

  const router = useRouter();
  const {
    query: { q },
  } = router;

  useEffect(() => {
    if (cursos && cursos.length > 0) {
      if (q) {
        const busqueda = q.toLowerCase();
        const filtro = cursos.filter((curso) => {
          return (
            curso.nombre.toLowerCase().includes(busqueda) ||
            curso.descripcion.toLowerCase().includes(busqueda)
          );
        });
        setResultado(filtro);
      }
    }
  }, [q, cursos]);

  return (
    <Layout>
      <div className="row mt-4">
        {resultado.length > 0 ? (
            resultado.map((curso) => <CardCurso key={curso.id} curso={curso} />)
        ) : (
          <div className="alert alert-warning">
            Por el momento no tenemos este curso disponible
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const doc = await firebase.db.collection("cursos").get();
  const cursos = [];

  doc.forEach((curso) => cursos.push({ id: curso.id, ...curso.data() }));

  return {
    props: {
      saludando: "Hola mundo",
      cursos,
    },
  };
}
