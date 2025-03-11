<template>
    <aside class="fixed top-16 right-0 h-full bg-white shadow-lg z-50 w-1/4 transition-all duration-300">
      <!-- En-tête -->
      <div class="flex justify-between items-center bg-blue-600 p-4 text-white">
        <h2 class="text-lg font-bold">Demandes en attente</h2>
        <button @click="$emit('close')" class="text-white text-2xl">&times;</button>
      </div>
  
      <!-- Contenu (Actuellement vide, on le remplira plus tard) -->
      <div class="p-4">
        <p class="text-gray-500">Aucune demande pour le moment.</p>
      </div>
    </aside>
  </template>
  
  <script setup>
  defineEmits(["close"]); // Permet au bouton de fermer l'aside
  </script>
  