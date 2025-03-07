<script setup lang="ts">
import { ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// 📌 Liste des événements test
const events = ref([
  { title: "Réparation évier", date: "2025-03-12T16:00" },
  { title: "Débouchage évier", date: "2025-03-11" },
  { title: "Révision plomberie", date: "2025-03-12" }
]);

// 📌 Options du calendrier
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridWeek",
  events: events.value, // On passe directement la ref `events`
  dateClick: (arg: any) => {
    alert("Date cliquée : " + arg.dateStr);
  }
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Test du calendrier (approche fonctionnelle)</h1>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<style scoped>
.custom-calendar {
  max-width: 100%;
  height: auto;
}
</style>
