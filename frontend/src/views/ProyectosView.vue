<template>
  <div class="page-wrapper">
    <h2>Gestión de Proyectos</h2>

    <!-- Formulario -->
    <form @submit.prevent="guardarProyecto">
      <input v-model="nuevoProyecto.nombre" placeholder="Nombre" required />
      <input v-model="nuevoProyecto.descripcion" placeholder="Descripción" required />
      <select v-model="nuevoProyecto.estado" required>
        <option>Pendiente</option>
        <option>En progreso</option>
        <option>Completado</option>
      </select>
      <button type="submit">Guardar</button>
    </form>

    <!-- Tabla -->
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in proyectos" :key="p.id">
          <td>{{ p.nombre }}</td>
          <td>{{ p.estado }}</td>
          <td><button @click="eliminar(p.id)">🗑️</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { listarProyectos, crearProyecto, eliminarProyecto } from '@/services/proyectosService'

export default {
  data() {
    return {
      proyectos: [],
      nuevoProyecto: { nombre: '', descripcion: '', estado: 'Pendiente' },
    }
  },
  async mounted() {
    await this.cargarProyectos()
  },
  methods: {
    async cargarProyectos() {
      const { data } = await listarProyectos()
      this.proyectos = data
    },
    async guardarProyecto() {
      await crearProyecto(this.nuevoProyecto)
      this.nuevoProyecto = { nombre: '', descripcion: '', estado: 'Pendiente' }
      await this.cargarProyectos()
    },
    async eliminar(id) {
      await eliminarProyecto(id)
      await this.cargarProyectos()
    },
  },
}
</script>
