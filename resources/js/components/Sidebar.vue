<template>
    <aside :class="{ 'translate-x-0': !toggleStore.isSidebarOpen }" id="logo-sidebar" class="fixed top-0 left-0 z-50 w-64 h-screen  transition-transform -translate-x-full bg-indigo-100 border-r border-gray-200 md:translate-x-0 " aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-indigo-100 mt-4 rounded shadow ">
            <div>
                <router-link :to="{name: 'login'}" class="flex justify-center">
                    <font-awesome-icon icon="fa-solid fa-tents" class="h-6 mr-3 whitespace-nowrap text-gray-700" alt="Logo"/>
                    <span class="self-center text-md font-semibold sm:text-2xl whitespace-nowrap text-gray-700">Admin Panel</span>
                </router-link>
            </div>
            <ul class="mb-2 space-y-2 font-medium text-sm mt-5">
                <li>
                    <router-link :to="{name: 'item'}" class="flex items-center p-2 text-gray-900 hover:bg-indigo-300 hover:rounded-sm">
                        <font-awesome-icon icon="fa-solid fa-table-cells-large" class="w-5 h-5 "/>
                        <span class="ml-3 ">Item</span>
                    </router-link>
                </li>    
                <li>
                    <router-link :to="{name: 'category'}" class="flex items-center p-2 text-gray-900 hover:bg-indigo-300 hover:rounded-sm">
                        <font-awesome-icon icon="fa-solid fa-list" class="w-5 h-5"/>
                        <span class="ml-3">Category</span>
                    </router-link>
                </li>
            </ul>
            <ul class="absolute bottom-16 font-medium text-sm cursor-pointer w-11/12">  
                <li class="flex items-center p-2 text-gray-900 hover:bg-indigo-300 hover:rounded-sm" @click="handleLogout">
                    <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="w-5 h-5"/>    
                    <span class="ml-3">Logout</span>
                </li>
            </ul>
        </div>
    </aside>    
</template>

<script setup>
    import { useAuthStore } from '../store/Auth';
    import { useToggleStore } from '../store/Toggle';

    const toggleStore = useToggleStore();

    const authStore = useAuthStore();

    const handleLogout = () => {
        authStore.logout();
    }
</script>

<style scoped>
    .router-link-active {
        border-radius: 5px;
        background-color: #5e69cd;
        color: aliceblue;
    }
</style>