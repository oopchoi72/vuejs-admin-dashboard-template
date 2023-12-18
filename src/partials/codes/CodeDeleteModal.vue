<script setup>
import { defineProps } from "vue";
import { useApi } from "../../apis";

const props = defineProps(["selectedId", "onClose"]);
const onSubmit = async () => {
  await useApi().api.codes.delete(props.selectedId);
  props.onClose();
};
</script>

<template>
  <div
    class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-semibold mb-4">코드 삭제</h2>

      <div class="mb-4">{{ props.selectedId }} 코드를 삭제 하시겠습니까?</div>

      <button
        @click="onSubmit"
        class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        삭제
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
