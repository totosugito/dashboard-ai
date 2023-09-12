import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {MainDashboard} from "./project/main";
import {DummyDashboard, DummyProjectCreate, DummyProjectOpen, DummyTaskList} from "./project/dummy";
import {getRouterUrl} from "./router";

function App() {
  const theme = createTheme({})

  return (
      <ThemeProvider theme={theme}>
        <Routes>
            <Route path={""} element={<MainDashboard/>}/>
            <Route path={getRouterUrl("main-dashboard")} element={<MainDashboard/>}/>

            <Route path={getRouterUrl("dummy-dashboard")} element={<DummyDashboard/>}/>
            <Route path={getRouterUrl("dummy-project-create")} element={<DummyProjectCreate/>}/>
            <Route path={getRouterUrl("dummy-project-open")} element={<DummyProjectOpen/>}/>
            <Route path={getRouterUrl("dummy-task-list")} element={<DummyTaskList/>}/>
        </Routes>
      </ThemeProvider>
  );
}

export default App;
