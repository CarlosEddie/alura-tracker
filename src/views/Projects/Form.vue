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
import { defineComponent, ref } from 'vue';
import useNotifier from '@/hooks/notifier'
import { CHANGE_PROJECT, REGISTER_PROJECT } from '@/store/actions-type';

export default defineComponent({
    name: 'FormComponent',
    props: {
        id: {
            type: String
        }
    },
    methods: {
        save() {
            if (this.id) {
                this.store.dispatch(CHANGE_PROJECT, { id: this.id, name: this.projectName })
                    .then(() => {
                        this.dealWithSuccess()
                    })
            } else {
                this.store.dispatch(REGISTER_PROJECT, this.projectName)
                    .then(() => {
                        this.dealWithSuccess()
                    })
            }

        },
        dealWithSuccess() {
            this.projectName = ''
            this.notify(NotificationType.SUCCESS, 'Excellent', 'Alright, your project has been saved.')
            this.$router.push('/projects')
        }
    },
    setup(props) {
        const store = useStore()
        const { notify } = useNotifier()
        const projectName = ref("")

        if(props.id) {
            const project = store.state.project.projects.find(project => project.id == props.id)
            projectName.value = project?.name || ''
        }
        return {
            store,
            notify,
            projectName,
        }
    }
})
</script>