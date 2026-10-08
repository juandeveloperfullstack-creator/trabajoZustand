// Importamos la función create, que construye un store de Zustand
import { create } from 'zustand'

// create recibe una función que devuelve el estado inicial y las acciones
export const useCarritoStore = create((set) => ({

  // ===== ESTADO =====
  items: [],

  // ===== ACCIONES =====

  // Agregar producto
  agregarProducto: (producto) =>
    set((state) => {
      const existe = state.items.find(
        (item) => item.id === producto.id
      )

      if (existe) {
        return {
          items: state.items.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        }
      }

      return {
        items: [
          ...state.items,
          { ...producto, cantidad: 1 }
        ],
      }
    }),

  // Disminuir cantidad
  disminuirCantidad: (id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0),
    })),

  // Eliminar producto completamente
  eliminarProducto: (id) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.id !== id
      ),
    })),

  // Vaciar carrito
  vaciarCarrito: () =>
    set({
      items: [],
    }),

}))