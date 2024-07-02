import axios from "../../plugins/axios";
import store from "../index"
const state = {
    projects: null,
    project: null
};

const getters = {
    getProjects: (state) => state.projects,
    getProject: (state) => state.project,

};

const actions = {
    async createNewProject({ commit }, payload) {
        try {
            const response = await axios.post('/api/v1/project', payload);
            if (response.success) {
                commit("addProject", response.data);
                return response.data;
            } else {
                store.commit("user/setToast", {
                    message: response?.error?.explanation ? response.error?.explanation : 'Something went wrong',
                    type: 'error',
                    show: true,
                });
                return 0;
            }
        } catch (error) {
            console.log(error);
            store.commit("user/setToast", {
                message: error.message ? error.message : 'Something went wrong',
                type: 'error',
                show: true,
            });
            return 0;
        }
    },
    async fetchProjects({ commit }) {
        try {
            const response = await axios.get('/api/v1/project');
            if (response.success) {
                commit("setProjects", response.data);
                return 1;
            } else {
                store.commit("user/setToast", {
                    message: response?.error?.explanation ? response.error?.explanation : 'Something went wrong',
                    type: 'error',
                    show: true,
                });
                return 0;
            }
        } catch (error) {
            console.log(error);
            store.commit("user/setToast", {
                message: error.message ? error.message : 'Something went wrong',
                type: 'error',
                show: true,
            });
            return 0;
        }
    },
    async fetchProject({ commit }, id) {
        try {
            const response = await axios.get('/api/v1/project/' + id, {

            });
            console.log(response);
            if (response.success) {
                commit("setProject", response.data);
                return 1;
            } else {
                store.commit("user/setToast", {
                    message: response?.error?.explanation ? response.error?.explanation : 'Something went wrong',
                    type: 'error',
                    show: true,
                });
                return 0;
            }
        } catch (error) {
            console.log(error);
            store.commit("user/setToast", {
                message: error.message ? error.message : 'Something went wrong',
                type: 'error',
                show: true,
            });
            return 0;
        }
    },
    async deleteProject({ commit }, id) {
        try {
            const response = await axios.delete('/api/v1/project/' + id);
            if (response.success) {
                commit("removeProject", id);
                store.commit("user/setToast", {
                    message: 'Project deleted successfully',
                    type: 'success',
                    show: true,
                });
                return 1;
            } else {
                store.commit("user/setToast", {
                    message: response?.error?.explanation || 'Something went wrong',
                    type: 'error',
                    show: true,
                });
                return 0;
            }
        } catch (error) {
            console.error(error);
            store.commit("user/setToast", {
                message: error.message || 'Something went wrong',
                type: 'error',
                show: true,
            });
            return 0;
        }
    },

};

const mutations = {
    setProjects(state, payload) {
        state.projects = payload;
    },
    setProject(state, payload) {
        console.log(payload)
        state.project = payload;
    },
    addProject(state, payload) {
        state.projects.push(payload);
    },
    removeProject(state, id) {
        if (state.projects) {
            state.projects = state.projects.filter(project => project.id !== id);
        }
    },
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
