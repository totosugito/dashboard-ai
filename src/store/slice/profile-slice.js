import {getProfileData, setProfileData} from "../local_data";
import {createSlice} from "@reduxjs/toolkit";


const profile = getProfileData();
const initialState = profile
    ? {
        idxTimerRefresh: profile.idxTimerRefresh,
        task: profile.task ? profile.task : [],
        taskApi: profile.taskApi ? profile.taskApi : {},
        project: profile.project ? profile.project : []
    }
    : {idxTimerRefresh: 0, task: [], taskApi: {}, project: []};

const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setIdxTimerRefresh(state, action) {
            state.idxTimerRefresh = action.payload
            setProfileData(state)
        },
        addNewTask(state, action) {
            state.task.push(action.payload)
            setProfileData(state)
        },
        addNewTaskApi(state, action) {
            state.taskApi = action.payload
            setProfileData(state)
        },
        clearTask(state, action) {
            state.task = []
            state.taskApi = {}
            state.project = []
            setProfileData(state)
        },
        updateAllTask(state, action) {
            state.task = action.payload
            setProfileData(state)
        },
        updateAllTaskApi(state, action) {
            state.taskApi = action.payload
            setProfileData(state)
        },
        addProject(state, action) {
            state.project.push(action.payload)
            setProfileData(state)
        },
        projectDataUpdate(state, action) {
            for (let i = 0; i < state.project.length; i++) {
                let selected = state.project[i]
                if (selected["id"] === action.payload["project"]["id"]) {
                    state.project[i]["data"] = action.payload["data"]
                    state.project[i]["status"] = "done"
                    break
                }
            }
            setProfileData(state)
        },
        deleteProject(state, action) {
            for (let i = 0; i < state.project.length; i++) {
                let selected = state.project[i]
                if (selected["id"] === action.payload["id"]) {
                    state.project.splice(i, 1);
                }

            }
            setProfileData(state)
        },
    }
})

const {reducer, actions} = ProfileSlice;
export const {
    setIdxTimerRefresh,
    addNewTask,
    addNewTaskApi,
    clearTask,
    updateAllTask,
    updateAllTaskApi,
    addProject,
    deleteProject,
    projectDataUpdate
} = actions;
export default reducer;