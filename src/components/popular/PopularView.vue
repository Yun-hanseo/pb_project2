<template>
  <div
      class="popular-container"
      :class="{ 'no-scroll': viewType === 'table' }"
  >
    <Header />

    <div class="content">

      <!-- 🔥 View 타입 전환 버튼 -->
      <div class="view-toggle">
        <button
            :class="{ active: viewType === 'table' }"
            @click="switchTo('table')"
        >
          Table View
        </button>

        <button
            :class="{ active: viewType === 'infinite' }"
            @click="switchTo('infinite')"
        >
          Infinite Scroll
        </button>
      </div>

      <!-- 🔥 View 타입 변경 -->
      <transition name="fade" mode="out-in">

        <!-- 📌 Table View (스크롤 X, 10개 고정) -->
        <PopularTable
            v-if="viewType === 'table'"
            :movies="tableMovies"
            :page="tablePage"
            :totalPages="totalPages"
            @change-page="loadTablePage"
        />

        <!-- 📌 Infinite View (기존처럼 스크롤) -->
        <PopularInfinite
            v-else
            :movies="infiniteMovies"
            @load-more="loadInfiniteNext"
            :isLoading="loading"
        />

      </transition>

      <!-- Top 버튼 (무한 스크롤용) -->
      <button
          v-if="viewType === 'infinite'"
          class="top-btn"
          @click="scrollToTop"
      >
        Top
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTMDB } from "@/composables/useTMDB";
import Header from "@/components/common/Header.vue";

import PopularTable from "@/components/popular/PopularTable.vue";
import PopularInfinite from "@/components/popular/PopularInfinite.vue";

const { getPopular, loading } = useTMDB();

/* ---------------------------------------------------
 * 상태 변수
 * ---------------------------------------------------*/
const viewType = ref<"table" | "infinite">("table");

const tableMovies = ref<any[]>([]);
const infiniteMovies = ref<any[]>([]);

const tablePage = ref(1);
const infinitePage = ref(1);

// TMDB 전체 페이지 수 기준, 최대 30페이지만 사용
const totalPages = ref(1);

/* ---------------------------------------------------
 * 뷰 전환
 * ---------------------------------------------------*/
function switchTo(type: "table" | "infinite") {
  viewType.value = type;
}

/* ---------------------------------------------------
 * 📌 TableView 페이지 로딩 (10개씩)
 * ---------------------------------------------------*/
async function loadTablePage(pageNum: number) {
  if (pageNum < 1) return;

  const res = await getPopular(pageNum);
  if (!res) return;

  tablePage.value = pageNum;

  // TMDB에서 준 total_pages 기준으로 최대 30까지만 사용
  totalPages.value = Math.min(res.total_pages ?? 1, 30);

  // 한 페이지에 10개만 보여주기
  const list = res.results ?? [];
  tableMovies.value = list.slice(0, 10);
}

/* ---------------------------------------------------
 * 📌 Infinite Scroll 로딩 (기존 로직 유지)
 * ---------------------------------------------------*/
async function loadInfiniteNext() {
  if (loading.value) return;

  const res = await getPopular(infinitePage.value);
  if (res) {
    infiniteMovies.value.push(...res.results);
    infinitePage.value++;

    if (infinitePage.value > 500) {
      infinitePage.value = 1;
    }
  }
}

/* ---------------------------------------------------
 * 📌 Top 버튼
 * ---------------------------------------------------*/
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------------------------------------------
 * 📌 첫 Table 페이지 로드
 * ---------------------------------------------------*/
onMounted(() => {
  loadTablePage(1);
});
</script>

<style scoped>
.popular-container {
  width: 100%;
  min-height: 100vh;
  background-color: #1a1a1d;
  color: white;
}

/* ⚠️ Table View일 때: 스크롤 막기 */
.popular-container.no-scroll {
  height: 100vh;
  overflow: hidden; /* 화면 전체 스크롤 X */
}

.content {
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 20px;
}

/* Table뷰에서 한 화면에 꽉 차도록 높이 고정 */
.popular-container.no-scroll .content {
  height: calc(100vh - 80px); /* 헤더 아래부터 */
  display: flex;
  flex-direction: column;
}

/* 버튼 영역 */
.view-toggle {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.view-toggle button {
  padding: 8px 20px;
  font-size: 15px;
  background: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.25s;
}

.view-toggle button.active {
  background: #ff3b57;
}

/* Top 버튼 (Infinite에서만 노출) */
.top-btn {
  position: fixed;
  right: 25px;
  bottom: 25px;
  padding: 10px 14px;
  border-radius: 50%;
  font-size: 15px;
  background: #444;
  color: white;
  border: none;
  cursor: pointer;
}
</style>


