import {getProfileData, setProfileData} from "../local_data";
import {createSlice} from "@reduxjs/toolkit";


const profile = getProfileData();
const initialState = profile
    ? {idxTimerRefresh: profile.idxTimerRefresh,
        task: profile.task ? profile.task:[],
        taskApi: profile.taskApi ? profile.taskApi:{}}
    : {idxTimerRefresh: 0, task: [], taskApi: {}};

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
    }
})

const {reducer, actions} = ProfileSlice;
export const {setIdxTimerRefresh, addNewTask, addNewTaskApi, clearTask, updateAllTask, updateAllTaskApi} = actions;
export default reducer;