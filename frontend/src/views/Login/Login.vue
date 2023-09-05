<template>
  <div class="items-center min-h-screen z-10 m-4 flex justify-center">
    <div class="dialog-content">
      <NCard class="p-3 sm:px-12">
        <div class="login-dialog-title">欢迎来到 {{ productName }}</div>
        <div class="text-gray-400 text-base text-center mb-4">您好，请登录您的帐户</div>
        <div class="border-b border-gray-200 dark:border-gray-600">
          <ul class="tab-container">
            <li class="flex-grow">
              <a
                href="#"
                class="group"
                @click="loginMethod = 'verify'"
                :class="loginMethod === 'verify' ? 'tab-item-active' : 'tab-item'">
                <svg
                  class="w-4 h-4 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <path
                    d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
                </svg>
                验证码登录
              </a>
            </li>
            <li class="flex-grow">
              <a
                href="#"
                @click="loginMethod = 'password'"
                class="group"
                :class="loginMethod === 'password' ? 'tab-item-active' : 'tab-item'"
                aria-current="page">
                <svg
                  class="w-4 h-4 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                密码登录
              </a>
            </li>
          </ul>
        </div>
        <div v-if="loginMethod === 'verify'">
          <div class="flex mt-4">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <path
                    d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
                </svg>
              </div>
              <input
                type="phone"
                class="block pl-10 p-2.5 w-full outline-none z-20 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-400"
                placeholder="手机号码"
                required />
            </div>
          </div>
          <div class="flex mt-4">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <path
                    d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
                </svg>
              </div>
              <input
                type="code"
                class="block pl-10 p-2.5 outline-none w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-400"
                placeholder="验证码"
                required />
              <button
                class="absolute inline-block flex-row top-0 right-0 p-2.5 h-full text-sm text-white bg-blue-700 rounded-r-md border-blue-700 transition-colors hover:bg-blue-800 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500">
                发送验证码
              </button>
            </div>
          </div>
        </div>
        <div v-if="loginMethod === 'password'">
          <div class="flex mt-4">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 18">
                  <path
                    d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
              </div>
              <input
                type="user"
                class="block pl-10 p-2.5 w-full outline-none z-20 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-400"
                placeholder="手机号码/用户名/邮箱"
                required />
            </div>
          </div>
          <div class="flex mt-4">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20">
                  <path
                    d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z" />
                </svg>
              </div>
              <input
                type="password"
                class="block pl-10 p-2.5 w-full outline-none z-20 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-400"
                placeholder="密码"
                required />
            </div>
          </div>
        </div>
        <div class="flex items-start mt-3 mb-6">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 outline-none appearance-none ring-0 hover:ring-0 focus:ring-0 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              required />
          </div>
          <label for="remember" class="ml-2 text-sm text-gray-700 dark:text-gray-400">
            记住我，下次自动登录
          </label>
        </div>
        <button
          class="w-full p-2.5 text-white bg-blue-700 rounded-md text-center border-blue-700 transition-colors hover:bg-blue-800 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500">
          <svg
            class="w-4 h-4 mr-2 inline-block"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5.917 5.724 10.5 15 1.5" />
          </svg>
          登 录
        </button>
        <div class="my-6 border-b border-gray-200 dark:border-gray-600"></div>
        <button
          class="w-full mb-8 p-2.5 text-white bg-emerald-500 rounded-md text-center border-green-700 transition-colors hover:bg-green-800 focus:outline-none focus:ring-emerald-400 dark:bg-emerald-500 dark:hover:bg-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="inline-block  mr-2 h-5" viewBox="0 0 16 16">
            <path
              d="M11.176 14.429c-2.665 0-4.826-1.8-4.826-4.018 0-2.22 2.159-4.02 4.824-4.02S16 8.191 16 10.411c0 1.21-.65 2.301-1.666 3.036a.324.324 0 0 0-.12.366l.218.81a.616.616 0 0 1 .029.117.166.166 0 0 1-.162.162.177.177 0 0 1-.092-.03l-1.057-.61a.519.519 0 0 0-.256-.074.509.509 0 0 0-.142.021 5.668 5.668 0 0 1-1.576.22ZM9.064 9.542a.647.647 0 1 0 .557-1 .645.645 0 0 0-.646.647.615.615 0 0 0 .09.353Zm3.232.001a.646.646 0 1 0 .546-1 .645.645 0 0 0-.644.644.627.627 0 0 0 .098.356Z" />
            <path
              d="M0 6.826c0 1.455.781 2.765 2.001 3.656a.385.385 0 0 1 .143.439l-.161.6-.1.373a.499.499 0 0 0-.032.14.192.192 0 0 0 .193.193c.039 0 .077-.01.111-.029l1.268-.733a.622.622 0 0 1 .308-.088c.058 0 .116.009.171.025a6.83 6.83 0 0 0 1.625.26 4.45 4.45 0 0 1-.177-1.251c0-2.936 2.785-5.02 5.824-5.02.05 0 .1 0 .15.002C10.587 3.429 8.392 2 5.796 2 2.596 2 0 4.16 0 6.826Zm4.632-1.555a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0Zm3.875 0a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0Z" />
          </svg>
          微信快速登录
        </button>
        <div class="text-xs sm:text-sm text-center text-gray-500 dark:text-gray-400">登录即代表您同意《用户协议》 和 《隐私政策》</div>
      </NCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import NCard from "@/components/Cards/index.vue";
import { ref } from "vue";
const productName = ref(process.env.productName);
const loginMethod = ref("verify");
</script>
<style>
.login-dialog-title {
  @apply pt-10 text-2xl text-gray-800 dark:text-gray-300 text-center;
}
.dialog-content {
  @apply w-full max-w-xl;
}
.tab-item {
  @apply inline-flex w-full items-center justify-center p-3 border-b-2 border-transparent rounded-t hover:text-gray-600 hover:border-gray-300 hover:bg-slate-50 dark:hover:bg-gray-600/50 dark:hover:text-gray-300 transition-all;
}
.tab-item-active {
  @apply inline-flex w-full items-center justify-center p-3 text-blue-600 border-b-2 border-blue-600 rounded-t  dark:text-blue-400 dark:border-blue-400 transition-all;
}
.tab-container {
  @apply flex flex-wrap -mb-px text-sm sm:text-base font-medium text-center text-gray-500 dark:text-gray-400 transition-all;
}
</style>
