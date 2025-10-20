import api from './api'

// Listar todos los proyectos
export const listarProyectos = () => api.get('/proyectos')

// Crear un nuevo proyecto
export const crearProyecto = (data) => api.post('/proyectos', data)

// Actualizar un proyecto
export const actualizarProyecto = (id, data) => api.put(`/proyectos/${id}`, data)

// Eliminar un proyecto
export const eliminarProyecto = (id) => api.delete(`/proyectos/${id}`)

// Obtener datos para gráficos
export const obtenerGraficoProyectos = () => api.get('/proyectos/graficos')

// Generar resumen con IA
export const generarResumenIA = (descripcion) => 
  api.post('/proyectos/analisis', { descripcion })
