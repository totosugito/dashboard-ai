import {getProfileData, setProfileData} from "../local_data";
import {createSlice} from "@reduxjs/toolkit";


const profile = getProfileData();
const initialState = profile
    ? {idxTimerRefresh: profile.idxTimerRefresh, task: profile.task ? profile.task:[]}
    : {idxTimerRefresh: 0, task: []};

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
        clearTask(state, action) {
            state.task = []
            setProfileData(state)
        },
        updateAllTask(state, action) {
            state.task = action.payload
            setProfileData(state)
        },
    }
})

const {reducer, actions} = ProfileSlice;
export const {setIdxTimerRefresh, addNewTask, clearTask, updateAllTask} = actions;
export default reducer;