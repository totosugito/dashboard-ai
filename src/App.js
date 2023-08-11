import {createTheme, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {UiTimer} from "./page";

function App() {
  const theme = createTheme({})

  return (
      <ThemeProvider theme={theme}>
        <Routes>
            <Route path={""} element={<UiTimer/>}/>
        </Routes>
      </ThemeProvider>
  );
}

export default App;
