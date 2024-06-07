import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, ADD_TASK, DEFINE_PROJECTS, DEFINE_TASKS, DELETE_PROJECT, MODIFY_PROJECT, NOTIFY } from "./mutation-type";
import { INotification } from "@/interfaces/INotification";
import { CHANGE_PROJECT, GET_PROJECTS, GET_TASKS, REGISTER_PROJECT, REGISTER_TASK, REMOVE_PROJECT } from "./actions-type";
import http from '@/http';
import ITask from "@/interfaces/ITask";

interface State {
    projects: IProject[],
    tasks: ITask[],
    notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [],
        tasks: [],
        notifications: []
    },
    mutations: {
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject
            state.projects.push(project)
        },
        [MODIFY_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(proj => proj.id == project.id)
            state.projects[index] = project
        },
        [DELETE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id)
        },
        [DEFINE_PROJECTS](state, projects: IProject[]) {
            state.projects = projects
        },
        [DEFINE_TASKS](state, tasks: ITask[]) {
            state.tasks = tasks
        },
        [ADD_TASK](state, task: ITask) {
            state.tasks.push(task)
        },
        [NOTIFY](state, newNotification: INotification) {
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000);
        }
    },
    actions: {
        [GET_PROJECTS] ({ commit }) {
            http.get('/projects')
                .then(response => commit(DEFINE_PROJECTS, response.data))
        },
        [REGISTER_PROJECT] ( context, projectName: string ) {
            return http.post('/projects', {
                name: projectName
            })
        },
        [CHANGE_PROJECT] ( context, project: IProject ) {
            return http.put(`/projects/${project.id}`, project)
        },
        [REMOVE_PROJECT] ( { commit }, id: string ) {
            return http.delete(`/projects/${id}`)
                .then(() => commit(DELETE_PROJECT, id))
        },
        [GET_TASKS] ({ commit }) {
            http.get('/tasks')
                .then(response => commit(DEFINE_TASKS, response.data))
        },
        [REGISTER_TASK] ( {commit}, task: ITask ) {
            return http.post('/tasks', task)
                .then(response => commit(ADD_TASK, response.data))
        },
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}