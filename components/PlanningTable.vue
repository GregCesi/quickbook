<template>
    <div>
      <h2 class="text-xl font-bold mb-4 text-center">Planning de la semaine</h2>
  
      <!-- Boutons de navigation -->
      <div class="flex justify-center gap-4 mb-4">
        <button @click="changeWeek(-1)" class="px-4 py-2 bg-gray-200 rounded">⬅️ Semaine précédente</button>
        <button @click="resetToCurrentWeek" class="px-4 py-2 bg-blue-500 text-white rounded">Aujourd'hui</button>
        <button @click="changeWeek(1)" class="px-4 py-2 bg-gray-200 rounded">Semaine suivante ➡️</button>
      </div>
  
      <!-- Tableau du planning -->
      <div class="w-full overflow-x-auto">
        <div class="relative">
          <table class="border-collapse border border-gray-400 w-full text-center relative">
            <thead>
              <tr class="bg-gray-200">
                <th class="border border-gray-400 p-2 w-20"></th>
                <th v-for="day in weekDays" :key="day.toISODate()" 
                    class="border border-gray-400 p-2"
                    :class="{'bg-gray-300': isDayOff(day)}">
                  {{ day.toFormat('EEEE dd/MM') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="hour in hours" :key="hour"
                  :class="{'bg-gray-200': isHourOff(hour)}">
                <td class="border border-gray-400 p-2 w-[5%]">{{ hour }}:00</td>
                <td
                    v-for="day in weekDays"
                    :key="day.toISODate()"
                    class="border border-gray-400 relative h-12 w-[12%]"
                    :class="getCellClass(day, hour)"
                    @click="handleCellClick(day, hour)"
                >
                    <template v-for="event in getEventsForDay(day)" :key="event.title">
                        <div
                        v-if="isEventStartInHour(event, hour)"
                        class="absolute mt-[2px] left-1 right-1 text-white p-1 rounded-md text-xs flex flex-col justify-start items-start cursor-pointer"
                        :style="{
                            backgroundColor: event.color,
                            top: `${getEventOffset(event)}%`,
                            height: `${getEventHeight(event)}%`
                        }"
                        >
                        <span class="font-bold text-[10px]">{{ event.title }}</span>
                        <span class="text-[10px] opacity-80">{{ formatEventTime(event) }}</span>
                        </div>
                    </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Popup -->
      <EventPopup :event="selectedEvent" @close="closePopup" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { usePlanning } from "~/composables/usePlanning";
  import { DateTime } from "luxon";
  import EventPopup from "~/components/EventPopup.vue";
  import { useReservations } from '~/composables/useReservations';

  const events = ref([])

    onMounted(async () => {
    events.value = await useReservations()
    console.log("🔍 Données reçues dans PlanningTable.vue :", events.value);
  })
  
  const { weekDays, changeWeek, resetToCurrentWeek } = usePlanning();
  const hours = ref(Array.from({ length: 13 }, (_, i) => i + 8));

  const daysOff = ref([""]); // Liste des jours non travaillés (format français)
  const hoursOff = ref([]); // Liste des heures de pause (ex: 12h-13h)
  
  // État pour gérer l'événement sélectionné
  const selectedEvent = ref(null);
  
  const openPopup = (event) => {
    selectedEvent.value = event;
  };
  
  const closePopup = () => {
    selectedEvent.value = null;
  };
  

  const getEventsForDay = (day) => {
    return events.value.filter(event => {
      return DateTime.fromISO(event.start).hasSame(day, "day");
    });
  };
  
  // Vérifier si un événement doit être affiché à CETTE heure précise
  const isEventStartInHour = (event, hour) => {
    const start = DateTime.fromISO(event.start);
    return start.hour === hour;
  };
  
  // Calcule le décalage vertical en %
  const getEventOffset = (event) => {
    const start = DateTime.fromISO(event.start);
    return (start.minute / 60) * 100;
  };
  
  // Calcule la hauteur en fonction de la durée en minutes
  const getEventHeight = (event) => {
    const start = DateTime.fromISO(event.start);
    const end = DateTime.fromISO(event.end);
    const totalMinutes = end.diff(start, "minutes").minutes;
    return (totalMinutes / 60) * 100;
  };
  
  // Formatage de l’heure d’un événement
  const formatEventTime = (event) => {
    const start = DateTime.fromISO(event.start).toFormat("HH:mm");
    const end = DateTime.fromISO(event.end).toFormat("HH:mm");
    return `${start} - ${end}`;
  };

  const handleCellClick = (day, hour) => {
  const event = events.value.find(event => {
    const start = DateTime.fromISO(event.start);
    const end = DateTime.fromISO(event.end);
    return start.hasSame(day, "day") && start.hour <= hour && end.hour > hour;
  });

  if (event) {
    openPopup(event);
  }
};

const isEventInHour = (day, hour) => {
  return events.value.some(event => {
    const start = DateTime.fromISO(event.start);
    const end = DateTime.fromISO(event.end);
    return start.hasSame(day, "day") && start.hour <= hour && end.hour > hour;
  });
};

// Vérifier si un jour est un jour off (colonne grisée)
const isDayOff = (day) => {
  return daysOff.value.includes(day.setLocale('fr').toFormat('EEEE').toLowerCase());
};

// Vérifier si une heure est une heure off (ligne grisée)
const isHourOff = (hour) => {
  return hoursOff.value.includes(hour);
};

const getCellClass = (day, hour) => {
  if (isDayOff(day) || isHourOff(hour)) {
    return "bg-gray-300"; // Une seule classe pour la couleur
  }
  return isEventInHour(day, hour) ? "cursor-pointer" : "";
};


  </script>
