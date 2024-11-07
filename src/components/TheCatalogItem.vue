<template lang="pug">
    .card(@click="openModal")
        p Наименование: {{ product.Product }}
        p Цена: {{ product.Price }}
        p Остаток: {{ product.Balance }}
        p Признак Rx/OTC: {{ product.ProductRxOTC }}
    .modal-wrapper(v-if="isModalsOpen")
      .modal-backdrop 
      .modal
        div
            h3.text-center Описание товара
            p Наименование: {{ product.Product }}
            p Цена: {{ product.Price }}
            p Остаток: {{ product.Balance }}
            p Признак Rx/OTC: {{ product.ProductRxOTC }}
            p Вид товара: {{ product.ProductType }}
            p Рейтинг: {{ product.Rate }}
            .row.justify-center
                q-btn(@click="closeModal" color="primary") Закрыть
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const isModalsOpen = ref(false);

const openModal = () => {
  isModalsOpen.value = true;
};

const closeModal = () => {
  isModalsOpen.value = false;
};
</script>
