<template>
    <Box>
        <div class="columns clickable" @click="clickedTask">
            <div class="column is-4">
                {{ task.description || 'Task without description'}}
            </div>
            <div class="column is-3">
                {{ task.project?.name || 'N/A' }}
            </div>
            <div class="column">
                <Stopwatch :time-in-seconds="task.durationInSeconds" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import ITask from '@/interfaces/ITask';
import Stopwatch from './Stopwatch.vue';
import { computed, defineComponent, PropType } from 'vue';
import Box from './Box.vue';

export default defineComponent({
    name: 'TaskComponent',
    emits: ['whenTaskClicked'],
    components: {
        Stopwatch,
        Box,
    },
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    },
    setup(props, { emit }) {
        const clickedTask = (): void => {
            emit('whenTaskClicked', props.task)
        }

        const timeSpent = computed(() => {
            return new Date(props.task.durationInSeconds * 1000).toISOString().substring(11, 8)
        })

        return {
            clickedTask,
            timeSpent,
        }
    }
})

</script>

<style scoped>
    .clickable {
        cursor: pointer;
    }
</style>