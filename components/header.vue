<script setup lang="ts">
import { useAuthUser, signOut } from "@/composables/useAuth";

const user = useAuthUser(); // 🔹 Récupération de l'utilisateur connecté
</script>

<template>
  <header class="bg-blue-600 p-4 text-white">
    <nav class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">QuickBook</h1>

      <ul class="flex space-x-4">
        <!-- 🔹 Liens visibles pour tout le monde -->
        <li><NuxtLink to="/" class="hover:underline">Accueil</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/booking" class="hover:underline">Réserver</NuxtLink></li>

        <!-- 🔹 Affichage du dashboard SEULEMENT si l'utilisateur est connecté -->
        <li v-if="user"><NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink></li>
        <li v-if="user">
          <button @click="signOut" class="hover:underline">Déconnexion</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
