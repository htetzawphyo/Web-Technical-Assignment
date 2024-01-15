<template>
    <nav class="fixed top-0 z-40 w-full bg-neutral-100 border-b-2 shadow-md">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start " :class="{'ml-64 transition-transform': !toggleStore.isSidebarOpen}">
                    <button @click="toggle" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-indigo-300 focus:outline-none  focus:ring-gray-200 ">
                        <span class="sr-only">Open sidebar</span>
                        <font-awesome-icon icon="fa-solid fa-bars" :class="{hidden: !toggleStore.isSidebarOpen}" class="w-6 h-6 hover:bg-indigo-300"/>
                        <font-awesome-icon icon="fa-solid fa-xmark" :class="{hidden: toggleStore.isSidebarOpen}" class="w-6 h-6 hover:bg-indigo-300"/>
                    </button>
                </div>
                
                <div class="flex items-center">
                    <button type="button" class="flex text-sm bg-indigo-400 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                        <img src="../assets/profile-svg.svg" class="w-8 h-8 rounded-full" alt="User Icon">
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { useToggleStore } from '../store/Toggle';

    const toggleStore = useToggleStore();

    const toggle = () => {
        toggleStore.toggleSidebar();
    }
</script>