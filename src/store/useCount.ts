export const useCount = defineStore('useCount', () => {
  const count = ref(0);

  return {
    count,
  };
});