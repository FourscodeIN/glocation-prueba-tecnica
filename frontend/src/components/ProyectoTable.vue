<template>
  <div class="table-responsive mt-3">
    <table class="table table-striped align-middle">
      <thead class="table-light">
        <tr>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in proyectos" :key="p.id">
          <td>{{ p.nombre }}</td>
          <td>{{ p.estado }}</td>
          <td>{{ p.fechaInicio }}</td>
          <td>{{ p.fechaFin }}</td>
        <td class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary" @click="editar(p)">✏️</button>
          <button class="btn btn-sm btn-outline-danger" @click="eliminar(p.id)">🗑️</button>
          <button class="btn btn-sm btn-outline-success" @click="analizar(p)">🧠</button>
        </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useProyectoTable } from '../composables/useProyectoTable'

defineProps({
  proyectos: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['refresh', 'edit', 'analizar'])
const { eliminar, editar } = useProyectoTable(emit)

// emitir análisis con el objeto completo
const analizar = (proyecto) => {
  emit('analizar', proyecto)
}
</script>