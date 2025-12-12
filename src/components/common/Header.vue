<template>
  <header :class="['header', { scrolled: isScrolled }]">

    <!-- 로고 -->
    <div class="logo" @click="goHome">
      🎬 MovieDB
    </div>

    <!-- 네비게이션 -->
    <nav class="nav">
      <RouterLink to="/" class="nav-item" :class="{ active: isActive('/') }">홈</RouterLink>
      <RouterLink to="/popular" class="nav-item" :class="{ active: isActive('/popular') }">대세 콘텐츠</RouterLink>
      <RouterLink to="/search" class="nav-item" :class="{ active: isActive('/search') }">검색</RouterLink>
      <RouterLink to="/wishlist" class="nav-item" :class="{ active: isActive('/wishlist') }">추천목록</RouterLink>
    </nav>

    <!-- 로그인 정보 -->
    <div class="user-area">
      <span v-if="currentUser" class="user-email">
        {{ currentUser.id }}
      </span>

      <button
          v-if="currentUser"
          class="logout-btn"
          @click="logout"
      >
        로그아웃
      </button>
    </div>

  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const currentUser = ref(JSON.parse(localStorage.getItem("currentUser") || "null"));
const isScrolled = ref(false);

// 스크롤 시 헤더 투명도 변경
function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 현재 route 확인
function isActive(path: string) {
  return route.path === path;
}

// 로고 클릭 시 홈으로 이동
function goHome() {
  router.push("/");
}

// 로그아웃
function logout() {
  localStorage.removeItem("currentUser");
  alert("로그아웃 되었습니다.");
  router.push("/signin");
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 70px;
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(6px);
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 30px;
  box-sizing: border-box;
  z-index: 100;

  transition: background 0.25s ease, height 0.25s ease;
}

/* 스크롤 시 줄어드는 효과 */
.header.scrolled {
  background: rgba(15, 15, 15, 0.95);
  height: 60px;
}

.logo {
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  color: white;
}

/* 네비게이션 */
.nav {
  display: flex;
  gap: 24px;
}

.nav-item {
  color: #ddd;
  text-decoration: none;
  font-size: 16px;
  transition: 0.2s;
}

.nav-item:hover {
  color: #fff;
}

.nav-item.active {
  color: #ff3b57;
  font-weight: 700;
}

/* 유저 영역 */
.user-area {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-email {
  color: #ffbfbf;
  font-size: 14px;
}

.logout-btn {
  padding: 6px 12px;
  background: #ff3b57;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.logout-btn:hover {
  background: #ff5d74;
}
</style>
