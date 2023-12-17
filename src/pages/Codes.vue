<script setup>
import { ref } from "vue";
import Banner from "../partials/Banner.vue";
import CodesCard from "../partials/codes/CodesCard.vue";
import { useApi } from "../apis";
import { useAuth } from "../composable/auth";

// 로그인 사용자 정보
const { user } = useAuth();

const sidebarOpen = ref(false);

const data = ref(null);

// 실시간으로 입력되는 키워드 데이터 (ref를 사용해서 제거 가능)
const inputParentKeyword = ref(null);
const inputChildKeyword = ref(null);
// 검색 버튼 클릭 시 실제 서버로 전송될 키워드 데이터
const parentKeyword = ref(null);
const childKeyword = ref(null);

// 모달 오픈 설정
const openAddModal = ref(false);
const openEditModal = ref(false);
const openDeleteModal = ref(false);

// 수정을 위한 선택된 코드 객체
const selectedItem = ref(null);

// 삭제를 위한 선택된 코드 아이디
const selectedId = ref(0);

/**
 * 페이지 설정
 */
const pageCount = ref(5); // 페이지 그룹당 보여질 번호 최대 개수
const page = ref(1); // 현재 페이지
const limit = ref(6); // 한 페이지에 보여질 로우 최대 개수

/**
 * 코드 목록 소팅 기준 설정
 */
const sort = ref("id");
const order = ref("desc");

const fetchCodes = async () => {
  // console.log('fetchCodes');
  let params = {
    parent_code: parentKeyword.value ? parentKeyword.value : null,
    code: childKeyword.value ? childKeyword.value : null,
    pageCount: pageCount.value,
    _page: page.value,
    _limit: limit.value,
    _sort: sort.value,
    _order: order.value,
  };
  return await useApi().api.codes.getAll(params);
};

const fetchCode = async (id) => {
  console.log("fetchCode");
  await useApi()
    .api.codes.get(id)
    .then((data) => {
      selectedItem.value = data;
    });
};

const handleSearch = () => {
  data.value = fetchCodes();
};

const onChangePage = async (page) => {
  page.value = page;
};

const onDetailView = async (id) => {
  data.value = fetchCode(id);
};

const onDeleteView = async (id) => {
  selectedId.value = id;
  openDeleteModal.value = true;
};

const closeAddModal = () => {
  openAddModal.value = false;
  data.value = fetchCodes();
};

const closeEditModal = () => {
  openEditModal.value = false;
  selectedItem.value = null;
  data.value = fetchCodes();
};

const closeDeleteModal = () => {
  openDeleteModal.value = false;
  selectedId.value = 0;
  data.value = fetchCodes();
};
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
          <!-- Dashboard actions -->
          <div class="flex justify-between items-center mb-4">
            <!-- Left: Search Bar -->
            <div class="relative flex items-center">
              <input
                type="text"
                id="table-search-parent"
                class="block p-2 pl-3 rounded-lg w-50 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="상위코드"
                @change="
                  (event) => (inputParentKeyword.value = event.target.value)
                "
              />
              <input
                type="text"
                id="table-search-child"
                class="block ml-3 p-2 pl-3 rounded-lg w-50 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="하위코드"
                @change="
                  (event) => (inputChildKeyword.value = event.target.value)
                "
              />
              <Link
                @click="
                  (event) => {
                    page.value = 1;
                    parentKeyword.value = inputParentKeyword.value;
                    childKeyword.value = inputChildKeyword.value;
                  }
                "
              >
                <div
                  class="cursor-pointer inset-y-0 right-0 flex items-center px-3 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            <!-- Right: Actions -->
            <!-- <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            > -->
            <!-- Add Code button -->
            <!-- <button
                class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                @click="(event) => (openAddModal = true)"
              >
                Add Code
              </button>
            </div> -->
            <div class="sm:flex sm:justify-between sm:items-center mb-8">
              <!-- Right: Actions -->
              <div
                class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
              >
                <!-- Filter button -->
                <FilterButton align="right" />
                <!-- Datepicker built with flatpickr -->
                <Datepicker align="right" />
                <!-- Add view button -->
                <button
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  @click="(event) => (openAddModal = true)"
                >
                  <svg
                    class="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                    />
                  </svg>
                  <span class="hidden xs:block ml-2">Add Code</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Cards -->
          <div>
            <!-- Table (공통 코드 관리 테이블) -->
            <CodesCard
              :payload="data"
              :onChangePage="onChangePage"
              :onDetailView="onDetailView"
              :onDeleteView="onDeleteView"
            ></CodesCard>
          </div>
        </div>
        <CodeAddModal
          v-if="openAddModal"
          :onClose="closeAddModal"
        ></CodeAddModal>
        <CodeEditModal
          v-if="openEditModal"
          :selectedItem="selectedItem"
          :onClose="closeEditModal"
        ></CodeEditModal>
        <CodeDeleteModal
          v-if="openDeleteModal"
          :selectedId="selectedId"
          :onClose="closeDeleteModal"
        ></CodeDeleteModal>
      </main>

      <Banner />
    </div>
  </div>
</template>
