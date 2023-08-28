import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {UiDashboard, UiProjectCreate, UiProjectOpen, UiTimer, UiTimerApi} from "./page";

function App() {
  const theme = createTheme({})

  return (
      <ThemeProvider theme={theme}>
        <Routes>
            <Route path={"ui-timer-api"} element={<UiTimerApi/>}/>
            <Route path={"ui-timer"} element={<UiTimer/>}/>
            <Route path={""} element={<UiDashboard/>}/>
            <Route path={"ui-dashboard"} element={<UiDashboard/>}/>
            <Route path={"ui-project-create"} element={<UiProjectCreate/>}/>
            <Route path={"ui-project-open/:id"} element={<UiProjectOpen/>}/>
        </Routes>
      </ThemeProvider>
  );
}

export default App;
