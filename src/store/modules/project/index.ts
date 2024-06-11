import http from "@/http";
import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import { GET_PROJECTS, REGISTER_PROJECT, CHANGE_PROJECT, REMOVE_PROJECT } from "@/store/actions-type";
import { ADD_PROJECT, MODIFY_PROJECT, DELETE_PROJECT, DEFINE_PROJECTS } from "@/store/mutation-type";
import { Module } from "vuex";

export interface ProjectState {
    projects: IProject[]
}

export const project: Module<ProjectState, State> = {
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
    },
    actions: {
        [GET_PROJECTS]({ commit }) {
            http.get('/projects')
                .then(response => commit(DEFINE_PROJECTS, response.data))
        },
        [REGISTER_PROJECT](context, projectName: string) {
            return http.post('/projects', {
                name: projectName
            })
        },
        [CHANGE_PROJECT](context, project: IProject) {
            return http.put(`/projects/${project.id}`, project)
        },
        [REMOVE_PROJECT]({ commit }, id: string) {
            return http.delete(`/projects/${id}`)
                .then(() => commit(DELETE_PROJECT, id))
        },
    }
}