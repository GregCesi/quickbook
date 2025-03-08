<script setup>
import Header from "@/components/header.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Ajoute les icônes nécessaires à la librairie
library.add(faTimes);
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>
