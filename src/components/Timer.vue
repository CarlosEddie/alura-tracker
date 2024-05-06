<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Stopwatch :time-in-seconds="timeInSeconds" />
        <button class="button" @click="start" :disabled="stopwatchRunning">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finish" :disabled="!stopwatchRunning">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Stopwatch from './Stopwatch.vue';

export default defineComponent({
    name: 'TimerComponent',
    components: {
        Stopwatch
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
        }
    }
})
</script>