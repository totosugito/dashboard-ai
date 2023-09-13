import {createSlice} from "@reduxjs/toolkit";

const SLICE_KEY = "ccdp"
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
        model: data.model ? data.model : [],
    }
    : {idxTimerRefresh: 0, project: [], model: []};

const dataSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        setIdxTimerRefresh(state, action) {
            state.idxTimerRefresh = action.payload
            setData(state)
        },
        projectAdd(state, action) {
            state.project.push(action.payload)
            setData(state)
        },
        projectUpdate(state, action) {
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
        projectDelete(state, action) {
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
    projectAdd,
    projectUpdate,
    projectDelete
} = actions;
export default reducer;