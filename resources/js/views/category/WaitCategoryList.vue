<template>
  <Navbar />
  <Sidebar />

  <div class="p-6 mt-12 md:ml-64">
      <h1 class="text-md text-indigo-500" id="header">Category</h1>

      <div class="flex justify-end">
          <router-link :to="{ name: 'category-add' }" class="bg-indigo-500 px-6 pb-2 pt-2.5 text-xs rounded-md text-neutral-200">
            <font-awesome-icon icon="fa-solid fa-plus" />
            Add Category
          </router-link>
      </div>

      <div v-if="getCategory">
        <DataTable :data="getCategory" :columns="columns" :options="options" class="display" width="100%" id="cateDB" ref="table">
          
        </DataTable>        
      </div>
  </div>
</template>

<script setup>
    import Navbar from '../../components/Navbar.vue';
    import Sidebar from '../../components/Sidebar.vue';
    import { ref, onMounted } from 'vue';
    import { useCategoryStore } from '../../store/Category';
    import { storeToRefs } from 'pinia';
    import DataTable from 'datatables.net-vue3';
    import DataTablesCore from 'datatables.net';

    const categoryStore = useCategoryStore();
    const { getCategory } = storeToRefs(categoryStore);

    categoryStore.indexCategory();

    const table = ref();
    
    DataTable.use(DataTablesCore);

    const options = ref({
      searching: false,
      lengthMenu: [10, 15, 25],
      pageLength: 10,
    });

    const data = ref();

    const columns = ([
      {
        data: 'id', title: 'Action',
        render: (data) => {
          return  `
            <div class="flex items-center px-6 py-4 gap-3">
              <div class="cursor-pointer bg-green-600 p-1 rounded-md" id="edit${data}">
                <svg class="w-[20px] h-[20px] fill-[#d1e5d4] " viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
              </div>
              <div class="cursor-pointer bg-red-600 p-1 rounded-md" @click="handleDeleteClick()">
                <svg class="w-[20px] h-[20px] fill-[#d1e5d4]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
                </svg>  
              </div>
            </div>
          `
        }
      },
      {data: 'id', title: 'No',
        render: (data, type, row, meta) => {
          return `
            ${meta.row + meta.settings._iDisplayStart + 1}
          `
        }
      },
      {data: 'name', title: 'Category'},
      {data: 'publish', title: 'Publish',
        targets: -1,
        render: (data) => {
          return `
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" ${data == 1 ? 'checked' : ''}>
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
            </label>
          `
        }
      },
    ]);
</script>

<style scoped>

</style>