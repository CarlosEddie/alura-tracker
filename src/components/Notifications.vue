<template>
    <div class="notifications">
        <article class="message is-success">
            <div class="message-header">
                Attention!
            </div>
            <div class="message-body">
                Notification text!
            </div>
        </article>
        <article class="message is-warning">
            <div class="message-header">
                Attention!
            </div>
            <div class="message-body">
                Notification text!
            </div>
        </article>
        <article class="message is-danger">
            <div class="message-header">
                Attention!
            </div>
            <div class="message-body">
                Notification text!
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NotificationsComponent'
})
</script>

<style scoped>
    .notifications {
        position: absolute;
        right: 0;
        width: 300px;
        padding: 8px;
        z-index: 105;
    }
</style>