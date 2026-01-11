<script setup>

</script>

<template>
  <div class="min-h-screen">
    <nav class="bg-gray-900 fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <router-link :to="{ name: 'home' }" class="text-white font-bold text-xl hover:text-gray-300">HOME</router-link>
          <button
            class="md:hidden text-white focus:outline-none"
            type="button"
            aria-label="Toggle navigation"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!--- render router view -->
    <div class="pt-16">
      <router-view></router-view>
    </div>
  </div>
</template>
