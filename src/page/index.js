import Loadable from "../component/Loadable";
import {lazy} from "react";

const UiTimer = Loadable(lazy(() => import('./ui-timer')))
const UiTimerApi = Loadable(lazy(() => import('./ui-timer-api')))
export {UiTimer, UiTimerApi}