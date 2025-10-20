import { eliminarProyecto } from '../services/proyectosService'

export function useProyectoTable(emit) {
  const eliminar = async (id) => {
    try {
      await eliminarProyecto(id)
      emit('refresh')
    } catch (error) {
      console.error('Error eliminando proyecto:', error)
    }
  }

  const editar = (proyecto) => {
    emit('edit', proyecto)
  }

  return { eliminar, editar }
}