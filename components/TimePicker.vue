<template>
  <div class="relative w-full">
    <input
      ref="timeInput"
      type="time"
      v-model="selectedTime"
      class="border rounded p-2 w-full cursor-pointer"
      :class="{ 'bg-gray-200 text-gray-500 cursor-not-allowed': disabled }"
      :disabled="disabled"
      @focus="openPicker"
      @input="updateTime"
    />
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted } from "vue";

const props = defineProps({
  modelValue: String,
  defaultTime: { type: String, default: "08:00" }, // Heure par défaut
  disabled: { type: Boolean, default: false } // Désactivation du champ si besoin
});

const selectedTime = ref(props.modelValue || props.defaultTime);
const emit = defineEmits(["update:modelValue"]);

// Mettre à jour la valeur lorsqu'on sélectionne une heure
const updateTime = () => {
  emit("update:modelValue", selectedTime.value);
};

// Appliquer la valeur par défaut au montage
onMounted(() => {
  if (!props.modelValue) {
    emit("update:modelValue", selectedTime.value);
  }
});

// Ouvre le sélecteur d'heure natif au focus
const openPicker = (event) => {
  if (!props.disabled) {
    event.target.showPicker(); // Permet d'ouvrir le sélecteur d'heure au clic sur l'input
  }
};
</script>

<style scoped>
/* Quand le champ est désactivé, il est grisé */
input:disabled {
  background-color: #e5e7eb; /* gris clair */
  color: #6b7280; /* gris plus foncé */
  cursor: not-allowed;
}
</style>
