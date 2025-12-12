<template>
  <div class="pagination">

    <!-- 이전 버튼 -->
    <button
        class="nav-btn"
        :disabled="page === 1"
        @click="change(page - 1)"
    >
      ◀
    </button>

    <!-- 페이지 숫자들 -->
    <div class="page-numbers">
      <!-- 첫 페이지 -->
      <span
          class="page-item"
          :class="{ active: page === 1 }"
          @click="change(1)"
      >
        1
      </span>

      <!-- 앞쪽 생략 ... -->
      <span v-if="page > 4" class="dots">...</span>

      <!-- 중간 페이지들 -->
      <span
          v-for="p in middlePages"
          :key="p"
          class="page-item"
          :class="{ active: page === p }"
          @click="change(p)"
      >
        {{ p }}
      </span>

      <!-- 뒤쪽 생략 ... -->
      <span v-if="page < totalPages - 3" class="dots">...</span>

      <!-- 마지막 페이지 -->
      <span
          v-if="totalPages > 1"
          class="page-item"
          :class="{ active: page === totalPages }"
          @click="change(totalPages)"
      >
        {{ totalPages }}
      </span>
    </div>

    <!-- 다음 버튼 -->
    <button
        class="nav-btn"
        :disabled="page === totalPages"
        @click="change(page + 1)"
    >
      ▶
    </button>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  page: number;
  totalPages: number;
}>();

const emit = defineEmits(["change-page"]);

// **현재 페이지 기준으로 주변 숫자만 표시**
// 예: page=25 → 23,24,25,26,27
const middlePages = computed(() => {
  const pages = [];

  const start = Math.max(2, props.page - 2);
  const end = Math.min(props.totalPages - 1, props.page + 2);

  for (let p = start; p <= end; p++) {
    pages.push(p);
  }
  return pages;
});

// 페이지 변경 emit
function change(p: number) {
  if (p !== props.page) {
    emit("change-page", p);
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 25px;
  font-size: 15px;
  color: #ddd;
}

.nav-btn {
  padding: 6px 12px;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.nav-btn:hover {
  background: #ff475a;
}

.nav-btn:disabled {
  background: #555;
  cursor: default;
}

/* 페이지 숫자 컨테이너 */
.page-numbers {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 페이지 숫자 */
.page-item {
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  background: #2c2c2c;
  transition: 0.2s;
}

.page-item:hover {
  background: #ff475a;
}

.page-item.active {
  background: #ff3b57;
  font-weight: bold;
  color: white;
}

.dots {
  padding: 0 6px;
  color: #777;
}
</style>
