<template>
  <apexchart
    width="500"
    type="bar"
    :options="chartOptions"
    :series="seriesCharts"
  ></apexchart>
</template>

<script lang="ts">
import { Candle } from "@/models/Candle";
import { Vue, Options } from "vue-class-component";
import VueApexCharts from "vue3-apexcharts";

Options({
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    candles: [] as Candle[],
  },
  watch: {
    _candles(val) {
      this.candles = val;
    },
  },
});
export default class CandleStickChart extends Vue {
  private candles = [] as Candle[];

  get propCandles(): Candle[] {
    return this.candles;
  }

  chartOptions = {
    chart: {
      type: "candleStick",
      height: 350,
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

  seriesCharts = [
    {
      data: this.propCandles,
    },
  ];
}
</script>
<style lang=""></style>
