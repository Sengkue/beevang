<template>
  <v-card class="px-5 pt-2">
    <div>
      <h2>ສິນຄ້າຍອດນິຍົມພາຍໃນປີ {{ currentYear }}</h2>
    </div>
    <v-card elevation="1">
      <pie
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: {
    chartId: {
      type: String,
      default: 'pie-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentYear:null,
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.currentYear = new Date().getFullYear()
        const response = await fetch(
          `http://localhost:2023/sale_detail/sale-details/summary?year=${this.currentYear}&limit=10`
        )
        const data = await response.json()
        this.updateChartData(data)
      } catch (error) {
        this.$toast.error('Error fetching data:', error)
      }
    },
    updateChartData(data) {
      this.chartData.labels = data.result.map((item) => item.productName)
      this.chartData.datasets[0].backgroundColor = data.result.map(() =>
        this.getRandomColor()
      )
      this.chartData.datasets[0].data = data.result.map(
        (item) => item.totalSalePrice
      )
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
  },
}
</script>

<style scoped>
/* Add any custom styles for the component */
</style>
