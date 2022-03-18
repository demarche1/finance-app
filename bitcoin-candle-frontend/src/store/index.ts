import { createStore } from "vuex";
import { CandleStore } from "./modules/CandleModule";

export default createStore({
  modules: {
    CandleStore,
  },
});
