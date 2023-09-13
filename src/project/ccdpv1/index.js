import Loadable from "../../component/Loadable";
import {lazy} from "react";

const CcdpV1Dashboard = Loadable(lazy(() => import('./page/ui-dashboard')))
const CcdpV1ProjectEdit = Loadable(lazy(() => import('./page/ui-project-edit')))
export {CcdpV1Dashboard, CcdpV1ProjectEdit}