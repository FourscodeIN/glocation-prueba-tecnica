import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart } from 'chart.js/auto'
import { obtenerGraficoProyectos } from '../services/proyectosService'

export function useGraficoProyectos(props) {
  const graficoRef = ref(null)
  let chart = null

  const cargarGrafico = async () => {
    try {
      const { data } = await obtenerGraficoProyectos()
      if (!data || data.length === 0) return

      const labels = data.map((d) => d.estado)
      const valores = data.map((d) => parseInt(d.cantidad))

      if (chart) chart.destroy()

      chart = new Chart(graficoRef.value, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Cantidad de proyectos',
              data: valores,
              backgroundColor: ['#3C008C', '#009EE2', '#5C00E9'],
              borderColor: '#fff',
              borderWidth: 1,
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      })
    } catch (error) {
      console.error('Error cargando gráfico:', error)
    }
  }

  onMounted(cargarGrafico)
  onBeforeUnmount(() => chart && chart.destroy())
  watch(() => props.refreshKey, cargarGrafico)

  return {
    graficoRef,
    cargarGrafico,
  }
}
