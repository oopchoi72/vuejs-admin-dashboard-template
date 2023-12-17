<script setup>
import { defineProps } from "vue";
import { useApi } from "../../api";

const props = defineProps(["onClose"]);

const parent_code = ref("");
const code = ref("");
const description = ref("");
const order_no = ref("");

const onSubmit = async (params) => {
  await useApi().api.codes.post(params);
  props.onClose();
};
</script>
<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-semibold mb-4">코드 등록</h2>

      <div class="mb-4">
        <label for="parent_code" class="block text-sm font-medium text-gray-600"
          >상위코드</label
        >
        <input
          v-model="parent_code"
          type="text"
          id="parent_code"
          name="parent_code"
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div class="mb-4">
        <label for="code" class="block text-sm font-medium text-gray-600"
          >코드</label
        >
        <input
          v-model="code"
          type="text"
          id="code"
          name="code"
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-600"
          >설명</label
        >
        <input
          v-model="description"
          type="text"
          id="description"
          name="description"
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div class="mb-4">
        <label for="order_no" class="block text-sm font-medium text-gray-600"
          >순서</label
        >
        <input
          v-model="order_no"
          type="text"
          id="order_no"
          name="order_no"
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <button
        @click="onSubmit"
        class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        추가
      </button>

      <button
        @click="props.onClose"
        class="mt-4 w-full bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-300"
      >
        취소
      </button>
    </div>
  </div>
</template>
