import {createStore} from "vuex";
import {pokemonModule} from "@/store/pokemonModule.js";

export default createStore({
  state: {
    isAuth: false,
  },
  modules: {
    pokemon: pokemonModule
  }
})
