import { ref, computed } from "vue";
import { DateTime, Settings } from "luxon";

// Définir la langue en français
Settings.defaultLocale = "fr";

// Initialisation de la date du lundi de la semaine en cours
const currentMonday = ref(DateTime.now().startOf("week").setZone("Europe/Paris"));

// Fonction pour changer de semaine
const changeWeek = (offset: number) => {
  currentMonday.value = currentMonday.value.plus({ weeks: offset });
};

// Calculer les 7 jours de la semaine actuelle
const weekDays = computed(() =>
  Array.from({ length: 7 }, (_, i) => currentMonday.value.plus({ days: i }))
);

const resetToCurrentWeek = () => {
    currentMonday.value = DateTime.now().startOf("week").setZone("Europe/Paris");
  };
  

// Exporter les variables et fonctions
export const usePlanning = () => {
  return {
    weekDays,
    changeWeek,
    currentMonday,
    resetToCurrentWeek
  };
};
