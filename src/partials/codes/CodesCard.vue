<script setup>
import { ref, defineProps, watch } from "vue";

const props = defineProps([
  "payload",
  "onChangePage",
  "onDetailView",
  "onDeleteView",
]);
const data = ref(props.payload?.data);
const currentPage = ref(1);
const rowCount = ref(5);
const totalCount = ref(0);
const totalPage = ref(0);

const pageNumbers = ref([]);
const prevPage = ref(0);
const nextPage = ref(0);
const startPage = ref(0);
const endPage = ref(0);

watch(
  () => props.payload,
  (newVal, oldVal) => {
    console.log("props.payload:", newVal);
    data.value = newVal.data;
    if (data.value) {
      setPagination();
    }
  }
);

function setPagination() {
  const _currentPage = props.payload?.currentPage; // 현재 페이지
  const _totalCount = props.payload?.totalCount; // 디비에 있는 전체 로우 건수

  const _rowCount = props.payload?.rowCount; // 한 페이지에 보여줄 데이터 로우 개수
  let _pageCount = props.payload?.pageCount; // 그룹당 보여줄 페이지 버튼 개수

  const _totalPage = Math.ceil(_totalCount / _rowCount); // 전체 페이지 개수
  const _pageGroup = Math.ceil(_currentPage / _pageCount); // 현재 페이지 기준으로 페이지 버튼 그룹
  console.log("_currentPage:", _currentPage);
  console.log("_pageCount:", _pageCount);
  console.log("_pageGroup:", _pageGroup);

  // 그룹 내 마지막 페이지
  let _endPage = _pageGroup * _pageCount;
  if (_endPage > _totalPage) {
    _endPage = _totalPage;
  }

  // 그룹 내 첫번째 페이지
  let _startPage = _endPage - (_pageCount - 1);
  if (_startPage < 1) _startPage = 1;

  let _nextPage = _endPage + 1; // 그룹의 다음 페이지
  if (_nextPage > _totalPage) {
    _nextPage = _totalPage;
  }

  let _prevPage = _startPage - 1; // 그룹의 이전 페이지
  if (_prevPage < 1) {
    _prevPage = 1;
  }

  console.log("_totalPage:", _totalPage);
  console.log("_startPage:", _startPage);
  console.log("_endPage:", _endPage);
  console.log("_prevPage:", _prevPage);
  console.log("_nextPage:", _nextPage);

  /**
   * 페이징 설정 값을 사용하여 화면에 표시하기 위한 용도
   */
  currentPage.value = _currentPage;
  rowCount.value = _rowCount;
  totalCount.value = _totalCount;
  totalPage.value = _totalPage;

  /**
   * 페이징 링크 버튼들
   */
  prevPage.value = _prevPage;
  generatePageNumbers(_currentPage, _startPage, _endPage);
  nextPage.value = _nextPage;
  startPage.value = _startPage;
  endPage.value = _endPage;
}
/**
 * 그룹에 해당하는 페이지 번호 링크를 생성한다.
 */
function generatePageNumbers(currentPage, startPage, endPage) {
  const numbers = [];
  let bgColor = "";
  for (let i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
      console.log("generatePageNumbers::currentPage:", currentPage);
      bgColor = "bg-blue-400";
    } else {
      bgColor = "bg-white";
    }

    // numbers.push(
    //   <li key={i}>
    //     <a
    //       href="#"
    //       className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 ${bgColor}  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
    //       onClick={() => onChangePage(i)}
    //     >
    //       {i}
    //     </a>
    //   </li>
    // );
  }
  pageNumbers.value = numbers;
}
</script>
<template>
  <div
    className="w-full col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700"
  >
    <header
      className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
    >
      <h2 className="font-semibold text-slate-800 dark:text-slate-100">
        공통코드 관리
      </h2>
    </header>
    <div className="p-3">
      <div className="overflow-x-auto">
        <table
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">번호</th>
              <th scope="col" className="px-6 py-3">상위 코드</th>
              <th scope="col" className="px-6 py-3">코드</th>
              <th scope="col" className="px-6 py-3">설명</th>
              <th scope="col" className="px-6 py-3">순서</th>
              <th scope="col" className="px-6 py-3">삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in data"
              :key="item.id"
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-2"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-2" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ item.id }}
              </th>
              <td className="px-6 py-4">{{ item.parent_code }}</td>
              <td className="px-6 py-4">
                <a
                  className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  @click.prevent="
                    (event) => {
                      props.onDetailView(item.id);
                    }
                  "
                >
                  {{ item.code }}
                </a>
              </td>
              <td className="px-6 py-4">{{ item.description }}</td>
              <td className="px-6 py-4">{{ item.order_no }}</td>
              <td className="px-6 py-4">
                <a
                  className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  @click.prevent="
                    (event) => {
                      console.log('delete:', item.id);
                      props.onDeleteView(item.id);
                    }
                  "
                >
                  삭제
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <nav
          className="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span
            className="text-sm font-normal text-gray-500 dark:text-gray-400"
          >
            총
            <span className="font-semibold text-gray-900 dark:text-white">
              {{ totalCount }}
            </span>
            중에
            <span className="font-semibold text-gray-900 dark:text-white">
              {{ currentPage * rowCount - rowCount + 1 }}-
              <span v-if="currentPage * rowCount > totalCount">{{
                totalCount
              }}</span>
              <span v-else>{{ currentPage * rowCount }}</span>
            </span>
          </span>
          <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                @click="
                  () => {
                    onChangePage(1);
                  }
                "
              >
                처음
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                @click="
                  () => {
                    onChangePage(prevPage);
                  }
                "
              >
                이전
              </a>
            </li>
            <span v-if="startPage > 1" className="text-slate-600">...</span>
            {{
              pageNumbers
            }}
            <span v-if="endPage < totalPage" className="text-slate-600"
              >...</span
            >
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                @click="
                  () => {
                    onChangePage(nextPage);
                  }
                "
              >
                다음
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                @click="
                  () => {
                    onChangePage(totalPage);
                  }
                "
              >
                마지막
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
