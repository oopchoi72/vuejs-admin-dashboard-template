<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const props = defineProps(["code", "message"]);
const router = useRouter();
</script>
<template>
  <div className="p-3">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-semibold mb-4">에러</h1>
      <div className="mb-4">
        <h2>에러 코드 : {{ props.code }}</h2>
        <p>에러 메시지 : {{ props.message }}</p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        @click.prevent="
          (event) => {
            router.push('/');
          }
        "
      >
        메인 페이지
      </button>
    </div>
  </div>
</template>
