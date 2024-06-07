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
import { computed, defineComponent } from 'vue';
import Form from '../components/Form.vue';
import Task from '../components/Task.vue';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { GET_PROJECTS, REGISTER_TASK, GET_TASKS } from '@/store/actions-type';
import ITask from '@/interfaces/ITask';

export default defineComponent({
    name: 'App',
    components: {
        Form,
        Task,
        Box
    },
    computed: {
        listIsEmpty(): boolean {
            return this.tasks.length === 0;
        }
    },
    methods: {
        saveTask(task: ITask): void {
            this.store.dispatch(REGISTER_TASK, task)
        },
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_TASKS)
        store.dispatch(GET_PROJECTS)
        return {
            tasks: computed(() => store.state.tasks),
            store
        }
    }
});
</script>