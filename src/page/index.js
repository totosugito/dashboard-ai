import Loadable from "../component/Loadable";
import {lazy} from "react";

const UiTimer = Loadable(lazy(() => import('./ui-timer')))
export {UiTimer}