<template>
    <transition name="slide">
      <div v-if="event" class="fixed inset-0 z-40" @click="closePopup">
        <aside
          class="absolute left-0 top-0 w-1/3 h-full bg-white shadow-lg z-50 flex flex-col"
          @click.stop
        >
          <div class="flex justify-between items-center bg-blue-600 p-4">
            <div>
              <h2 class="text-2xl text-white font-bold">{{ event.title }}</h2>
              <p class="text-gray-200">{{ formatEventTime(event) }}</p>
            </div>
            <button class="text-white mb-4 cursor-pointer" @click="closePopup">
              <font-awesome-icon class="text-3xl text-center" :icon="['fas', 'xmark']" />
            </button>
          </div>
  
          <!-- Détails supplémentaires -->
          <div class="mt-4 pt-4 p-4">
            <h3 class="text-lg font-semibold">Client</h3>
            <p class="text-gray-700"><strong>Nom :</strong> {{ event.clientName }}</p>
            <p class="text-gray-700"><strong>Adresse :</strong> {{ event.clientAddress }}</p>
            <p class="text-gray-700"><strong>Contact :</strong> {{ event.contact }}</p>
          </div>
  
          <div class="mt-4 pt-4 p-4 ">
            <h3 class="text-lg font-semibold">Détails de la mission</h3>
            <p class="text-gray-700">{{ event.description }}</p>
          </div>
        </aside>
      </div>
    </transition>
  </template>
  
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  import { DateTime } from "luxon";
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  
  const props = defineProps({
    event: Object,
  });
  
  const emit = defineEmits(["close"]);
  
  const closePopup = () => {
    emit("close");
  };
  
  // Formatage de l’heure d’un événement
  const formatEventTime = (event) => {
    const start = DateTime.fromISO(event.start).toFormat("HH:mm");
    const end = DateTime.fromISO(event.end).toFormat("HH:mm");
    return `${start} - ${end}`;
  };
  </script>
  
  <style scoped>
  /* Animation du glissement */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-100%);
  }
  </style>
  