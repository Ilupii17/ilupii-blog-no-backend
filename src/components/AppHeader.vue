<!-- src/components/AppHeader.vue -->
<template>
  <header class="py-4 border-b border-gray-700/50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="text-2xl font-bold hover:text-blue-400 transition-colors">
          Ilupii
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-6">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/writeup" class="nav-link">WriteUp</router-link>
          <router-link to="/project" class="nav-link">Project</router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMenu"
          class="md:hidden text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg 
            v-if="!isMenuOpen"
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg 
            v-else
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition name="slide">
        <nav 
          v-if="isMenuOpen" 
          class="md:hidden mt-4 flex flex-col space-y-2 py-4 border-t border-gray-700/50"
        >
          <router-link 
            to="/" 
            @click="closeMenu"
            class="nav-link-mobile"
          >
            Home
          </router-link>
          <router-link 
            to="/writeup" 
            @click="closeMenu"
            class="nav-link-mobile"
          >
            WriteUp
          </router-link>
          <router-link 
            to="/project" 
            @click="closeMenu"
            class="nav-link-mobile"
          >
            Project
          </router-link>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
.nav-link {
  @apply text-gray-300 hover:text-white transition-colors duration-300;
}

.nav-link.router-link-active {
  @apply text-white font-semibold;
}

.nav-link-mobile {
  @apply px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300;
}

.nav-link-mobile.router-link-active {
  @apply text-white bg-gray-800 font-semibold;
}

/* Slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>