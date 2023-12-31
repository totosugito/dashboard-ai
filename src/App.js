import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
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
import {UiInputCsv} from "./project/nov2023";
import {
    SkkHome,
    SkkHomeMap,
    SkkProjectList,
    SkkProjectCreate,
    SkkProjectOpen,
    SkkProjectEdit,
    UiProjectKanban,
    UiProjectGantt
} from "./project/skk";
import {getRouterUrl} from "./router";

function App() {
    const theme = createTheme({})

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path={"/"} element={<SkkHome/>}/>
                <Route path={getRouterUrl("skk-home")} element={<SkkHome/>}/>
                <Route path={getRouterUrl("skk-home-map")} element={<SkkHomeMap/>}/>
                <Route path={getRouterUrl("skk-project-list")} element={<SkkProjectList/>}/>
                <Route path={getRouterUrl("skk-project-create")} element={<SkkProjectCreate/>}/>
                <Route path={getRouterUrl("skk-project-open")} element={<SkkProjectOpen/>}/>
                <Route path={getRouterUrl("skk-project-edit")} element={<SkkProjectEdit/>}/>
                <Route path={getRouterUrl("skk-project-kanban")} element={<UiProjectKanban/>}/>
                <Route path={getRouterUrl("skk-project-gantt")} element={<UiProjectGantt/>}/>

                <Route path={getRouterUrl("ui-input-csv")} element={<UiInputCsv/>}/>


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
