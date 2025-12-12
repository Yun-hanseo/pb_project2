<template>
  <div class="infinite-container">

    <!-- 영화 카드 리스트 -->
    <div class="movie-list">
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

    <!-- 관찰 지점 (스크롤 끝 감지용) -->
    <div ref="observerTarget" class="observer-box"></div>

    <!-- 로딩 스피너 -->
    <div class="loading" v-if="isLoading">
      Loading...
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  movies: any[];
  isLoading: boolean;
}>();

const emit = defineEmits(["load-more"]);

const observerTarget = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

// 🔥 IntersectionObserver로 무한 스크롤 구현
function startObserver() {
  observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        // 화면에 보이면 다음 페이지 요청
        if (entry.isIntersecting) {
          emit("load-more");
        }
      },
      { threshold: 1.0 }
  );

  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  }
}

onMounted(() => {
  startObserver();
});

onBeforeUnmount(() => {
  if (observer && observerTarget.value) {
    observer.unobserve(observerTarget.value);
  }
});
</script>

<style scoped>
.infinite-container {
  width: 100%;
  padding-bottom: 50px;
}

/* 영화 카드 레이아웃 */
.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 18px;
  padding: 10px;
}

/* 카드 */
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
}

.title {
  margin-top: 8px;
  color: #ddd;
  text-align: center;
  font-size: 14px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 관찰지점(div) */
.observer-box {
  height: 40px;
  background: transparent;
}

/* 로딩 표시 */
.loading {
  text-align: center;
  padding: 15px;
  font-size: 16px;
  color: #aaa;
}
</style>
