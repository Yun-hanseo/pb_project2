<template>
  <div class="infinite-wrapper">

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

    <div class="load-area" ref="loadRef">
      <p v-if="isLoading">로딩 중...</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  movies: any[];
  isLoading: boolean;
}>();

const emit = defineEmits(["load-more"]);

const loadRef = ref<HTMLElement | null>(null);

/* IntersectionObserver → 무한스크롤 */
onMounted(() => {
  const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) emit("load-more");
      },
      { threshold: 1.0 }
  );

  if (loadRef.value) observer.observe(loadRef.value);
});
</script>

<style scoped>
.infinite-wrapper {
  width: 100%;
  padding-bottom: 40px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

.movie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.poster {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  transition: 0.25s;
}

.poster:hover {
  transform: scale(1.05);
}

.title {
  margin-top: 8px;
  font-size: 14px;
  color: #eee;
  text-align: center;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.load-area {
  margin-top: 25px;
  text-align: center;
  color: #ccc;
}
</style>
