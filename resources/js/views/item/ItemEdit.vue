<template>
  <Navbar />
  <Sidebar />

  <div class="p-6 mt-12 md:ml-64">
      <div>
        <h1 class="text-md">
          <span class="mr-3">Item List</span>
          <font-awesome-icon icon="fa-solid fa-angle-right" />
          <span class="text-indigo-500 ml-3">Item Edit</span>
        </h1>
      </div>
      
      <div class="mt-5 bg-indigo-100 ps-3 py-1 rounded-md text-md">
        Edit Item
      </div>

      <form @submit.prevent="handleItem" v-if="getEditItem">
        <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-4">

          
          <!-- For Item Information  -->
          <div class="p-4">
              <h3 class="mb-7 text-md font-serif">Item Information</h3>

              <div class="mb-7">
                  <label for="item-name" class="block mb-2 text-sm font-medium required">Item Name</label>
                  <input v-model="getEditItem.name" type="text" id="item-name" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none" placeholder="Input Name">
                  <i v-if="getErrMsg.name" class="text-red-600 font-thin">{{ getErrMsg.name[0] }}</i>
              </div>

              <div class="mb-7">
                <label for="category" class="block mb-2 text-sm font-medium required">Select Category</label>
                <select @change="handleCategory" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none">
                  <option disabled selected>Select category</option>
                  <option v-for="category in getCategory" :key="category.id" :value="category.id"
                  :selected="category.id == getEditItem.category_id">{{ category.name }}</option>
                </select>
                <i v-if="getErrMsg.category_id" class="text-red-600 font-thin">{{ getErrMsg.category_id[0] }}</i>
              </div>

              <div class="mb-7">
                  <label for="price" class="block mb-2 text-sm font-medium required">Price</label>
                  <input v-model="getEditItem.price" type="text" id="price" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none" placeholder="Enter Price">
                  <i v-if="getErrMsg.price" class="text-red-600 font-thin">{{ getErrMsg.price[0] }}</i>
              </div>

              <div class="mb-7">
                  <label for="description" class="block mb-2 text-sm font-medium required">Description</label>
                  <ckeditor :editor="editor" v-model="getEditItem.description" :config="editorConfig"></ckeditor>
                  <i v-if="getErrMsg.description" class="text-red-600 font-thin">{{ getErrMsg.description[0] }}</i>
              </div>

              <div class="mb-7">
                <label for="item-condition" class="block mb-2 text-sm font-medium required">Select Item Condition</label>
                <select @change="handleItemCondition" id="item-condition" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none">
                  <option disabled selected>Select Item Condition</option>
                  <option value="new" :selected="'new' == getEditItem.item_condition">New</option>
                  <option value="used" :selected="'used' == getEditItem.item_condition">Used</option>
                  <option value="second" :selected="'second' == getEditItem.item_condition">Good Second Hand</option>
                </select>
              </div>

              <div class="mb-7">
                <label for="item-type" class="block mb-2 text-sm font-medium required">Select Item Type</label>
                <select @change="handleItemType" id="item-type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5 focus:outline-none">
                  <option disabled selected>Select Item Type</option>
                  <option value="for_sell" :selected="'for_sell' == getEditItem.item_type">For Sell</option>
                  <option value="for_buy" :selected="'for_buy' == getEditItem.item_type">For Buy</option>
                  <option value="for_exchange" :selected="'for_exchange' == getEditItem.item_type">For Exchange</option>
                </select>
              </div>

              <div class="mb-7">
                  <input v-model="getEditItem.publish" id="status" type="checkbox" class="w-4 h-4  cursor-pointer">
                  <label for="status" class="ms-2 text-md font-medium cursor-pointer">Publish</label>
              </div>

              <div class="mb-7">
                <label for="" class="block mb-2 text-sm font-medium required">Item Photo</label>
                <ImageUpload @imageUpload="handleImage" :hasImage="getEditItem.image"/>
                <i v-if="getErrMsg.image" class="text-red-600 font-thin">{{ getErrMsg.image[0] }}</i>
              </div>
          </div>

          <!-- For Owner Information  -->
          <div class="p-4">
            <h3 class="mb-7 text-md font-serif">Owner Information</h3>
            
            <div class="mb-7">
                <label for="owner-name" class="block mb-2 text-sm font-medium required">Owner Name</label>
                <input v-model="getEditItem.owner_name" type="text" placeholder="Input Owner Name" id="owner-name" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm bg-gray-50 sm:text-xs focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none">
                <i v-if="getErrMsg.owner_name" class="text-red-600 font-thin">{{ getErrMsg.owner_name[0] }}</i>
            </div>

            <div class="mb-7">
              <label class="block mb-2 text-sm font-medium">Contact Number</label>
              <div class="relative mb-4 flex flex-wrap items-stretch">
                <select @change="handleCountryCode" class="flex items-center whitespace-nowrap rounded-sm border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 focus:outline-none">
                  <option value="+95" :selected="'+95' == getEditItem.country_code">+95<font-awesome-icon icon="fa-solid fa-angle-down"/></option>
                  <option value="+1" :selected="'+1' == getEditItem.country_code">+1</option>
                  <option value="+44" :selected="'+44' == getEditItem.country_code">+44</option>
                  <option value="+61" :selected="'+61' == getEditItem.country_code">+61</option>
                  <option value="+49" :selected="'+49' == getEditItem.country_code">+49</option>
                  <option value="+33" :selected="'+33' == getEditItem.country_code">+33</option>
                </select>
                <input type="number" placeholder="Add Number" v-model="getEditItem.contact_number"
                  class="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none " />
              </div>
            </div>

            <div class="mb-7">
              <label for="owner-name" class="block mb-2 text-sm font-medium">Address</label>
              <LocationPicker @setAddress="handleAddress" :hasAddress="getEditItem.address"/>
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
    import { ref, defineProps } from 'vue';
    import { useCategoryStore } from '../../store/Category';
    import { useItemStore } from '../../store/Item';
    import { storeToRefs } from 'pinia';

    const props = defineProps(['id']);
    const itemStore = useItemStore();
    const { getEditItem, getErrMsg } = storeToRefs(itemStore);
    itemStore.editItem(props.id);

    // Category store For Category_ID
    const categoryStore = useCategoryStore();
    const { getCategory } = storeToRefs(categoryStore);
    categoryStore.indexCategory();

    // CK5 Editor
    const editor = ClassicEditor;
    const description = ref('');
    const editorConfig = ref({
      placeholder: 'EnterDescription'
    })

    const category_id = ref(null);
    const item_condition = ref(null);
    const item_type = ref(null);
    const image = ref('');
    const address = ref('');
    const countryCode = ref(null);

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
      let country_code = countryCode.value ? countryCode.value : getEditItem.value.country_code;
      let formData = new FormData();
      formData.append('_method', 'put');
      formData.append('name', getEditItem.value.name);
      formData.append('category_id', category_id.value ? category_id.value : getEditItem.value.category_id);
      formData.append('description', getEditItem.value.description);
      formData.append('price', getEditItem.value.price);
      formData.append('item_condition', item_condition.value ? item_condition.value : getEditItem.value.item_condition);
      formData.append('item_type', item_type.value ? item_type.value : getEditItem.value.item_type);
      formData.append('publish', getEditItem.value.publish);
      formData.append('image', image.value ? image.value : null);
      formData.append('owner_name', getEditItem.value.owner_name);
      formData.append('contact_number', country_code + '-' + getEditItem.value.contact_number);
      formData.append('address', address.value ? address.value : getEditItem.value.address);

      itemStore.updateItem(props.id, formData);
    }

</script>

<style scoped>

</style>