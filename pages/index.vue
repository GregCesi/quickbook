<script setup lang="ts">
import { useSupabaseClient } from "#imports";

const supabase = useSupabaseClient();

const testConnection = async () => {
  try {
    const { data, error } = await supabase.from("reservations").select("*");
    if (error) {
      console.error("❌ Erreur Supabase:", error.message);
    } else {
      console.log("✅ Réservations récupérées:", data);
    }
  } catch (err) {
    console.error("⚠️ Une erreur inattendue est survenue :", err);
  }
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">QuickBook - Test Supabase</h1>
    <button @click="testConnection" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Tester connexion
    </button>
    <FontAwesomeIcon :icon="['fas', 'times']" />
  </div>
</template>
