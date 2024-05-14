<template>
    <Form @whenSaveTask="saveTask" />
    <div class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
        <Box v-if="listIsEmpty">
            Let's start the tasks (*^w^)b
        </Box>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from '../components/Form.vue';
import Task from '../components/Task.vue';
import ITask from '../interfaces/ITask'
import Box from '../components/Box.vue';

export default defineComponent({
    name: 'App',
    components: {
        Form,
        Task,
        Box
    },
    data() {
        return {
            tasks: [] as ITask[],
        }
    },
    computed: {
        listIsEmpty(): boolean {
            return this.tasks.length === 0;
        }
    },
    methods: {
        saveTask(task: ITask) {
            this.tasks.push(task)
        },
    }
});
</script>