<script setup>
import { useAuthUser, signOut } from "@/composables/useAuth";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const user = useAuthUser();
const route = useRoute();
const router = useRouter();

const toggleAside = () => {
  if (route.path === "/planning") {
    document.dispatchEvent(new Event("toggle-aside")); // 🔹 Déclenche l'ouverture de RequestAside
  } else {
    sessionStorage.setItem("openAsideOnLoad", "true");
    router.push("/planning");
  }
};
</script>

<template>
  <header class="bg-blue-600 p-4 text-white">
    <nav class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">QuickBook</h1>

      <ul class="flex space-x-4">
        <li><NuxtLink to="/" class="hover:underline">Accueil</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/booking" class="hover:underline">Réserver</NuxtLink></li>

        <!-- Bouton qui ouvre RequestAside -->
        <li v-if="user">
          <button @click="toggleAside" class="hover:underline bg-white text-blue-600 px-3 py-1 rounded">
            📩 Voir demandes
          </button>
        </li>

        <li v-if="user"><NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink></li>
        <li v-if="user">
          <button @click="signOut" class="hover:underline">Déconnexion</button>
        </li>
      </ul>
    </nav>
  </header>
</template>
