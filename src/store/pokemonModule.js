import axios from "axios";

export const pokemonModule = {
  state: () => ({
    pokemonsList: [],
    isLoading: false,
    selectedSort: '',
    offset: 0,
    limit: 6,
    next: null,
    previous: null,
    sortOptions: [
      {value: 'hp', name: 'hp'},
      {value: 'attack', name: 'attack'},
      {value: 'defense', name: 'defense'},
    ]
  }),
  getters: {
    getSortedList(state) {
      console.log('state.selectedSort',state.selectedSort)
      if(state.selectedSort) {
        return [...state.pokemonsList]
          // .sort((a, b) => a.stats[state.selectedSort]?.localeCompare(b.stats[state.selectedSort]))
      } else {
        return state.pokemonsList
      }
    },
    // getSortedAndSearchedList(state, getters) {
    //   return getters.getSortedList.filter(item => item.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    // }
  },
  mutations: {
    setPokemons(state, pokemonsList) {
      state.pokemonsList = pokemonsList
    },
    setNext(state, next) {
      state.next = next
    },
    setPrevious(state, previous) {
      state.previous = previous
    },
    setLoading(state, bool) {
      state.isLoading = bool
    },
    setPage(state, page) {
      state.page = page
    },
    setSelectedSort(state, selectedSort) {
      console.log(selectedSort)
      state.selectedSort = selectedSort
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    // setSearchQuery(state, searchQuery) {
    //   state.searchQuery = searchQuery
    // },
  },
  actions: {
    async fetchPokemons({state, commit, dispatch}, params) {
      try {
        commit('setLoading', true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
          params: {
            _offset: state.offset,
            _limit: state.limit
          }
        });
        const pokemonsList = response?.data?.results ?? [];
        commit('setNext', response?.data?.next ?? [])
        commit('setPrevious', response?.data?.previous ?? [])
        dispatch('fetchPokemonItem', pokemonsList)
      } catch (e) {
        console.log(e)
      } finally {

      }
    },
    async fetchPokemonItem({state, commit}, params) {
      const requests = params.map(pokemon => axios.get(pokemon.url));
      const results = await Promise.allSettled(requests)
      const list = results.map(p => {
        const values = p?.value?.data;
        // console.log(values)
        const stats = {};
        values?.stats.forEach(stat => stats[stat.stat.name] = stat.base_stat)
        return {
          name: values?.name,
          sprites: values?.sprites?.back_default,
          stats
        }
      })
      console.log(list)
      commit('setPokemons', [...state.pokemonsList, ...list])
    },
    async fetchMorePokemons({state, commit, dispatch}) {
      try {
        if(state.next) {
          commit('setPage', state.page + 1)
          const response = await axios.get(state.next);
          dispatch('fetchPokemonItem', response.data.results)
          commit('setNext', response?.data?.next ?? [])
          commit('setPrevious', response?.data?.previous ?? [])
          commit('setLoading', false);
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  namespaced: true
}