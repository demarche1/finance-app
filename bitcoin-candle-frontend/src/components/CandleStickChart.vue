<template>
  <apexchart
    type="candlestick"
    height="350"
    :options="chartOptions"
    :series="series"
  />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import VueApexCharts from "vue3-apexcharts";
import { Prop } from "vue-property-decorator";

Options({
  components: {
    apexcharts: VueApexCharts,
  },
});
export default class CandleStickChart extends Vue {
  @Prop()
  candles = [];

  chartOptions = {
    chart: {
      id: "candlestick",
      type: "candlestick",
      height: 350,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#52d600",
          downward: "#ed0c13",
        },
      },
    },
    title: {
      text: "Bitcoin last prices",
      align: "center",
    },
    xaxis: {
      type: "time",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  get series(): unknown {
    return [
      {
        data: this.candles,
      },
    ];
  }
}
</script>
<style lang=""></style>
