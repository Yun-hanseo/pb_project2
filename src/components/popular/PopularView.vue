<template>
  <div class="popular-container">

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

        <!-- 📌 Table View -->
        <PopularTable
            v-if="viewType === 'table'"
            :movies="tableMovies"
            :page="tablePage"
            :totalPages="totalPages"
            @change-page="loadTablePage"
        />

        <!-- 📌 Infinite Scroll View -->
        <PopularInfinite
            v-else
            :movies="infiniteMovies"
            @load-more="loadInfiniteNext"
            :isLoading="loading"
        />

      </transition>

      <!-- Top 버튼 -->
      <button class="top-btn" @click="scrollToTop">Top</button>

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

/* 상태 변수 */
const viewType = ref("table");

const tableMovies = ref([]);
const infiniteMovies = ref([]);

const tablePage = ref(1);
const infinitePage = ref(1);

const totalPages = ref(30);

/* View 전환 */
function switchTo(type: string) {
  viewType.value = type;
}

/* 📌 TableView: 10개만 */
async function loadTablePage(pageNum: number) {
  tablePage.value = pageNum;

  const res1 = await getPopular(pageNum);
  const res2 = await getPopular(pageNum + 1);

  const list1 = res1?.results ?? [];
  const list2 = res2?.results ?? [];

  // 한 화면 = 10개
  tableMovies.value = [...list1, ...list2].slice(0, 10);
}

/* 📌 Infinite Scroll */
async function loadInfiniteNext() {
  if (loading.value) return;

  infinitePage.value++;

  if (infinitePage.value > 500) {
    infinitePage.value = Math.floor(Math.random() * 500) + 1;
  }

  const res = await getPopular(infinitePage.value);
  if (res) infiniteMovies.value.push(...res.results);
}

/* Top 버튼 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* 첫 로딩 */
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

.content {
  max-width: 1200px;
  margin: 80px auto;
  padding: 20px;
}

.view-toggle {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
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

/* Top 버튼 */
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
