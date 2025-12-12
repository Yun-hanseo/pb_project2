<template>
  <div class="table-view">
    <!-- 영화 목록 (Grid) -->
    <div class="movie-grid">
      <div
          class="movie-card"
          v-for="movie in movies"
          :key="movie.id"
      >
        <img
            class="poster"
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            alt="poster"
        />
        <p class="title">{{ movie.title }}</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button
          class="page-btn"
          :disabled="page === 1"
          @click="$emit('change-page', page - 1)"
      >
        ◀ 이전
      </button>

      <span class="page-number">{{ page }} / {{ totalPages }}</span>

      <button
          class="page-btn"
          :disabled="page === totalPages"
          @click="$emit('change-page', page + 1)"
      >
        다음 ▶
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  movies: any[];
  page: number;
  totalPages: number;
}>();
</script>

<style scoped>
/* 전체 컨테이너: 부모(content)의 남은 높이를 채움 */
.table-view {
  display: flex;
  flex-direction: column;
  height: auto;     /* ⭐ 핵심: 100% 높이 제거 */
  width: 100%;
  overflow: visible; /* 스크롤 막는 기능은 상위 컴포넌트에서 처리됨 */
}


/* Grid 레이아웃: 2행 × 5열을 목표 (10개) */
.movie-grid {
  flex: 1; /* 위쪽 영역 차지 */
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;

  width: 100%;
  padding: 10px 0;
}

/* 포스터 카드 */
.movie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.poster {
  width: 100%;
  max-width: 180px;
  aspect-ratio: 2 / 3; /* 비율 고정 */
  object-fit: cover;
  border-radius: 10px;
  transition: 0.25s;
}

.poster:hover {
  transform: scale(1.05);
}

.title {
  margin-top: 6px;
  font-size: 13px;
  color: #eee;
  text-align: center;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 페이지네이션: 항상 아래쪽에 */
.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
}

.page-btn {
  padding: 6px 14px;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 14px;
}

.page-btn:hover {
  background: #ff475a;
}

.page-btn:disabled {
  background: #555;
  cursor: default;
}

.page-number {
  font-size: 14px;
  color: #ccc;
}
</style>


