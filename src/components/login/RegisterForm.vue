<template>
  <div class="register-container">
    <h2 class="title">회원가입</h2>

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
            :type="showApiKey ? 'text' : 'password'"
            id="apikey"
            v-model="apiKey"
            placeholder="TMDB API Key 입력"
        />
        <span class="toggle-btn" @click="showApiKey = !showApiKey">
      {{ showApiKey ? '🙈' : '👁' }}
    </span>
      </div>
    </div>

    <!-- TMDB API Key 확인 -->
    <div class="form-group password-wrap">
      <label for="apikey2">TMDB API Key 확인</label>

      <div class="password-field">
        <input
            :type="showApiKeyConfirm ? 'text' : 'password'"
            id="apikey2"
            v-model="apiKeyConfirm"
            placeholder="TMDB API Key 다시 입력"
        />
        <span class="toggle-btn" @click="showApiKeyConfirm = !showApiKeyConfirm">
      {{ showApiKeyConfirm ? '🙈' : '👁' }}
    </span>
      </div>
    </div>

    <!-- 약관 동의 -->
    <div class="terms-box">
      <input id="terms" type="checkbox" v-model="agreeTerms" />
      <label for="terms">필수 약관에 동의합니다</label>
    </div>

    <!-- 에러 메시지 -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <button class="register-btn" @click="handleRegister">회원가입</button>

    <p class="switch-text">
      이미 계정이 있나요?
      <span class="switch-btn" @click="switchToLogin">로그인</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { validateApiKey } from "@/composables/useValidateApiKey";

const email = ref("");
const apiKey = ref("");
const apiKeyConfirm = ref(""); // 🔥 추가됨
const agreeTerms = ref(false);
const errorMessage = ref("");
const showApiKey = ref(false);
const showApiKeyConfirm = ref(false);

const emit = defineEmits(["switch-login"]);

function switchToLogin() {
  emit("switch-login");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleRegister() {
  // 이메일 검증
  if (!isValidEmail(email.value)) {
    errorMessage.value = "올바른 이메일 형식이 아닙니다.";
    return;
  }

  // 🔥 API Key 두 번 입력 일치 여부 확인
  if (apiKey.value !== apiKeyConfirm.value) {
    errorMessage.value = "TMDB API Key가 서로 일치하지 않습니다.";
    return;
  }

  // 약관 체크
  if (!agreeTerms.value) {
    errorMessage.value = "약관 동의가 필요합니다.";
    return;
  }

  // TMDB API Key 검증
  const isValid = await validateApiKey(apiKey.value);

  if (!isValid) {
    errorMessage.value = "TMDB API Key가 유효하지 않습니다.";
    return;
  }

  // LocalStorage 저장
  const accountData = {
    id: email.value,
    apiKey: apiKey.value, // 🔥 비밀번호 = TMDB API KEY
  };

  localStorage.setItem("userAccount", JSON.stringify(accountData));

  alert("회원가입 완료! 로그인해주세요.");
  emit("switch-login");
}
</script>


<style scoped>
.register-container {
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
  margin-bottom: 12px;
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

.terms-box {
  display: flex;
  align-items: center;
  gap: 8px;
}

.register-btn {
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

.register-btn:hover {
  background: #3b5ae1;
}

.switch-text {
  text-align: center;
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

