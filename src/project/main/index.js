
import Loadable from "../../component/Loadable";
import {lazy} from "react";

const MainDashboard = Loadable(lazy(() => import('./page/main-dashboard')))
export {MainDashboard}