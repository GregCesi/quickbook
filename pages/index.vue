<script setup lang="ts">
const { $supabase } = useNuxtApp();

const testConnection = async () => {
  const { data, error } = await $supabase.from('reservations').select('*');
  if (error) {
    console.error('❌ Erreur Supabase:', error.message);
  } else {
    console.log('✅ Réservations récupérées:', data);
  }
};
</script>

<template>
  <div>
    <h1>QuickBook - Test Supabase</h1>
    <button @click="testConnection">Tester connexion</button>
  </div>
</template>
