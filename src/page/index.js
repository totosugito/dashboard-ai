import Loadable from "../component/Loadable";
import {lazy} from "react";

const UiTimer = Loadable(lazy(() => import('./ui-timer')))
const UiTimerApi = Loadable(lazy(() => import('./ui-timer-api')))
const UiDashboard = Loadable(lazy(() => import('./ui-dashboard')))
const UiProjectCreate = Loadable(lazy(() => import('./ui-project-create')))
const UiProjectOpen = Loadable(lazy(() => import('./ui-project-open')))
export {UiTimer, UiTimerApi, UiDashboard, UiProjectCreate, UiProjectOpen}