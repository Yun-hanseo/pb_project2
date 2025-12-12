<template>
  <div class="auth-wrapper">
    <!-- 로그인 / 회원가입 전환 애니메이션 -->
    <transition name="auth-fade" mode="out-in">
      <LoginForm
          v-if="isLogin"
          key="login"
          @switch-register="switchToRegister"
      />

      <RegisterForm
          v-else
          key="register"
          @switch-login="switchToLogin"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 자식 컴포넌트 (아직 구현 전)
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";

// 기본 화면은 로그인
const isLogin = ref(true);

function switchToRegister() {
  isLogin.value = false;
}

function switchToLogin() {
  isLogin.value = true;
}
</script>

<style scoped>
.auth-wrapper {
  width: 100%;
  max-width: 420px;
  margin: 80px auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 간단한 전환 효과 */
.auth-fade-enter-active,
.auth-fade-leave-active {
  transition: all 0.3s ease;
}

.auth-fade-enter-from,
.auth-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
