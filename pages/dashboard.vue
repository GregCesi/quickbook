<script setup>
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const { user } = useAuth();
const router = useRouter();

// Vérifie que l'utilisateur est bien connecté, sinon redirection
if (!user) {
  router.push("/");
}
</script>

<template>
  <div>
    <h1>Bienvenue sur votre espace plombier</h1>
  </div>
</template>
