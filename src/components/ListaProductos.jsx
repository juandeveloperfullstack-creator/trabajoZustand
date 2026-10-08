import { useEffect, useState } from "react";
import { useCarritoStore } from "../store/useCarritoStore";

function ListaProductos() {

  const [productos, setProductos] = useState([]);

  const agregarProducto = useCarritoStore(
    (state) => state.agregarProducto
  );

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="panel">
      <h2>Productos</h2>

      {productos.map((producto) => (
        <div key={producto.id} className="fila">

          <div>
            {/* title en lugar de nombre */}
            <p className="fila-nombre">
              {producto.title}
            </p>

            <p className="fila-detalle">
              ${producto.price.toLocaleString("es-CO")}
            </p>
          </div>

          <button
            className="btn btn-primario"
            onClick={() =>
              agregarProducto({
                id: producto.id,
                nombre: producto.title,
                precio: producto.price,
              })
            }
          >
            Agregar
          </button>

        </div>
      ))}
    </section>
  );
}

export default ListaProductos;