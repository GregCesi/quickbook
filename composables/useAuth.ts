import { useNuxtApp } from "#app";
import type { User } from "@supabase/supabase-js";
import { ref, watchEffect } from "vue";

export const useAuth = () => {
  const nuxtApp = useNuxtApp(); // ✅ On récupère NuxtApp correctement
  const $supabase = nuxtApp.$supabase; // ✅ Assurer que $supabase est bien défini
  const user = ref<User | null>(null);

  // 🔹 Vérifier la session utilisateur au chargement
  const fetchUser = async () => {
    if (!$supabase) return; // ✅ Vérifier que Supabase est bien chargé
    const { data } = await $supabase.auth.getUser();
    user.value = data.user ?? null;
  };

  // 🔹 Met à jour `user` automatiquement en cas de connexion/déconnexion
  watchEffect(() => {
    if (!$supabase) return; // ✅ Vérifier que Supabase est bien défini
    $supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user ?? null;
    });
  });

  // 🔹 Connexion
  const signIn = async (email: string, password: string) => {
    if (!$supabase) throw new Error("Supabase non chargé");
    const { data, error } = await $supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    user.value = data.user ?? null;
  };

  // 🔹 Déconnexion
  const signOut = async () => {
    if (!$supabase) throw new Error("Supabase non chargé");
    await $supabase.auth.signOut();
    user.value = null;
  };

  return {
    user,
    signIn,
    signOut,
    fetchUser,
  };
};
