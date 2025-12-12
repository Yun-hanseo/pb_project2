<template>
  <div class="home-container">
    <Header />

    <main class="content">

      <!-- 인기 영화 -->
      <MovieSection
          title="인기 영화"
          :movies="popularMovies"
      />

      <!-- 현재 상영작 -->
      <MovieSection
          title="현재 상영작"
          :movies="nowPlayingMovies"
      />

      <!-- 최고 평점 영화 -->
      <MovieSection
          title="최고 평점 영화"
          :movies="topRatedMovies"
      />

      <MovieSection
          title="개봉 예정작"
          :movies="upcomingMovies"
      />

      <MovieDetailModal
          v-if="showModal"
          :movie="selectedMovie"
          @close="closeModal"
      />

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/common/Header.vue";
import MovieSection from "./MovieSection.vue";
import { useTMDB } from "@/composables/useTMDB";

// TMDB API 연결
const { getPopular, getNowPlaying, getTopRated, getUpcoming  } = useTMDB();

// 상태 변수
const popularMovies = ref([]);
const nowPlayingMovies = ref([]);
const topRatedMovies = ref([]);
const upcomingMovies = ref([]);
const showModal = ref(false);
const selectedMovie = ref(null);

function openDetail(movie: any) {
  selectedMovie.value = movie;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

onMounted(async () => {
  // 인기 영화
  const popular = await getPopular();
  popularMovies.value = popular?.results || [];

  // 현재 상영작
  const now = await getNowPlaying();
  nowPlayingMovies.value = now?.results || [];

  // 최고 평점 영화
  const top = await getTopRated();
  topRatedMovies.value = top?.results || [];

  const upcoming = await getUpcoming();
  upcomingMovies.value = upcoming?.results || [];
});
</script>

<style scoped>
.home-container {
  width: 100%;
  min-height: 100vh;
  background-color: #1a1a1d;
  color: white;
}

.content {
  width: 100%;
  margin-top: 80px;       /* Header 때문에 위쪽만 여백 필요 */
  padding: 0 20px;        /* 좌우 여백 최소화 → 꽉 차는 느낌 */
  box-sizing: border-box;
}

</style>


