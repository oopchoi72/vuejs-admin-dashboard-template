import { ref } from "vue";
import { useApi } from "../apis";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export function useAuth() {
  const { api } = useApi();
  const router = useRouter();
  // navigate, location
  const userId = localStorage.getItem("id");
  const store = useAuthStore();
  // 분해하면 반응형 상태가 끊어지므로 storeToRefs로 유지시킨다.
  const { user } = storeToRefs(store);

  console.log("location.pathname:", location.pathname);

  if (!userId && !user.value) {
    if (location.pathname !== "/signin") {
      console.log("current url:", location.pathname);
      localStorage.setItem("returnUrl", location.pathname);
    }
    router.push("/signin");
  }

  const fetchUser = async (userId) => {
    await api.user
      .get(userId)
      .then((data) => {
        console.log("data:", data);
        user.value = data;
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.setItem("id", data.id);
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);
      })
      .catch((err) => console.log(err));
  };

  if (userId && !user.value) {
    fetchUser(userId);
  }

  const login = async (params) => {
    /**
     * TODO 실제 서버에 로그인 요청을 해서 id 값을 받아서 처리하도록 수정해야 한다.
     */
    //   axios
    //     .post('http://localhost:8080/api/v1/auth/signin', data)
    //     .then(({ data }) => console.log(data))
    //     .catch(err => console.log('axios error..........', err));
    const uId = 1;
    await fetchUser(uId);
    const returnUrl = localStorage.getItem("returnUrl");
    if (returnUrl) {
      localStorage.removeItem("returnUrl");
      router.push(returnUrl);
    } else {
      router.push("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("returnUrl");
    user.value = null;
  };

  return { user, login, logout };
}
