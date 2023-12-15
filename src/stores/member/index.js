import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMemberStore = defineStore('member', () => {
  // 상태 (state)
  const id = ref(0);
  const name = ref('oopchoi');
  const email = ref('oopchoi@gmail.com');
  function $reset() {
    id.value = 0;
    name.value = '';
    email.value = '';
    return 'clear';
  }

  return { id, name, email, $reset };
});
