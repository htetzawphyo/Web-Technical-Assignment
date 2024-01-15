import { defineStore } from "pinia";
import { ref } from "vue";

export const useToggleStore = defineStore('toggleStore', () => {
    // STATE
    const isSidebarOpen = ref(true);

    // ACTIONS
    const toggleSidebar = () => {
        isSidebarOpen.value = !isSidebarOpen.value; 
    }

    return {isSidebarOpen, toggleSidebar};
})