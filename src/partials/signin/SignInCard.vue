<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../../composable/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const returnUrl = ref("");

const { login } = useAuth();

const router = useRouter();

const submitLogin = () => {
  if (!email.value || !password.value) {
    // 사용자에게 메시지 표시
    alert("이메일과 비밀번호를 모두 입력하세요.");
    return;
  }

  // 로그인 로직을 여기에 추가
  console.log("로그인 버튼이 클릭되었습니다.");
  console.log("email.value:", email.value);
  console.log("password.value:", password.value);

  login({ email: email.value, password: password.value });
};

// 라우트 쿼리 파라미터에서 returnUrl을 읽어와 설정
onMounted(() => {
  console.log("router.currentRoute:", router.currentRoute);
  returnUrl.value = router.currentRoute.value.query.returnUrl || "";
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <form
      @submit.prevent="submitLogin"
      class="bg-white p-8 rounded shadow-md w-96"
    >
      <h2 class="text-2xl font-semibold mb-4">로그인</h2>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-600"
          >이메일</label
        >
        <input
          v-model="email"
          type="text"
          id="email"
          name="email"
          class="mt-1 p-2 w-full border rounded-md"
        />
        <!-- <p v-if="!email" class="text-red-500 text-xs mt-1">
          이메일을 입력하세요.
        </p> -->
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-600"
          >비밀번호</label
        >
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          class="mt-1 p-2 w-full border rounded-md"
        />
        <!-- <p v-if="!password" class="text-red-500 text-xs mt-1">
          비밀번호를 입력하세요.
        </p> -->
      </div>

      <button
        type="submit"
        :disabled="!email || !password"
        class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        로그인
      </button>
    </form>
  </div>
</template>
