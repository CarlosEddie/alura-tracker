<template>
    <div class="projects">
        <h1 class="title">Projects</h1>
        <RouterView></RouterView>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ProjectsComponent'
    })
</script>

<style scoped>
.projects {
    padding: 1.25rem;
}
</style>