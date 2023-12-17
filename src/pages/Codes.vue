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

<template></template>
