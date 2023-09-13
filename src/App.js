import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {MainDashboard} from "./project/main";
import {DummyTaskList} from "./project/dummy";
import {CcdpDashboard, CcdpProjectCreate, CcdpProjectOpen} from "./project/ccdp";
import {CcdpV1Dashboard, CcdpV1ProjectEdit} from "./project/ccdpv1";
import {getRouterUrl} from "./router";

function App() {
  const theme = createTheme({})

  return (
      <ThemeProvider theme={theme}>
        <Routes>
            <Route path={""} element={<MainDashboard/>}/>
            <Route path={getRouterUrl("main-dashboard")} element={<MainDashboard/>}/>

            <Route path={getRouterUrl("dummy-task-list")} element={<DummyTaskList/>}/>

            <Route path={getRouterUrl("ccdp-dashboard")} element={<CcdpDashboard/>}/>
            <Route path={getRouterUrl("ccdp-project-create")} element={<CcdpProjectCreate/>}/>
            <Route path={getRouterUrl("ccdp-project-open")} element={<CcdpProjectOpen/>}/>

            <Route path={getRouterUrl("ccdp-v1-dashboard")} element={<CcdpV1Dashboard/>}/>
            <Route path={getRouterUrl("ccdp-v1-project-edit")} element={<CcdpV1ProjectEdit/>}/>
        </Routes>
      </ThemeProvider>
  );
}

export default App;
