<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4 text-center">Demande de rendez-vous</h2>

    <form @submit.prevent="submitBooking">
      <!-- Informations du client -->
      <div class="mb-4">
        <label class="block text-gray-700">Nom :</label>
        <input v-model="form.name" type="text" class="w-full border rounded p-2" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Adresse :</label>
        <input v-model="form.address" type="text" class="w-full border rounded p-2" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Téléphone :</label>
        <input v-model="form.phone" type="tel" class="w-full border rounded p-2" required />
      </div>

      <!-- Sélection des disponibilités -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold">Disponibilités</h3>
        <p class="text-sm text-gray-500 mb-2">Cochez les jours où vous êtes disponibles et indiquez les heures.</p>

        <div v-for="(day, index) in weekDays" :key="index" class="mb-2">
          <div class="flex items-center justify-around">
            <div class="flex items-center">
              <input type="checkbox" v-model="form.availability[day].available" class="mr-2" />
              <label class="text-gray-700 font-medium w-20">{{ day }}</label>
            </div>

            <!-- Sélection des heures (toujours affichés mais désactivés si non cochés) -->
            <div class="flex items-center gap-2 mt-1">
              <TimePicker
                v-model="form.availability[day].startTime"
                defaultTime="08:00"
                :disabled="!form.availability[day].available"
                class="w-24"
              />
              <span class="text-gray-700">à</span>
              <TimePicker
                v-model="form.availability[day].endTime"
                defaultTime="18:00"
                :disabled="!form.availability[day].available"
                class="w-24"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Description du problème -->
      <div class="mb-4">
        <label class="block text-gray-700">Détails du problème :</label>
        <textarea v-model="form.description" class="w-full border rounded p-2" rows="3"></textarea>
      </div>

      <!-- Bouton de soumission -->
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Envoyer la demande</button>
    </form>

    <!-- Debug -->
    <pre class="mt-4 p-2 bg-gray-100 rounded">{{ form }}</pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TimePicker from "@/components/TimePicker.vue";

// Liste des jours de la semaine en français
const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

// Initialisation du formulaire
const form = ref({
  name: "",
  address: "",
  phone: "",
  description: "",
  availability: weekDays.reduce((acc, day) => {
    acc[day] = { available: false, startTime: "08:00", endTime: "18:00" };
    return acc;
  }, {})
});

// Soumission du formulaire (simulée)
const submitBooking = () => {
  console.log("📩 Demande envoyée :", form.value);
};
</script>
