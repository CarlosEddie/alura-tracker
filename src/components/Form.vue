<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Form for creating a new task">
                <input type="text" class="input" placeholder="What task do you want to start?" v-model="description">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="projectId">
                        <option value="">Select a project</option>
                        <option :value="project.id" v-for="project in projects" :key="project.id">
                            {{ project.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Timer @when-timer-finished="saveTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Timer from './Timer.vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
    name: 'FormComponent',
    emits: ['whenSaveTask'],
    components: {
        Timer
    },
    setup(props, { emit }) {
        const store = useStore(key)
        const description = ref('')
        const projectId = ref('')

        const projects = computed(() => store.state.project.projects)

        const saveTask =(elapsedTime: number): void => {
            emit('whenSaveTask', {
                durationInSeconds: elapsedTime,
                description: description.value,
                project: projects.value.find(project => project.id == projectId.value)
            })
            description.value = ''
        }

        return {
            description,
            projectId,
            projects,
            saveTask: saveTask
        }
    }
})
</script>

<style>
.form {
    color: var(--primary-text);
    background-color: var(--primary-bg);
}
</style>