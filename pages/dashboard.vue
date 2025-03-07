<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useSupabaseClient, useSupabaseUser } from "#imports";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser(); // ✅ Récupère l'utilisateur connecté

definePageMeta({
  middleware: "auth",
});

const events = ref<{ 
  title: string;
  start: string;
  backgroundColor: string;
  borderColor: string;
}[]>([]);

interface Reservation {
  client_name: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "accepted" | "canceled";
  email: string; // ✅ Ajout de l'email pour filtrer les réservations
}

// ✅ Fonction pour récupérer les rendez-vous du plombier
const fetchReservations = async () => {
  if (!user.value?.email) return;

  console.log("🔍 Récupération des réservations pour :", user.value.email);

  const { data, error } = await supabase
    .from("reservations")
    .select("*") 
    .order("date", { ascending: true });

  if (error) {
    console.error("❌ Erreur lors du chargement des rendez-vous :", error);
    return;
  }

  console.log("📥 Données récupérées depuis Supabase :", data);

  // ✅ Vérification des types et transformation des données pour FullCalendar
  events.value = (data as Reservation[]).map((r) => ({
    title: `${r.client_name} - ${r.service}`,
    start: `${r.date}T${r.time}`, // Format YYYY-MM-DDTHH:MM
    backgroundColor: r.status === "pending" ? "yellow" : r.status === "accepted" ? "green" : "red",
    borderColor: "black",
  }));

  console.log("📅 Événements formatés pour FullCalendar :", events.value);
};

// ✅ Recharge les réservations lorsque l'utilisateur est défini
watchEffect(() => {
  if (user.value) {
    fetchReservations();
  }
});

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridWeek",
  events: events.value, // On passe directement la ref `events`
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Planning des rendez-vous</h1>
    <FullCalendar :options="calendarOptions" />
  </div>
  <div v-for="event in events">{{ console.log("alors", event.start) }}</div>
</template>

<style scoped>
.custom-calendar {
  max-width: 100%;
  height: auto;
}
</style>
