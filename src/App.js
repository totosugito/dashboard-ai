import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {MainDashboard} from "./project/main";
import {DummyTaskList} from "./project/dummy";
import {CcdpDashboard, CcdpProjectCreate, CcdpProjectOpen} from "./project/ccdp";
import {
    CcdpV1Dashboard,
    CcdpV1ProjectEdit,
    CcdpV1ProjectList,
    CcdpV1ProjectOpen,
    CcdpV1ModelEdit,
    CcdpV1ModelList,
    CcdpV1ModelOpen,
    CcdpV1JobCreate,
    CcdpV1JobOpen

} from "./project/ccdpv1";
import {UiMain} from "./project/nov2023";
import {getRouterUrl} from "./router";

function App() {
    const theme = createTheme({})

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path={""} element={<UiMain/>}/>
                <Route path={getRouterUrl("main-dashboard")} element={<UiMain/>}/>


                <Route path={getRouterUrl("dummy-task-list")} element={<DummyTaskList/>}/>
                <Route path={getRouterUrl("ccdp-dashboard")} element={<CcdpDashboard/>}/>
                <Route path={getRouterUrl("ccdp-project-create")} element={<CcdpProjectCreate/>}/>
                <Route path={getRouterUrl("ccdp-project-open")} element={<CcdpProjectOpen/>}/>
                <Route path={getRouterUrl("ccdp-v1-dashboard")} element={<CcdpV1Dashboard/>}/>
                <Route path={getRouterUrl("ccdp-v1-project-edit")} element={<CcdpV1ProjectEdit/>}/>
                <Route path={getRouterUrl("ccdp-v1-project-list")} element={<CcdpV1ProjectList/>}/>
                <Route path={getRouterUrl("ccdp-v1-project-open")} element={<CcdpV1ProjectOpen/>}/>
                <Route path={getRouterUrl("ccdp-v1-model-edit")} element={<CcdpV1ModelEdit/>}/>
                <Route path={getRouterUrl("ccdp-v1-model-list")} element={<CcdpV1ModelList/>}/>
                <Route path={getRouterUrl("ccdp-v1-model-open")} element={<CcdpV1ModelOpen/>}/>
                <Route path={getRouterUrl("ccdp-v1-job-create")} element={<CcdpV1JobCreate/>}/>
                <Route path={getRouterUrl("ccdp-v1-job-open")} element={<CcdpV1JobOpen/>}/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
