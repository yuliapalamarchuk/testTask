function SET_PRODUCTS(state, products) {
  state.products = products;
}

function SET_SORTING(state, sortBy) {
  state.sortBy = sortBy;
}

function SET_FILTERS(state, filters) {
  state.filters = filters;
}

export { SET_PRODUCTS, SET_SORTING, SET_FILTERS };
