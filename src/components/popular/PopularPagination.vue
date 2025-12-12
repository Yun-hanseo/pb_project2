<template>
  <div class="pagination">
    <button
        class="page-btn"
        :disabled="page === 1"
        @click="$emit('change-page', page - 1)"
    >
      ◀ 이전
    </button>

    <span class="page-number">
      {{ page }} / {{ totalPages }}
    </span>

    <button
        class="page-btn"
        :disabled="page === totalPages"
        @click="$emit('change-page', page + 1)"
    >
      다음 ▶
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  page: number;
  totalPages: number;
}>();

defineEmits(["change-page"]);
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
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
  transition: 0.2s;
}

.page-btn:hover {
  background: #ff475a;
}

.page-btn:disabled {
  background: #555;
  cursor: default;
}

.page-number {
  font-size: 14px;
  color: #ccc;
}
</style>
