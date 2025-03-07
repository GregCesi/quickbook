import { useSupabaseClient, useSupabaseUser } from "#imports";
import { navigateTo } from "#app";

// 🔹 Fonction de connexion avec email et mot de passe
export async function signIn(email: string, password: string) {
  const supabase = useSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("❌ Erreur de connexion :", error.message);
    return error.message;
  }

  console.log("✅ Connexion réussie !");
  await navigateTo("/dashboard"); // Redirection vers le tableau de bord
}

// 🔹 Fonction de déconnexion
export async function signOut() {
  const supabase = useSupabaseClient();
  await supabase.auth.signOut();
  console.log("👋 Déconnecté !");
  await navigateTo("/");
}

// 🔹 Fonction pour récupérer l'utilisateur connecté
export function useAuthUser() {
  return useSupabaseUser(); // Récupère automatiquement l'utilisateur connecté
}
