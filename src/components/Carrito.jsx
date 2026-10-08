// Importamos el hook del store
import { useCarritoStore } from "../store/useCarritoStore";

// Definimos el componente Carrito
function Carrito() {

  // Leemos el estado y las acciones del store
  const items = useCarritoStore((state) => state.items);

  const agregarProducto = useCarritoStore(
    (state) => state.agregarProducto
  );

  const disminuirCantidad = useCarritoStore(
    (state) => state.disminuirCantidad
  );

  const vaciarCarrito = useCarritoStore(
    (state) => state.vaciarCarrito
  );

  // Calculamos el total del carrito
  const total = items.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  // Si el carrito está vacío
  if (items.length === 0) {
    return (
      <section className="panel">
        <h2>Carrito</h2>
        <p className="vacio">Tu carrito está vacío</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2>Carrito</h2>

      {items.map((item) => (
        <div key={item.id} className="fila">

          <div>
            <p className="fila-nombre">
              {item.nombre}
            </p>

            {/* Subtotal por producto */}
            <p className="fila-detalle">
              {item.cantidad} x $
              {item.precio.toLocaleString("es-CO")}
              {" = $"}
              {(item.precio * item.cantidad).toLocaleString("es-CO")}
            </p>
          </div>

          <div>
            <button
              className="btn btn-secundario"
              onClick={() => disminuirCantidad(item.id)}
            >
              -
            </button>

            <span style={{ margin: "0 10px" }}>
              {item.cantidad}
            </span>

            <button
              className="btn btn-primario"
              onClick={() => agregarProducto(item)}
            >
              +
            </button>
          </div>

        </div>
      ))}

      <div className="total">
        <span>Total</span>
        <strong>
          ${total.toLocaleString("es-CO")}
        </strong>
      </div>

      <button
        className="btn btn-secundario btn-bloque"
        onClick={vaciarCarrito}
      >
        Vaciar carrito
      </button>

    </section>
  );
}

export default Carrito;