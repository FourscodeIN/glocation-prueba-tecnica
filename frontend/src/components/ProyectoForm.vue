<template>
  <form @submit.prevent="submitProyecto" class="form">
    <input
      v-model="form.nombre"
      :class="{ 'is-invalid': intentado && !form.nombre.trim() }"
      placeholder="Nombre del proyecto"
    />

    <select v-model="form.estado" :class="{ 'is-invalid': intentado && !form.estado }">
      <option value="">Seleccionar estado</option>
      <option value="Pendiente">Pendiente</option>
      <option value="En progreso">En progreso</option>
      <option value="Finalizado">Finalizado</option>
    </select>

    <textarea
      v-model="form.descripcion"
      :class="{ 'is-invalid': intentado && !form.descripcion.trim() }"
      placeholder="Descripción"
    ></textarea>

    <div class="fechas">
      <input
        v-model="form.fechaInicio"
        type="date"
        :class="{ 'is-invalid': intentado && (!form.fechaInicio || fechasInvalidas) }"
      />
      <input
        v-model="form.fechaFin"
        type="date"
        :class="{ 'is-invalid': intentado && (!form.fechaFin || fechasInvalidas) }"
      />
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="exito" class="alert alert-success">{{ exito }}</div>

    <button type="submit">{{ editando ? 'Actualizar' : 'Registrar' }}</button>
    <button v-if="editando" type="button" class="cancelar" @click="cancelarEdicion">
      Cancelar
    </button>
  </form>
</template>

<script setup>
import { useProyectoForm } from '../composables/useProyectoForm'

const props = defineProps({
  proyectoEditar: { type: Object, default: null },
})
const emit = defineEmits(['added', 'updated'])

const {
  form,
  editando,
  error,
  exito,
  intentado,
  fechasInvalidas,
  submitProyecto,
  cancelarEdicion,
} = useProyectoForm(props, emit)
</script>
