<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Form for creating a new task">
                <input type="text" class="input" placeholder="What task do you want to start?">
            </div>
            <div class="column">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                    <section>
                        <strong>
                            {{ elapsedTime }}
                        </strong>
                    </section>
                    <button class="button" @click="start">
                        <span class="icon">
                            <i class="fas fa-play"></i>
                        </span>
                        <span>play</span>
                    </button>
                    <button class="button" @click="finish">
                        <span class="icon">
                            <i class="fas fa-stop"></i>
                        </span>
                        <span>stop</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'FormComponent',
    data () {
        return {
            timeInSeconds: 0,
            stopWatch: 0
        }
    },
    computed: {
        elapsedTime () {
            return new Date(this.timeInSeconds * 1000).toISOString().slice(11, 19)
        }
    },
    methods: {
        start () {
            this.stopWatch = setInterval(() => {
                this.timeInSeconds++
            }, 1000)
        },
        finish () {
            clearInterval(this.stopWatch)
        }
    }
})
</script>