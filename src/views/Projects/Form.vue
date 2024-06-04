<template>
    <section>
        <form @submit.prevent="save">
            <div class="field">
                <label for="projectName" class="label">Project Name</label>
                <input type="text" class="input" v-model="projectName" id="projectName" />
            </div>
            <div class="field">
                <button class="button" type="submit">Save</button>
            </div>
        </form>
    </section>
</template>


<script lang="ts">
import { NotificationType } from '@/interfaces/INotification';
import { useStore } from '@/store'
import { ADD_PROJECT, MODIFY_PROJECT, } from '@/store/mutation-type';
import { defineComponent } from 'vue';
import useNotifier from '@/hooks/notifier'

export default defineComponent({
    name: 'FormComponent',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const project = this.store.state.projects.find(project => project.id == this.id)
            this.projectName = project?.name || ''
        }
    },
    data() {
        return {
            projectName: "",
        }
    },
    methods: {
        save() {
            if (this.id) {
                this.store.commit(MODIFY_PROJECT, { id: this.id, name: this.projectName })
            } else {
                this.store.commit(ADD_PROJECT, this.projectName)
            }
            this.projectName = ''
            this.notify(NotificationType.SUCCESS, 'Excellent', 'Alright, your project has been saved.')
            this.$router.push('/projects')
        },
        
    },
    setup() {
        const store = useStore()
        const { notify } = useNotifier()
        return {
            store,
            notify
        }
    }
})
</script>