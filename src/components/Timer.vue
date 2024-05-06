<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Stopwatch :time-in-seconds="timeInSeconds" />
        <Button @clicked="start" icon="fas fa-play" text="play" :disabled="stopwatchRunning" />
        <Button @clicked="finish" icon="fas fa-stop" text="stop" :disabled="!stopwatchRunning" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Stopwatch from './Stopwatch.vue';
import Button from './Button.vue';

export default defineComponent({
    name: 'TimerComponent',
    emits: ['whenTimerFinished'],
    components: {
        Stopwatch,
        Button
    },
    data() {
        return {
            timeInSeconds: 0,
            stopwatch: 0,
            stopwatchRunning: false
        }
    },

    methods: {
        start() {
            this.stopwatchRunning = true
            this.stopwatch = setInterval(() => {
                this.timeInSeconds++
            }, 1000)
        },
        finish() {
            this.stopwatchRunning = false
            clearInterval(this.stopwatch)
            this.$emit('whenTimerFinished', this.timeInSeconds)
            this.timeInSeconds = 0
        }
    }
})
</script>