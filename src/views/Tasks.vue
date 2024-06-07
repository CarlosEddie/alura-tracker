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
import { GET_TASKS } from '@/store/actions-type';

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
    /*    saveTask(task: ITask) {
            this.tasks.push(task)
        },*/
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_TASKS)
        return {
            tasks: computed(() => store.state.tasks),
            store
        }
    }
});
</script>