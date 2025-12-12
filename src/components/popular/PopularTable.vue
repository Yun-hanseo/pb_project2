<template>
  <div class="table-view">

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
.table-view {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  overflow: visible;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
  padding: 10px 0;
  margin-bottom: 12px;
}

.movie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.poster {
  width: 100%;
  max-width: 180px;
  aspect-ratio: 2 / 3;
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

.pagination {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 10px;
}

.page-btn {
  padding: 6px 14px;
  background: #333;
  border-radius: 6px;
  border: none;
  color: white;
  cursor: pointer;
}

.page-btn:hover {
  background: #ff475a;
}

.page-btn:disabled {
  background: #555;
}
</style>
