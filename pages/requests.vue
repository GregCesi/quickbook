<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-4 text-center">Demandes de rendez-vous</h2>
  
      <div v-if="requests.length > 0">
        <div v-for="request in requests" :key="request.id" class="border p-4 rounded mb-4">
          <h3 class="text-lg font-semibold">{{ request.client.name }}</h3>
          <p class="text-gray-600">{{ request.client.address }} - {{ request.client.phone }}</p>
          <p class="mt-2"><strong>Problème :</strong> {{ request.description }}</p>
  
          <h4 class="mt-3 font-semibold">Disponibilités :</h4>
          <ul class="list-disc pl-5">
            <li v-for="availability in request.availabilities" :key="availability.id">
              {{ availability.day_of_week }} : {{ availability.start_time }} - {{ availability.end_time }}
            </li>
          </ul>
        </div>
      </div>
  
      <p v-else class="text-center text-gray-500">Aucune demande en attente.</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // 📌 Données brutes en attendant la connexion à la BDD
  const requests = ref([
    {
      id: 1,
      client: {
        id: 3,
        name: "Jean Dupont",
        phone: "06 12 34 56 78",
        address: "12 Rue des Lilas, Paris"
      },
      description: "Fuite sous évier nécessitant une réparation rapide.",
      status: "en attente",
      availabilities: [
        { id: 101, day_of_week: "Lundi", start_time: "08:00", end_time: "12:00" },
        { id: 102, day_of_week: "Mercredi", start_time: "14:00", end_time: "18:00" },
        { id: 103, day_of_week: "Vendredi", start_time: "09:00", end_time: "11:00" }
      ]
    }
  ]);
  </script>
  