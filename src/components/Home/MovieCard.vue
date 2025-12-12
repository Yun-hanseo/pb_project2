<template>
  <div class="movie-card">
    <img
        v-if="posterPath"
        class="poster"
        :src="`https://image.tmdb.org/t/p/w500${posterPath}`"
        alt="poster"
    />

    <div v-else class="image-placeholder">No Image</div>

    <p class="movie-title">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  posterPath: string;
  overview?: string;
  rating?: number;
  releaseDate?: string;
}>();
</script>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
}

.poster {
  width: 150px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.25s ease;
}

.movie-title {
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
}
</style>

