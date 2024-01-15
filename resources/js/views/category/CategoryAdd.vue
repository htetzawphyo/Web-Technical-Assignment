<template>
  <Navbar />
  <Sidebar />

  <div class="p-6 mt-12 md:ml-64">
    <div>
      <h1 class="text-md">
        <span class="mr-3">Category List</span>
        <font-awesome-icon icon="fa-solid fa-angle-right" />
        <span class="text-indigo-500 ml-3">Category Add</span>
      </h1>
    </div>

    <div class="mb-7 mt-5 bg-indigo-100 ps-3 py-1 rounded-md text-md">
      Add Category
    </div>

    <form @submit.prevent="handleCategory">
      <div class="mb-7 w-2/4 max-md:w-full">
          <label for="category-name" class="block mb-2 text-sm font-medium required">Category Name</label>
          <input v-model="name" type="text" id="category-name" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none" placeholder="Input Name">
          <i v-if="getErrMsg.name" class="text-red-600 font-thin">{{ getErrMsg.name[0] }}</i>
      </div>
  
      <div class="mb-7 w-2/4 max-md:w-full">
        <label for="" class="block mb-2 text-sm font-medium required">Category Photo</label>
        <ImageUpload @imageUpload="handleImage"/>
        <i v-if="getErrMsg.image" class="text-red-600 font-thin">{{ getErrMsg.image[0] }}</i>
      </div>
  
      <div class="mb-7 w-2/4 max-md:w-full">
          <input v-model="publish" id="status" type="checkbox" value="1" class="w-4 h-4  cursor-pointer">
          <label for="status" class="ms-2 text-md font-medium cursor-pointer">Publish</label>
      </div>

      <div class="flex gap-2 w-2/4 max-md:w-full">
        <router-link :to="{ name: 'category' }" class="bg-gray-200 px-6 pb-2 pt-2.5 text-xs rounded-md text-indigo-700">
          Cancle
        </router-link>
        <button type="submit" class="bg-indigo-500 px-6 pb-2 pt-2.5 text-xs rounded-md text-neutral-200">
          Save
        </button>
      </div>
    </form>
  </div>

</template>

<script setup>
    import Navbar from '../../components/Navbar.vue';
    import Sidebar from '../../components/Sidebar.vue';
    import ImageUpload from '../../components/ImageUpload.vue';
    import { ref } from 'vue';
    import { useCategoryStore } from '../../store/Category';
    import { storeToRefs } from 'pinia';

    const categoryStore = useCategoryStore();
    const { getErrMsg } = storeToRefs(categoryStore);

    const name = ref('');
    const image = ref('');
    const publish = ref(null);

    const handleImage = (imageFile) => {
      image.value = imageFile;
    }

    const handleCategory = () => {
      const category = {
        name: name.value,
        image: image.value ? image.value : null,
        publish: publish.value 
      }

      categoryStore.addCategory(category);
    }
</script>