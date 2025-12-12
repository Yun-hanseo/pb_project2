<template>
  <div class="results-container">

    <!-- 검색 결과 없음 -->
    <p v-if="movies.length === 0" class="empty-text">
      검색 결과가 없습니다.
    </p>

    <!-- 검색 결과 목록 -->
    <div class="movie-grid">
      <SearchCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import SearchCard from "./SearchCard.vue";

/* props */
defineProps<{
  movies: any[];
}>();
</script>

<style scoped>
.results-container {
  width: 100%;
  min-height: 300px;
  margin-top: 20px;
}

.empty-text {
  text-align: center;
  margin: 40px 0;
  color: #ccc;
  font-size: 16px;
}

/* 영화 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}
</style>
