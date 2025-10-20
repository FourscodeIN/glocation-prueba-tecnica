<template>
  <div class="grafico-container">
    <h3>Distribución de proyectos por estado</h3>
    <canvas ref="graficoRef"></canvas>
  </div>
</template>

<script setup>
import { useGraficoProyectos } from '../composables/useGraficoProyectos'

const props = defineProps({
  refreshKey: { type: Number, default: 0 },
})

const { graficoRef } = useGraficoProyectos(props)
</script>
