<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router"; // 🔹 Ajout de `useRouter`

// Import du composable d'authentification
const { signIn, user, signOut } = useAuth();
const router = useRouter(); // 🔹 Initialisation du router

const email = ref("");
const password = ref("");
const errorMessage = ref("");

// 🔹 Redirection si l'utilisateur est déjà connecté
watch(user, () => {
  if (user.value) {
    router.push("/dashboard"); // 🔹 Redirige vers le dashboard si connecté
  }
});

// 🔹 Fonction de connexion
const handleSignIn = async () => {
  try {
    await signIn(email.value, password.value);
    errorMessage.value = "";
    router.push("/dashboard"); // 🔹 Redirection après connexion
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="auth-container">
    <h1>Connexion Plombier</h1>

    <!-- 🔹 Si l'utilisateur est connecté, affichage d'un message et du bouton de déconnexion -->
    <div v-if="user">
      <p>Connecté en tant que {{ user.email }}</p>
      <button @click="signOut">Se déconnecter</button>
    </div>

    <!-- 🔹 Formulaire de connexion uniquement si l'utilisateur n'est pas connecté -->
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
