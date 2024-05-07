<template>
    <Box>
        <div class="columns">
            <div class="column is-7">
                {{ task.description || 'Task without description'}}
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
import { defineComponent, PropType } from 'vue';
import Box from './Box.vue';

export default defineComponent({
    name: 'TaskComponent',
    components: {
        Stopwatch,
        Box,
    },
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    }
})

</script>