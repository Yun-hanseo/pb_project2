<template>
  <div class="movie-card">
    <img
        class="poster"
        :src="posterUrl"
        alt="movie poster"
    />

    <p class="title">{{ movie.title }}</p>

    <p class="rating" v-if="movie.vote_average">
      ⭐ {{ movie.vote_average.toFixed(1) }}
    </p>
  </div>
</template>

<script setup lang="ts">
/* Movie 객체 props */
defineProps<{
  movie: any;
}>();

/* poster URL 처리 */
const posterUrl = computed(() => {
  return movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "/no-image.png"; // 이미지 없을 때 대비
});
</script>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: 0.25s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.poster {
  width: 100%;
  height: 230px;
  object-fit: cover;
  border-radius: 10px;
}

.title {
  margin-top: 8px;
  font-size: 14px;
  color: #eee;
  text-align: center;

  /* 두 줄까지만 표시 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating {
  margin-top: 5px;
  font-size: 13px;
  color: #ffda6b;
}
</style>
