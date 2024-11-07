function GET_PRODUCTS(state) {
  return state.products;
}

function GET_FILTERED_AND_SORTED_PRODUCTS(state) {
  if (!state.products) return [];

  let filteredProducts = [...state.products];

  const hasActiveFilters = Object.values(state.filters).some(
    (filter) => filter !== null
  );

  if (hasActiveFilters) {
    if (state.filters.rating) {
      filteredProducts = filteredProducts.filter(
        (product) => product.Rate === state.filters.rating
      );
    }
  }

  if (state.filters.rating) {
    filteredProducts = filteredProducts.filter(
      (product) => product.Rate === state.filters.rating
    );
  }

  if (state.filters.productType) {
    filteredProducts = filteredProducts.filter(
      (product) => product.ProductType === state.filters.productType
    );
  }

  if (state.filters.rxOtc) {
    filteredProducts = filteredProducts.filter(
      (product) => product.ProductRxOTC === state.filters.rxOtc
    );
  }

  if (state.sortBy === "Наименованию") {
    filteredProducts.sort((x, y) =>
      x.Product > y.Product ? 1 : y.Product > x.Product ? -1 : 0
    );
  } else if (state.sortBy === "Цене") {
    filteredProducts.sort((x, y) => x.Price - y.Price);
  } else if (state.sortBy === "Остаткам") {
    filteredProducts.sort((x, y) => x.Balance - y.Balance);
  }

  return filteredProducts;
}

function GET_RATINGS(state) {
  if (!state.products) return [];
  return [...new Set(state.products.map((product) => product.Rate))].sort(
    (x, y) => x - y
  );
}

function GET_PRODUCT_TYPES(state) {
  if (!state.products) return [];
  return [
    ...new Set(state.products.map((product) => product.ProductType)),
  ].sort();
}

function GET_RxOtc(state) {
  if (!state.products) return [];
  return [
    ...new Set(state.products.map((product) => product.ProductRxOTC)),
  ].sort();
}

export {
  GET_PRODUCTS,
  GET_FILTERED_AND_SORTED_PRODUCTS,
  GET_RATINGS,
  GET_PRODUCT_TYPES,
  GET_RxOtc,
};
