<template>
  <div class="container mt-4">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          required
        />
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
    <div v-if="error" class="alert alert-danger mt-2">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const login = async () => {
  try {
    await api.post("/api/Auth/login", {
      email: email.value,
      password: password.value,
    });
    router.push("/");
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>
