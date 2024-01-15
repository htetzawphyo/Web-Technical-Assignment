<template>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Recommended Size 400 x 200</p>
    <div class="flex items-center justify-center w-full" >
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <div  v-if="hasImage || previewImageSrc">
                  <img v-if="!previewImageSrc" :src="hasImage" alt="Preview" class="w-24 h-24 mb-4 rounded-sm"/>
                  <img v-if="previewImageSrc" :src="previewImageSrc" alt="Preview" class="w-24 h-24 mb-4 rounded-sm"/>
                </div>
                <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"/>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            </div>
            <input id="dropzone-file" @change="previewImage" type="file" class="hidden" ref="imageInput"/>
        </label>
    </div>
</template>

<script setup>
    import { ref, defineEmits, defineProps } from 'vue';

    const emit = defineEmits(['image']);
    const props = defineProps(['hasImage']);
    const previewImageSrc = ref(props.hasImage);
    const imageInput = ref(null);
    const imageFile = ref(null);

    const previewImage = (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(imageInput.value.files[0]);

        reader.onload = (e) => {
          previewImageSrc.value = e.target.result;
        }
        // imageFile.value = URL.createObjectURL(file);
        emit('imageUpload', imageInput.value.files[0]);
      }
    }   
</script>