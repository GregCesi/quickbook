<script setup lang="ts">
import { ref } from "vue";
import { signIn, signOut, useAuthUser } from "@/composables/useAuth";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const user = useAuthUser(); // Récupère l'utilisateur connecté

const handleSignIn = async () => {
  const error = await signIn(email.value, password.value);
  errorMessage.value = error ?? "";
};
</script>

<template>
  <div class="auth-container">
    <h1>Connexion Plombier</h1>

    <div v-if="user">
      <p>Connecté en tant que {{ user.email ?? "Utilisateur inconnu" }}</p>
      <button @click="signOut">Se déconnecter</button>
    </div>

    <div v-else>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <button @click="handleSignIn">Se connecter</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}
button {
  margin: 10px;
  padding: 10px 15px;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
