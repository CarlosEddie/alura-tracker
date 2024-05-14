<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <div class="has-text-centered">
            <button class="button" @click="changeTheme">
                {{ buttonText }}
            </button>
        </div>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <RouterLink to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        tasks
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/projects" class="link">
                        <i class="fas fa-project-diagram"></i>
                        projects
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SideBar',
    emits: ['whenThemeChanged'],
    data() {
        return {
            activeDarkMode: false,
        }
    },
    computed: {
        buttonText() {
            if (this.activeDarkMode) {
                return 'Disable dark mode'
            }
            return 'Enable dark mode'
        }
    },
    methods: {
        changeTheme() {
            this.activeDarkMode = !this.activeDarkMode
            this.$emit('whenThemeChanged', this.activeDarkMode)
        }
    }
})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

.panel li {
    margin: 8px 0;
}

.link {
    color: #fff;
}

.link:hover {
    color: #FAF0CA;
}

.link.router-link-active {
    color: #FAF0CA;
}
</style>