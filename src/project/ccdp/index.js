import Loadable from "../../component/Loadable";
import {lazy} from "react";

const CcdpDashboard = Loadable(lazy(() => import('./page/ui-dashboard')))
const CcdpProjectCreate = Loadable(lazy(() => import('./page/ui-project-create')))
const CcdpProjectOpen = Loadable(lazy(() => import('./page/ui-project-open')))
export {CcdpDashboard, CcdpProjectCreate, CcdpProjectOpen}