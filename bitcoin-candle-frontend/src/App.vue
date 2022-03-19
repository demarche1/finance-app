<template>
  <CandleStickChart :candles="candles" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import store from "@/store";
import { CandleStore } from "@/store/modules/CandleStore";
import CandleStickChart from "@/components/CandleStickChart.vue";

@Options({
  components: {
    CandleStickChart,
  },
})
export default class App extends Vue {
  candleModule = getModule(CandleStore, store);

  async created(): Promise<void> {
    await this.candleModule.loadCandles();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get candles(): any {
    return this.candleModule.$candles;
  }
}
</script>

<style></style>
