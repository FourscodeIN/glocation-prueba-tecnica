<template>
  <div class="container">
    <h1>Gestión de Proyectos</h1>

    <ProyectoForm
      :proyectoEditar="proyectoSeleccionado"
      @added="refreshAll"
      @updated="refreshAll"
    />
    <ProyectoTable
      :proyectos="proyectos"
      @refresh="refreshAll"
      @edit="seleccionarProyecto"
      @analizar="prepararAnalisis"
    />

    <GraficoProyectos :refreshKey="refreshKey" />

    <div class="text-center mt-3">
      <button class="btn btn-outline-primary" @click="refreshAll">🔄 Actualizar todo</button>
    </div>

    <!-- Generar resumen IA -->
    <div class="card mt-4 p-3" ref="iaCard">
      <h4>Generar resumen con IA</h4>
      <textarea
        v-model="descripcionIA"
        class="form-control"
        rows="4"
        placeholder="Escribe una descripción del proyecto para resumir..."
        ref="descripcionTextarea"
      ></textarea>
      <div class="d-flex gap-2 mt-3">
        <button class="btn btn-primary" @click="generarResumen">Generar resumen</button>
        <button class="btn btn-secondary" @click="limpiar">Limpiar</button>
      </div>

      <div v-if="resumenIA" class="alert alert-success mt-3">
        <strong>Resumen generado:</strong> {{ resumenIA }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import ProyectoForm from '../components/ProyectoForm.vue'
import ProyectoTable from '../components/ProyectoTable.vue'
import GraficoProyectos from '../components/GraficoProyectos.vue'
import { listarProyectos, generarResumenIA } from '../services/proyectosService'

const proyectos = ref([])
const refreshKey = ref(0)
const proyectoSeleccionado = ref(null)

// IA
const descripcionIA = ref('')
const resumenIA = ref('')

// refs para scroll y foco
const descripcionTextarea = ref(null)
const iaCard = ref(null)

const loadProyectos = async () => {
  try {
    const { data } = await listarProyectos()
    proyectos.value = data
  } catch (error) {
    console.error('Error cargando proyectos:', error)
  }
}

const refreshAll = async () => {
  await loadProyectos()
  refreshKey.value++
  proyectoSeleccionado.value = null
}

const seleccionarProyecto = (p) => {
  proyectoSeleccionado.value = p
}

// prepara la descripcion y muestra/scroll al formulario
const prepararAnalisis = async (proyecto) => {
  // intentar usar campos posibles: descripcion || detalle || description
  descripcionIA.value = proyecto.descripcion ?? proyecto.detalle ?? proyecto.description ?? ''
  resumenIA.value = ''

  // asegurar que el DOM actualice y luego hacer scroll/focus
  await nextTick()
  // desplaza al contenedor del formulario si existe
  if (iaCard.value?.scrollIntoView) {
    iaCard.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
  // dar foco al textarea
  if (descripcionTextarea.value?.focus) descripcionTextarea.value.focus()
}

const generarResumen = async () => {
  if (!descripcionIA.value.trim()) {
    alert('Por favor ingresa una descripción antes de generar el resumen.')
    return
  }

  try {
    resumenIA.value = 'Generando resumen... 🧠'
    const { data } = await generarResumenIA(descripcionIA.value)
    resumenIA.value = data.resumen
  } catch (error) {
    console.error('Error generando resumen con IA:', error)
    resumenIA.value = 'Ocurrió un error al generar el resumen.'
  }
}

const limpiar = () => {
  descripcionIA.value = ''
  resumenIA.value = ''
}

onMounted(loadProyectos)
</script>