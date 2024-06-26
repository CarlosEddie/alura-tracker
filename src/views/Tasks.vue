<template>
    <Form @whenSaveTask="saveTask" />
    <div class="list">
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Type to filter" v-model="filter" />
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Task v-for="(task, index) in tasks" :key="index" :task="task" @when-task-clicked="selectTask" />
        <Box v-if="listIsEmpty">
            Let's start the tasks (*^w^)b
        </Box>
        <Modal :show="selectedTask != null">
            <template v-slot:header>
                <p class="modal-card-title">Editing a task</p>
                <button @click="closeModal" class="delete" aria-label="close"></button>
            </template>
            <template v-slot:body>
                <div class="field">
                    <label for="taskDescription" class="label">Description</label>
                    <input type="text" class="input" v-if="selectedTask" v-model="selectedTask.description" id="taskDescription" />
                </div>
            </template>
            <template v-slot:footer>
                <div class="buttons">
                    <button @click="changeTask" class="button is-success">Save changes</button>
                    <button @click="closeModal" class="button">Cancel</button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Form from '../components/Form.vue';
import Task from '../components/Task.vue';
import Box from '../components/Box.vue';
import Modal from '@/components/Modal.vue';
import { useStore } from '@/store';
import { GET_PROJECTS, REGISTER_TASK, GET_TASKS, CHANGE_TASK } from '@/store/actions-type';
import ITask from '@/interfaces/ITask';

export default defineComponent({
    name: 'App',
    data() {
        return {
            selectedTask: null as ITask | null
        }
    },
    components: {
        Form,
        Task,
        Box,
        Modal
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
        selectTask(task: ITask) {
            this.selectedTask = task
        },
        closeModal() {
            this.selectedTask = null
        },
        changeTask() {
            this.store.dispatch(CHANGE_TASK, this.selectedTask)
                .then(() => this.closeModal())
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_TASKS)
        store.dispatch(GET_PROJECTS)
        const filter = ref('')

        ///const tasks = computed(() => store.state.task.tasks.filter((t) => !filter.value || t.description.includes(filter.value)))

        watchEffect(() => {
            store.dispatch(GET_TASKS, filter.value)
        })

        return {
            tasks: computed(() => store.state.task.tasks),
            store,
            filter
        }
    }
});
</script>