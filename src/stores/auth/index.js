import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // 상태 (state)
  const user = ref(null);
  function $reset() {
    user = ref(null);
    return "clear";
  }

  return { user, $reset };
});
