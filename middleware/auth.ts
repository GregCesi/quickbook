import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useSupabaseUser } from "#imports";

export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser();

  if (!user.value) {
    console.log("🚨 Middleware : utilisateur non connecté, redirection !");
    console.log("user.value : ", user.value);
    return navigateTo("/");
  }
});
