<!-- src/components/AppHeader.vue -->
<template>
  <header class="py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-center sm:text-left">
          <h1 class="text-3xl font-bold">Ilupii</h1>
          <p class="text-gray-300 mt-1">Random post about CyberSecurity</p>
        </div>
        <nav class="flex space-x-6">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/writeup" class="nav-link">WriteUp</router-link>
          <router-link to="/project" class="nav-link">Project</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
// Komponen ini udah siap dipake di App.vue
</script>