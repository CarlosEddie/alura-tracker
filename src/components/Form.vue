<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Form for creating a new task">
                <input type="text" class="input" placeholder="What task do you want to start?" v-model="description">
            </div>
            <div class="column">
                <Timer @when-timer-finished="finishTask"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Timer from './Timer.vue';

export default defineComponent({
    name: 'FormComponent',
    components: {
        Timer
    },
    data() {
        return {
            description: ''
        }
    },
    methods: {
        finishTask(elapsedTime: number) : void {
            console.log('task time', elapsedTime);
            console.log('task description', this.description);
            this.description = ''
        }
    }
})
</script>