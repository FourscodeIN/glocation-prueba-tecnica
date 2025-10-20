import { ref, computed, watch } from 'vue'
import { crearProyecto, actualizarProyecto } from '../services/proyectosService'

export function useProyectoForm(props, emit) {
  const form = ref({
    id: null,
    nombre: '',
    descripcion: '',
    estado: '',
    fechaInicio: '',
    fechaFin: '',
  })

  const editando = ref(false)
  const error = ref('')
  const exito = ref('')
  const intentado = ref(false)

  const fechasInvalidas = computed(() => {
    if (form.value.fechaInicio && form.value.fechaFin) {
      return new Date(form.value.fechaInicio) > new Date(form.value.fechaFin)
    }
    return false
  })

  watch(
    () => props.proyectoEditar,
    (nuevo) => {
      if (nuevo) {
        form.value = { ...nuevo }
        editando.value = true
        limpiarMensajes()
      }
    },
  )

  const limpiarMensajes = () => {
    error.value = ''
    exito.value = ''
  }

  const limpiarFormulario = () => {
    form.value = {
      id: null,
      nombre: '',
      descripcion: '',
      estado: '',
      fechaInicio: '',
      fechaFin: '',
    }
    editando.value = false
  }

  const validarFormulario = () => {
    let valido = true
    error.value = ''

    if (!form.value.nombre.trim()) valido = false
    if (!form.value.estado) valido = false
    if (!form.value.descripcion.trim()) valido = false
    if (!form.value.fechaInicio || !form.value.fechaFin) valido = false
    if (fechasInvalidas.value) valido = false

    if (!valido) {
      error.value = 'Por favor completa todos los campos correctamente.'
    }

    return valido
  }

  const submitProyecto = async () => {
    intentado.value = true
    limpiarMensajes()

    if (!validarFormulario()) return

    try {
      if (editando.value) {
        await actualizarProyecto(form.value.id, form.value)
        exito.value = 'Proyecto actualizado correctamente.'
        emit('updated')
      } else {
        await crearProyecto(form.value)
        exito.value = 'Proyecto creado correctamente.'
        emit('added')
      }

      limpiarFormulario()
      intentado.value = false
    } catch (err) {
      error.value = 'Error al guardar el proyecto. Verifica los campos.'
      console.error('Error guardando proyecto:', err)
    }
  }

  const cancelarEdicion = () => {
    limpiarFormulario()
    limpiarMensajes()
    intentado.value = false
  }

  return {
    form,
    editando,
    error,
    exito,
    intentado,
    fechasInvalidas,
    submitProyecto,
    cancelarEdicion,
  }
}
