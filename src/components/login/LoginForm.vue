<template>
  <div class="login-container">
    <h2 class="title">로그인</h2>

    <!-- 이메일 입력 -->
    <div class="form-group">
      <label for="email">아이디(이메일)</label>
      <input
          id="email"
          type="email"
          v-model="email"
          placeholder="example@domain.com"
      />
    </div>

    <!-- TMDB API Key 입력 -->
    <div class="form-group password-wrap">
      <label for="apikey">TMDB API Key (비밀번호 역할)</label>

      <div class="password-field">
        <input
            :type="showPassword ? 'text' : 'password'"
            id="apikey"
            v-model="apiKey"
            placeholder="TMDB API Key 입력"
        />

        <span class="toggle-btn" @click="showPassword = !showPassword">
      {{ showPassword ? '🙈' : '👁' }}
    </span>
      </div>
    </div>


    <!-- 자동 로그인 -->
    <div class="remember-box">
      <input id="remember" type="checkbox" v-model="rememberMe" />
      <label for="remember">자동 로그인 (Remember Me)</label>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <button class="login-btn" @click="handleLogin">로그인</button>

    <p class="switch-text">
      계정이 없나요?
      <span class="switch-btn" @click="switchToRegister">회원가입</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { validateApiKey } from "@/composables/useValidateApiKey";

const router = useRouter();

const showPassword = ref(false);
const email = ref("");
const apiKey = ref(""); // 🔥 password 대신 TMDB API KEY
const rememberMe = ref(false);
const errorMessage = ref("");

const emit = defineEmits(["switch-register"]);

function switchToRegister() {
  emit("switch-register");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleLogin() {
  if (!isValidEmail(email.value)) {
    errorMessage.value = "올바른 이메일 형식이 아닙니다.";
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("userAccount") || "null");

  if (!storedUser) {
    errorMessage.value = "등록된 계정이 없습니다.";
    return;
  }

  // 이메일 체크
  if (email.value !== storedUser.id) {
    errorMessage.value = "아이디가 일치하지 않습니다.";
    return;
  }

  // TMDB API Key 체크 (비밀번호 역할)
  if (apiKey.value !== storedUser.apiKey) {
    errorMessage.value = "TMDB API Key(비밀번호)가 일치하지 않습니다.";
    return;
  }

  // API Key 실제 검증
  const isValid = await validateApiKey(apiKey.value);
  if (!isValid) {
    errorMessage.value = "TMDB API Key가 유효하지 않습니다.";
    return;
  }

  // 로그인 저장
  const loginData = {
    id: storedUser.id,
    apiKey: apiKey.value,
    loggedIn: true,
    rememberMe: rememberMe.value,
  };

  localStorage.setItem("currentUser", JSON.stringify(loginData));

  alert("로그인 성공!");
  router.push("/");
}
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 380px;
  margin: 60px auto;
  padding: 24px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
}

.remember-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: -8px;
}

.login-btn {
  padding: 10px;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
  transition: 0.2s;
}

.login-btn:hover {
  background: #3b5ae1;
}

.switch-text {
  text-align: center;
  margin-top: 6px;
}

.switch-btn {
  color: #4a6cf7;
  font-weight: 600;
  cursor: pointer;
  margin-left: 4px;
}

.error {
  color: #e63946;
  font-size: 14px;
  margin-top: -10px;
}

.password-field {
  position: relative;
  display: flex;
  align-items: center;
}

.password-field input {
  width: 100%;
  padding-right: 40px;
}

.toggle-btn {
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
}

</style>




