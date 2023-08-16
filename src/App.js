import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {UiTimer, UiTimerApi} from "./page";

function App() {
  const theme = createTheme({})

  return (
      <ThemeProvider theme={theme}>
        <Routes>
            <Route path={""} element={<UiTimerApi/>}/>
            <Route path={"ui-timer"} element={<UiTimer/>}/>
        </Routes>
      </ThemeProvider>
  );
}

export default App;
