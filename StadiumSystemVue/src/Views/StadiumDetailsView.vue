<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">🏟️ Stadium Details</h2>
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div v-else-if="stadium" class="card mx-auto shadow p-4" style="max-width: 600px">
      <img :src="stadium.imageUrl || defaultImage" :alt="stadium.name" class="img-fluid mb-3" />
      <h3>{{ stadium.name }}</h3>
      <p><strong>ID:</strong> {{ stadium.id }}</p>
      <p><strong>Description:</strong> {{ stadium.description || "No description available." }}</p>

      <button class="btn btn-success mt-2" @click="handleReserve">
        Reserve This Stadium
      </button>
    </div>
    <div v-else class="alert alert-danger">Stadium not found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api";

const route = useRoute();
const router = useRouter();

const stadium = ref(null);
const loading = ref(true);
const defaultImage = "https://via.placeholder.com/400x200.png?text=No+Image";

const fetchStadium = async () => {
  try {
    const response = await api.get(`/api/StadiumsApi/${route.params.id}`);
    stadium.value = response.data;
  } catch (error) {
    console.error("Error fetching stadium:", error);
  } finally {
    loading.value = false;
  }
};

const handleReserve = async () => {
  try {
    const response = await api.get("/api/Account/IsAuthenticated");
    if (response.data === true) {
      router.push(`/stadiums/${stadium.value.id}/reserve`);
    } else {
      alert("⚠️ Please login first to make a reservation.");
      router.push("/login");
    }
  } catch (error) {
    console.error("Error checking authentication status:", error);
    alert("An error occurred. Please try again.");
  }
};

onMounted(fetchStadium);
</script>

<style scoped>
img {
  object-fit: cover;
  max-height: 300px;
}
</style>
