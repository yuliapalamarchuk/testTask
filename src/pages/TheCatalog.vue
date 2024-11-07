<template lang="pug">
  .q-pa-md.page-container.bg-blue-2
    h1.text-center.q-mb-md Каталог товаров
    .row.justify-center.q-mb-md
      .col-12.col-sm-6.col-md-4
          q-select(
            v-model="localSortBy"
            :options="sortOptions"
            label="Сортировать по"
            outlined
            @update:model-value="updateSort"
          )
    .row.content-area
      .col-12.col-md-3
        .filters.q-pr-md.q-mt-xl
          q-select.q-pb-xl(
            v-model="localFilters.rating"
            :options="ratings"
            label="Рейтинг"
            outlined
          )
          q-select.q-pb-xl(
            v-model="localFilters.productType"
            :options="productTypes"
            label="Вид товара"
            outlined
          )
          q-select.q-pb-xl(
            v-model="localFilters.rxOtc"
            :options="rxOtc"
            label="Признак Rx/OTC"
            outlined
          )
          q-btn(
            label="Сбросить фильтры"
            color="primary"
            @click="resetFilters"
          )
      .col-12.col-md-9
        .row.q-col-gutter-md.q-mt-md
          .col-6.col-sm-4.col-lg-3(
            v-for="(item, index) in paginatedProducts"
            :key="index"
          )
            TheCatalogItem(:product="item")
  .q-pa-lg.flex.flex-center.bg-blue-2
    q-pagination.q-mt-md(
      v-model="currentPage"
      :max="totalPages"
      :max-pages="5"
      color="primary"
      boundary-numbers
      direction-links
    )
  </template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import TheCatalogItem from "src/components/TheCatalogItem.vue";

export default {
  components: { TheCatalogItem },

  setup() {
    const store = useStore();

    const localFilters = ref({
      rating: null,
      productType: null,
      rxOtc: null,
    });

    const localSortBy = ref(null);

    const currentPage = ref(1);
    const itemsPerPage = 10;

    const sortOptions = ["Наименованию", "Цене", "Остаткам"];

    const products = computed(
      () => store.getters["products/GET_FILTERED_AND_SORTED_PRODUCTS"]
    );

    const ratings = computed(() => store.getters["products/GET_RATINGS"]);

    const productTypes = computed(
      () => store.getters["products/GET_PRODUCT_TYPES"]
    );

    const rxOtc = computed(() => store.getters["products/GET_RxOtc"]);

    onMounted(async () => {
      await store.dispatch("products/GET_PRODUCTS_FROM_JSON").catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
      localFilters.value = [];
      localSortBy.value = [];
    });

    watch(
      localFilters,
      () => {
        store.dispatch("products/UPDATE_FILTERS", localFilters.value);
      },
      { deep: true }
    );

    const updateSort = (value) => {
      store.dispatch("products/UPDATE_SORTING", localSortBy.value);
    };

    const resetFilters = () => {
      localFilters.value = {
        rating: null,
        productType: null,
        rxOtc: null,
      };
      store.dispatch("products/UPDATE_FILTERS", localFilters.value);
    };

    const paginatedProducts = computed(() => {
      if (!products.value) return [];
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      return products.value.slice(startIndex, startIndex + itemsPerPage);
    });

    const totalPages = computed(() =>
      Math.ceil(products.value.length / itemsPerPage)
    );

    return {
      localFilters,
      localSortBy,
      sortOptions,
      ratings,
      productTypes,
      rxOtc,
      paginatedProducts,
      currentPage,
      totalPages,
      updateSort,
      resetFilters,
    };
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-area {
  flex: 1;
  display: flex;
}
</style>
