<template>
  <section class="bg-indigo-500">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
              ASSIGNMENT 
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                      Sign in to your account
                  </h1>
                  <div v-if="getErrMsg.length != 0" class="my-2">
                        <p class="text-red-600 italic">Email or password incorrect.</p>
                    </div>
                  <form class="space-y-4 md:space-y-6" @submit.prevent="submitLogin">
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                          <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter email" required="">
                          <i v-if="getErrMsg.email" class="text-red-600 font-thin">{{ getErrMsg.email[0] }}</i>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                          <input v-model="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="">
                          <i v-if="getErrMsg.password" class="text-red-600 font-thin">{{ getErrMsg.password[0] }}</i>
                      </div>
                      <button type="submit" class="w-full text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                  </form>
              </div>
          </div>
      </div>
  </section>
</template>

<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../../store/Auth';
    import { storeToRefs } from 'pinia';

    const authStore = useAuthStore();
    const { getErrMsg } = storeToRefs(authStore);

    const email = ref(null);
    const password = ref(null);

    const submitLogin = () => {
      let formData = {
          'email': email.value,
          'password': password.value
      }
      authStore.login(formData);
    }
</script>

<style>

</style>