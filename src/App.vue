<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': activeDarkMode }">
    <div class="column is-one-quarter">
      <SideBar @whenThemeChanged="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <Form @whenSaveTask="saveTask" />
      <div class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
        <Box v-if="listIsEmpty">
          Let's start the tasks (*^w^)b
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import Form from './components/Form.vue';
import Task from './components/Task.vue';
import ITask from './interfaces/ITask'
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    Form,
    Task,
    Box
  },
  data() {
    return {
      tasks: [] as ITask[],
      activeDarkMode: false
    }
  },
  computed: {
    listIsEmpty() : boolean{
      return this.tasks.length === 0;
    }
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task)
    },
    changeTheme (activeDarkMode: boolean) {
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
