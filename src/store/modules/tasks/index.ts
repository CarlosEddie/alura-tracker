import ITask from "@/interfaces/ITask";
import { Module } from "vuex";
import { State } from "@/store";
import http from "@/http";
import { GET_TASKS, REGISTER_TASK, CHANGE_TASK } from "@/store/actions-type";
import { DEFINE_TASKS, ADD_TASK, MODIFY_TASK } from "@/store/mutation-type";

export interface TaskState {
    tasks: ITask[],
}

export const task: Module<TaskState, State> = {
    state: {
        tasks: [],
    },

    mutations: {
        [DEFINE_TASKS](state, tasks: ITask[]) {
            state.tasks = tasks
        },
        [ADD_TASK](state, task: ITask) {
            state.tasks.push(task)
        },
        [MODIFY_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(t => t.id == task.id)
            state.tasks[index] = task
        },
    },

    actions: {
        [GET_TASKS]({ commit }) {
            http.get('/tasks')
                .then(response => commit(DEFINE_TASKS, response.data))
        },
        [REGISTER_TASK]({ commit }, task: ITask) {
            return http.post('/tasks', task)
                .then(response => commit(ADD_TASK, response.data))
        },
        [CHANGE_TASK]({ commit }, task: ITask) {
            return http.put(`/tasks/${task.id}`, task)
                .then(() => commit(MODIFY_TASK, task))
        },
    }


}