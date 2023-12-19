import {createSlice} from "@reduxjs/toolkit";

const SLICE_KEY = "skk"
export function getData() {
    return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
    localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

const data = getData();
const initialState = data
    ? {
        user: data.user ? data.user : {"name": "John", "avatar": "https://mui.com/static/images/avatar/1.jpg", "level": "admin"},
        project: data.project ? data.project : [],
    }
    : {project: [], user: {"name": "John", "avatar": "https://mui.com/static/images/avatar/1.jpg", "level": "admin"}};

const dataSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        skkProjectClear(state, action) {
            state.project = []
            setData(state)
        },

        skkProjectAdd(state, action) {
            state.project.push(action.payload)
            setData(state)
        },

        skkProjectUpdate(state, action) {
            for (let i = 0; i < state.project.length; i++) {
                let selected = state.project[i]
                if (selected["id"] === action.payload["id"]) {
                    state.project[i] = action.payload
                }
            }
            setData(state)
        },
        skkProjectDelete(state, action) {
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
    skkProjectClear,
    skkProjectAdd,
    skkProjectUpdate,
    skkProjectDelete,
} = actions;
export default reducer;