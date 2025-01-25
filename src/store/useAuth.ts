import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // Estado reactivo
  const user = ref<null | string>(null);

  // Métodos
  const setUser = (newUser: string) => {
    user.value = newUser;
  };

  const clearUser = () => {
    user.value = null;
  };

  // Exponer estado y métodos
  return {
    user,
    setUser,
    clearUser,
  };
});
