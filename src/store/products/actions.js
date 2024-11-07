import axios from "axios";

async function GET_PRODUCTS_FROM_JSON({ commit }) {
  return await axios
    .get("data.json")
    .then((res) => {
      commit("SET_PRODUCTS", res.data);
      return res.data;
    })
    .catch((error) => {
      console.error("Ошибка при получении товаров", error);
      throw error;
    });
}

function UPDATE_SORTING({ commit }, sortBy) {
  commit("SET_SORTING", sortBy);
}

function UPDATE_FILTERS(context, filters) {
  context.commit("SET_FILTERS", filters);
}

export { GET_PRODUCTS_FROM_JSON, UPDATE_SORTING, UPDATE_FILTERS };
