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
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'FormComponent',
    props: {
        id: {
            type: String
        }
    },
    setup(props) {
        const router = useRouter()
        const store = useStore()
        const { notify } = useNotifier()
        const projectName = ref("")

        if (props.id) {
            const project = store.state.project.projects.find(project => project.id == props.id)
            projectName.value = project?.name || ''
        }

        const dealWithSuccess = () => {
            projectName.value = ''
            notify(NotificationType.SUCCESS, 'Excellent', 'Alright, your project has been saved.')
            router.push('/projects')
        }

        const save = () => {
            if (props.id) {
                store.dispatch(CHANGE_PROJECT, { id: props.id, name: projectName.value })
                    .then(() => {
                        dealWithSuccess()
                    })
            } else {
                store.dispatch(REGISTER_PROJECT, projectName.value)
                    .then(() => {
                        dealWithSuccess()
                    })
            }

        }
        return {
            projectName,
            save,
        }
    }
})
</script>「OooDa・土屋李央 今日は何時から？」第2回アーカイヴ配信