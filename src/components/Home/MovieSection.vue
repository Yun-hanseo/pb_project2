<template>
  <section class="movie-section">
    <h3 class="section-title">{{ title }}</h3>

    <div class="movie-grid">
      <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :title="movie.title"
          :posterPath="movie.poster_path"
          :overview="movie.overview"
          :rating="movie.vote_average"
          :releaseDate="movie.release_date"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import MovieCard from "./MovieCard.vue";

defineProps<{
  title: string;
  movies: any[];
}>();
</script>

<style scoped>
.movie-section {
  margin-bottom: 50px;
  padding: 0 20px;
  width: 100%;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 14px;
  color: #fff;
}

.movie-grid {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 8px 0;
  scroll-behavior: smooth;
}

/* 스크롤바 */
.movie-grid::-webkit-scrollbar {
  height: 8px;
}
.movie-grid::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 4px;
}
.movie-grid::-webkit-scrollbar-track {
  background-color: #1c1c1c;
}
</style>

