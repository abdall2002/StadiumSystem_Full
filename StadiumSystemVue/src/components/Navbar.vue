<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">🏟️ Stadium Reservation</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">All Stadiums</router-link>
          </li>

          <li v-if="isAuthenticated && !isAdmin" class="nav-item">
            <router-link class="nav-link" to="/my-reservations">My Reservations</router-link>
          </li>

          <li v-if="isAuthenticated && isAdmin" class="nav-item">
            <router-link class="nav-link" to="/manage-stadiums">Manage Stadiums</router-link>
          </li>

          <li v-if="isAuthenticated && isAdmin" class="nav-item">
            <router-link class="nav-link" to="/manage-reservations">Manage Reservations</router-link>
          </li>
        </ul>

        <ul class="navbar-nav mb-2 mb-lg-0">
          <li v-if="isAuthenticated" class="nav-item d-flex align-items-center text-light me-2">
            Hello, {{ userName }}
          </li>

          <li v-if="isAuthenticated" class="nav-item">
            <button class="btn btn-outline-light btn-sm" @click="logout">Logout</button>
          </li>

          <li v-else class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-else class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(false);
const userName = ref('');
const isAdmin = ref(false);

// 👇 اجلب حالة تسجيل الدخول من الـ API عند تشغيل التطبيق
onMounted(async () => {
  try {
    const response = await fetch('https://localhost:7279/api/Auth', {
      credentials: 'include'
    });
    const data = await response.json();
    isAuthenticated.value = data.isAuthenticated;
    userName.value = data.userName;
    isAdmin.value = data.isAdmin;
  } catch (error) {
    console.error('Error fetching auth status', error);
  }
});

const logout = async () => {
  try {
    await fetch('https://localhost:7279/api/Auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    isAuthenticated.value = false;
    userName.value = '';
    isAdmin.value = false;
    router.push('/login');
  } catch (error) {
    console.error('Logout failed', error);
  }
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
