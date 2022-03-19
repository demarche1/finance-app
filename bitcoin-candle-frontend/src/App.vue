<template>
  <CandleStickChart :candles="candles" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import { CandleStore } from "@/store/modules/CandleStore";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import { Candle } from "./models/Candle";
import io from "socket.io-client";
import store from "@/store";
import CandleStickChart from "@/components/CandleStickChart.vue";

@Options({
  components: {
    CandleStickChart,
  },
})
export default class App extends Vue {
  /* eslint-disable @typescript-eslint/no-explicit-any */

  candleModule = getModule(CandleStore, store);
  socket = io("http://localhost:3000");

  async created(): Promise<void> {
    await this.candleModule.loadCandles();

    this.socket.on("newCandle", (msg) => {
      const candle = new Candle(msg);

      this.candleModule.addCandle(candle);

      createToast("New Candle generated", {
        timeout: 2000,
        position: "bottom-right",
        type: "info",
        transition: "slide",
      });
    });
  }

  get candles(): any {
    return this.candleModule.$candles;
  }
}
</script>

<style></style>
