import axios from "axios";
import {toPreparePokemonList} from '@/helpers/toPreparePokemonList';

export const pokemonModule = {
  state: () => ({
    pokemonsList: [],
    isLoading: false,
    isError: false,
    selectedSort: '',
    searchQuery: '',
    offset: 20,
    limit: 20,
    currentPage: 1,
    totalPages: 1,
    next: null,
    previous: null,
    selectedType: [],
    sortOptions: [
      {value: 'hp', name: 'hp'},
      {value: 'attack', name: 'attack'},
      {value: 'defense', name: 'defense'},
    ],
    favorite: sessionStorage.favoritePokemons ? JSON.parse(sessionStorage.favoritePokemons) : [],
  }),

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
    setIsError(state, errorText) {
      state.isError = errorText;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    // setSearchQuery(state, searchQuery) {
    //   state.searchQuery = searchQuery
    // },
    setSelectedType(state, selectedType) {
      if(!state.selectedType.includes(selectedType)) {
        state.selectedType = [...state.selectedType, selectedType];
      } else {
        state.selectedType = state.selectedType.filter(type => type !== selectedType);
      }
    },
    setFavorite(state, pokemon) {
      state.favorite = [...state.favorite, pokemon];
      const favoritePokemons = sessionStorage.favoritePokemons ? JSON.parse(sessionStorage.favoritePokemons) : [];
      const savedPokemons = favoritePokemons ? [...favoritePokemons, pokemon] : [pokemon]
      sessionStorage.favoritePokemons = JSON.stringify(savedPokemons);
    },
    deleteFavorite(state, pokemon) {
      state.favorite = state.favorite.filter(p => p.name !== pokemon.name);
      const favoritePokemons = sessionStorage.favoritePokemons ? JSON.parse(sessionStorage.favoritePokemons) : [];
      const savedPokemons = favoritePokemons && favoritePokemons.filter(p => p.name !== pokemon.name);
      sessionStorage.favoritePokemons = JSON.stringify(savedPokemons);
    }
  },
  actions: {
    async fetchPokemons({state, commit, dispatch}) {
      try {
        commit('setLoading', true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
          params: {
            _offset: state.offset,
            _limit: state.limit,
          }
        });
        const pokemonsList = response?.data?.results ?? [];
        // const currentPage = response?.data?.count / state.offset;
        // const totalPages = Math.ceil(response?.data?.count / state.offset);
        commit('setNext', response?.data?.next ?? [])
        // commit('setCurrentPage', currentPage ?? [])
        // commit('setTotalPages', totalPages)
        commit('setPrevious', response?.data?.previous ?? [])
        dispatch('fetchPokemonItem', pokemonsList)
      } catch (e) {
        commit('setIsError', 'something is going wrong, try later')
        console.log(e)
      }
    },
    async fetchPokemonItem({state, commit}, params) {
      const requests = await params.map(pokemon => axios.get(pokemon.url));
      const results = await Promise.allSettled(requests)
      const list = results.map(p => {
        const values = p?.value?.data;
        return toPreparePokemonList(values)
      })
      commit('setPokemons', [...state.pokemonsList, ...list])
    },
    async fetchMorePokemons({state, commit, dispatch}) {
      try {
        if (state.next) {
          const response = await axios.get(state.next);
          const { results, next, previous } = response?.data;
          dispatch('fetchPokemonItem', results ?? '')
          commit('setNext', next ?? '')
          commit('setPrevious', previous ?? '')
        }
      } catch (e) {
        commit('setIsError', 'something is going wrong, try later')
        console.log(e)
      } finally {
        commit('setLoading', false);
      }
    },
    async fetchSearchByName({state, commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${state.searchQuery}`);
        const values = response?.data;
        const list = toPreparePokemonList(values)
        commit('setPokemons', [list])
      } catch (e) {
        commit('setIsError', 'something is going wrong, try later')
        console.log(e)
      } finally {
        commit('setLoading', false);
      }
    },
  },
  getters: {
    getSortedList(state) {
        const sorted = [...state.pokemonsList]
          .sort((stat1, stat2) => stat2.stats[state.selectedSort] - stat1.stats[state.selectedSort])
        let sortedByType = [];
        if(!!state.selectedType.length) {
          [...state.selectedType].forEach(type => {
            sortedByType = sorted.filter(pokemon => pokemon.types.includes(type))
          })
          return sortedByType
        } else {
          return sorted
        }
    },
  },
  namespaced: true
}
