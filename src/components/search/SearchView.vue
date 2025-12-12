<template>
  <div class="search-container">
    <Header />

    <div class="content">

      <!-- 🔍 필터 UI -->
      <SearchFilters
          :genres="genres"
          :selectedGenre="selectedGenre"
          :selectedRating="selectedRating"
          :selectedSort="selectedSort"
          :selectedYear="selectedYear"
          @update-genre="updateGenre"
          @update-rating="updateRating"
          @update-sort="updateSort"
          @update-year="updateYear"
          @reset-filters="resetFilters"
      />

      <!-- 🔎 검색 결과 -->
      <SearchResults :movies="movies" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Header from "@/components/common/Header.vue";

import SearchFilters from "./SearchFilters.vue";
import SearchResults from "./SearchResults.vue";

import { useTMDB } from "@/composables/useTMDB";


/* ------------------------------------------------------
 * 상태값 정의
 * ------------------------------------------------------*/
const { getGenres, searchMovies } = useTMDB();

const genres = ref([]);       // 장르 목록
const movies = ref([]);       // 검색 결과

// 필터 상태값
const selectedGenre = ref(null);
const selectedRating = ref(null);
const selectedSort = ref("popularity.desc");
const selectedYear = ref(null);


/* ------------------------------------------------------
 * 초기 데이터 로드 (장르 목록)
 * ------------------------------------------------------*/
onMounted(async () => {
  const genreList = await getGenres();
  genres.value = genreList;
});


/* ------------------------------------------------------
 * 필터 변경 함수들
 * ------------------------------------------------------*/
function updateGenre(genreId: number | null) {
  selectedGenre.value = genreId;
  loadMovies();
}

function updateRating(rating: number | null) {
  selectedRating.value = rating;
  loadMovies();
}

function updateSort(sort: string) {
  selectedSort.value = sort;
  loadMovies();
}

function updateYear(year: number | null) {
  selectedYear.value = year;
  loadMovies();
}

function resetFilters() {
  selectedGenre.value = null;
  selectedRating.value = null;
  selectedSort.value = "popularity.desc";
  selectedYear.value = null;

  loadMovies();
}


/* ------------------------------------------------------
 * TMDB API 호출 (discover/movie)
 * ------------------------------------------------------*/
async function loadMovies() {
  const params: any = {
    sort_by: selectedSort.value,
    with_genres: selectedGenre.value || undefined,
    primary_release_year: selectedYear.value || undefined,
    "vote_average.gte": selectedRating.value || undefined,
  };

  const res = await searchMovies(params);
  movies.value = res?.results ?? [];
}

</script>

<style scoped>
.search-container {
  background-color: #1a1a1d;
  color: white;
  min-height: 100vh;
}

.content {
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 20px;
}
</style>
