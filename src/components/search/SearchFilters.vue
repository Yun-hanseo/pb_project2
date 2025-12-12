<template>
  <div class="filters-container">

    <!-- 장르 선택 -->
    <div class="filter-item">
      <label>장르</label>
      <select :value="selectedGenre" @change="onGenreChange">
        <option value="">전체</option>
        <option
            v-for="genre in genres"
            :key="genre.id"
            :value="genre.id"
        >
          {{ genre.name }}
        </option>
      </select>
    </div>

    <!-- 평점 선택 -->
    <div class="filter-item">
      <label>평점</label>
      <select :value="selectedRating" @change="onRatingChange">
        <option value="">전체</option>
        <option value="9">9점 이상</option>
        <option value="8">8점 이상</option>
        <option value="7">7점 이상</option>
        <option value="6">6점 이상</option>
        <option value="5">5점 이상</option>
      </select>
    </div>

    <!-- 정렬 기준 -->
    <div class="filter-item">
      <label>정렬</label>
      <select :value="selectedSort" @change="onSortChange">
        <option value="popularity.desc">인기순 ↓</option>
        <option value="popularity.asc">인기순 ↑</option>
        <option value="vote_average.desc">평점순 ↓</option>
        <option value="vote_average.asc">평점순 ↑</option>
        <option value="primary_release_date.desc">최신순 ↓</option>
        <option value="primary_release_date.asc">최신순 ↑</option>
      </select>
    </div>

    <!-- 연도 선택 -->
    <div class="filter-item">
      <label>개봉년도</label>
      <input
          type="number"
          placeholder="예: 2023"
          :value="selectedYear"
          @input="onYearChange"
      />
    </div>

    <!-- 초기화 버튼 -->
    <button class="reset-btn" @click="$emit('reset-filters')">
      초기화
    </button>

  </div>
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  genres: any[],
  selectedGenre: number | null,
  selectedRating: number | null,
  selectedSort: string,
  selectedYear: number | null
}>();

/* Emit */
const emit = defineEmits([
  "update-genre",
  "update-rating",
  "update-sort",
  "update-year",
  "reset-filters"
]);

/* 이벤트 핸들러 */
function onGenreChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value;
  emit("update-genre", value ? Number(value) : null);
}

function onRatingChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value;
  emit("update-rating", value ? Number(value) : null);
}

function onSortChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value;
  emit("update-sort", value);
}

function onYearChange(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit("update-year", value ? Number(value) : null);
}
</script>

<style scoped>
.filters-container {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #222;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 25px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 14px;
  color: #ccc;
}

select,
input {
  padding: 6px 10px;
  border-radius: 6px;
  background: #333;
  color: white;
  border: none;
  outline: none;
}

.reset-btn {
  margin-left: auto;
  padding: 8px 14px;
  background: #ff475a;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.reset-btn:hover {
  background: #ff6070;
}
</style>
