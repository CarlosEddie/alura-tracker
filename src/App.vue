<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': activeDarkMode }">
    <div class="column is-one-quarter">
      <SideBar @whenThemeChanged="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
  },
  data() {
    return {
      activeDarkMode: false
    }
  },
  methods: {
    changeTheme(activeDarkMode: boolean) {
      this.activeDarkMode = activeDarkMode
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --primary-bg: #fff;
  --primary-text: #000;
}

main.dark-mode {
  --primary-bg: #2b2d42;
  --primary-text: #ddd;
}

.content {
  background-color: var(--primary-bg);
}
</style>
