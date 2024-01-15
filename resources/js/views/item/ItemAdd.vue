<template>
  <Navbar />
  <Sidebar />

  <div class="p-6 mt-12 md:ml-64">
      <div>
        <h1 class="text-md">
          <span class="mr-3">Item List</span>
          <font-awesome-icon icon="fa-solid fa-angle-right" />
          <span class="text-indigo-500 ml-3">Item Add</span>
        </h1>
      </div>
      
      <div class="mt-5 bg-indigo-100 ps-3 py-1 rounded-md text-md">
        Add Items
      </div>

      <form @submit.prevent="handleItem">
        <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-4">

          
          <!-- For Item Information  -->
          <div class="p-4">
              <h3 class="mb-7 text-md font-serif">Item Information</h3>

              <div class="mb-7">
                  <label for="item-name" class="block mb-2 text-sm font-medium required">Item Name</label>
                  <input v-model="name" type="text" id="item-name" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none" placeholder="Input Name">
                  <i v-if="getErrMsg.name" class="text-red-600 font-thin">{{ getErrMsg.name[0] }}</i>
              </div>

              <div class="mb-7">
                <label for="category" class="block mb-2 text-sm font-medium required">Select Category</label>
                <select @change="handleCategory" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none">
                  <option disabled selected>Select category</option>
                  <option v-for="category in getCategory" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
                <i v-if="getErrMsg.category_id" class="text-red-600 font-thin">{{ getErrMsg.category_id[0] }}</i>
              </div>

              <div class="mb-7">
                  <label for="price" class="block mb-2 text-sm font-medium required">Price</label>
                  <input v-model="price" type="text" id="price" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none" placeholder="Enter Price">
                  <i v-if="getErrMsg.price" class="text-red-600 font-thin">{{ getErrMsg.price[0] }}</i>
              </div>

              <div class="mb-7">
                  <label for="description" class="block mb-2 text-sm font-medium required">Description</label>
                  <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                  <i v-if="getErrMsg.description" class="text-red-600 font-thin">{{ getErrMsg.description[0] }}</i>
              </div>

              <div class="mb-7">
                <label for="item-condition" class="block mb-2 text-sm font-medium required">Select Item Condition</label>
                <select @change="handleItemCondition" id="item-condition" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none">
                  <option disabled selected>Select Item Condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="second">Good Second Hand</option>
                </select>
              </div>

              <div class="mb-7">
                <label for="item-type" class="block mb-2 text-sm font-medium required">Select Item Type</label>
                <select @change="handleItemType" id="item-type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none">
                  <option disabled selected>Select Item Type</option>
                  <option value="for_sell">For Sell</option>
                  <option value="for_buy">For Buy</option>
                  <option value="for_exchange">For Exchange</option>
                </select>
              </div>

              <div class="mb-7">
                  <input v-model="publish" id="status" type="checkbox" value="1" class="w-4 h-4  cursor-pointer">
                  <label for="status" class="ms-2 text-md font-medium cursor-pointer">Publish</label>
              </div>

              <div class="mb-7">
                <label for="" class="block mb-2 text-sm font-medium required">Item Photo</label>
                <ImageUpload @imageUpload="handleImage"/>
                <i v-if="getErrMsg.image" class="text-red-600 font-thin">{{ getErrMsg.image[0] }}</i>
              </div>
          </div>

          <!-- For Owner Information  -->
          <div class="p-4">
            <h3 class="mb-7 text-md font-serif">Owner Information</h3>
            
            <div class="mb-7">
                <label for="owner-name" class="block mb-2 text-sm font-medium required">Owner Name</label>
                <input v-model="owner_name" type="text" placeholder="Input Owner Name" id="owner-name" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none">
                <i v-if="getErrMsg.owner_name" class="text-red-600 font-thin">{{ getErrMsg.owner_name[0] }}</i>
            </div>

            <div class="mb-7">
              <label class="block mb-2 text-sm font-medium">Contact Number</label>
              <div class="relative mb-4 flex flex-wrap items-stretch">
                <select @change="handleCountryCode" class="flex items-center whitespace-nowrap rounded-sm border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 focus:outline-none">
                  <option value="+95" selected>+95<font-awesome-icon icon="fa-solid fa-angle-down"/></option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+49">+49</option>
                  <option value="+33">+33</option>
                </select>
                <input type="number" placeholder="Add Number" v-model="contact_number"
                  class="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none " />
              </div>
            </div>

            <div class="mb-7">
              <label for="owner-name" class="block mb-2 text-sm font-medium">Address</label>
              <LocationPicker @setAddress="handleAddress"/>
            </div>

            <div class="flex gap-2">
              <router-link :to="{ name: 'item' }" class="bg-gray-200 px-6 pb-2 pt-2.5 text-xs rounded-md text-indigo-700">
                Cancle
              </router-link>
              <button type="submit" class="bg-indigo-500 px-6 pb-2 pt-2.5 text-xs rounded-md text-neutral-200">
                Save
              </button>
            </div>
          </div>
          
        </div>
      </form>

  </div>
</template>

<script setup>
    import Navbar from '../../components/Navbar.vue';
    import Sidebar from '../../components/Sidebar.vue';
    import LocationPicker from '../../components/LocationPicker.vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import ImageUpload from '../../components/ImageUpload.vue';
    import { ref } from 'vue';
    import { useCategoryStore } from '../../store/Category';
    import { useItemStore } from '../../store/Item';
    import { storeToRefs } from 'pinia';

    const categoryStore = useCategoryStore();
    const { getCategory } = storeToRefs(categoryStore);
    categoryStore.indexCategory();

    const itemStore = useItemStore();
    const { getErrMsg } = storeToRefs(itemStore);

    const editor = ClassicEditor;
    const editorData = ref('');
    const editorConfig = ref({
      placeholder: 'EnterDescription'
    })

    const name = ref('');
    const category_id = ref(null);
    const price = ref('');
    const item_condition = ref(null);
    const item_type = ref(null);
    const publish = ref(null);
    const image = ref('');
    const owner_name = ref('');
    const contact_number = ref('');
    const address = ref('');
    const countryCode = ref('+95');

    const handleImage = (imageFile) => {
      image.value = imageFile;
    }

    const handleAddress = (getAddress) => { 
      address.value = getAddress;
    }

    const handleItemType = (e) => {
      item_type.value = e.target.value;
    }

    const handleItemCondition = (e) => {
      item_condition.value = e.target.value;
    }

    const handleCountryCode = (e) => {
      countryCode.value = e.target.value;
    }

    const handleCategory = (e) => {
      category_id.value = e.target.value;
    }

    const handleItem = () => {
      const item = {
        name: name.value,
        category_id: category_id.value,
        description: editorData.value,
        price: price.value,
        item_condition: item_condition.value,
        item_type: item_type.value,
        publish: publish.value,
        image: image.value ? image.value : null,
        owner_name: owner_name.value,
        contact_number: countryCode.value + '-' + contact_number.value,
        address: address.value
      }
      
      itemStore.addItem(item);
    }

</script>

<style scoped>

</style>