import {createSlice} from "@reduxjs/toolkit";

const SLICE_KEY = "dummy"
export function getData() {
    return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
    localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

const data = getData();
const initialState = data
    ? {
        idxTimerRefresh: data.idxTimerRefresh ? data.idxTimerRefresh : 0,
        project: data.project ? data.project : [],
        taskApi: data.taskApi ? data.taskApi : {},
    }
    : {project: [], taskApi: {}, idxTimerRefresh: 0};

const dataSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        setIdxTimerRefresh(state, action) {
            state.idxTimerRefresh = action.payload
            setData(state)
        },

        addNewTaskApi(state, action) {
            state.taskApi = action.payload
            setData(state)
        },
        clearTask(state, action) {
            state.taskApi = {}
            setData(state)
        },
        updateAllTaskApi(state, action) {
            state.taskApi = action.payload
            setData(state)
        },

        // -----------------------------------------

        dummyAddProject(state, action) {
            state.project.push(action.payload)
            setData(state)
        },
        dummyProjectUpdate(state, action) {
            for (let i = 0; i < state.project.length; i++) {
                let selected = state.project[i]
                if (selected["id"] === action.payload["project"]["id"]) {
                    state.project[i]["data"] = action.payload["data"]
                    state.project[i]["status"] = "done"
                    break
                }
            }
            setData(state)
        },
        dummyDeleteProject(state, action) {
            for (let i = 0; i < state.project.length; i++) {
                let selected = state.project[i]
                if (selected["id"] === action.payload["id"]) {
                    state.project.splice(i, 1);
                }
            }
            setData(state)
        },
    }
})

const {reducer, actions} = dataSlice;
export const {
    setIdxTimerRefresh,
    addNewTaskApi,
    clearTask,
    updateAllTaskApi,
    dummyAddProject,
    dummyProjectUpdate,
    dummyDeleteProject
} = actions;
export default reducer;