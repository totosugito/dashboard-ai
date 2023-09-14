import Loadable from "../../component/Loadable";
import {lazy} from "react";

const CcdpV1Dashboard = Loadable(lazy(() => import('./page/ui-dashboard')))
const CcdpV1ProjectEdit = Loadable(lazy(() => import('./page/ui-project-edit')))
const CcdpV1ProjectList = Loadable(lazy(() => import('./page/ui-project-list')))
const CcdpV1ProjectOpen = Loadable(lazy(() => import('./page/ui-project-open')))
const CcdpV1ModelEdit = Loadable(lazy(() => import('./page/ui-model-edit')))
const CcdpV1ModelList = Loadable(lazy(() => import('./page/ui-model-list')))
const CcdpV1ModelOpen = Loadable(lazy(() => import('./page/ui-model-open')))
export {
    CcdpV1Dashboard,
    CcdpV1ProjectEdit,
    CcdpV1ProjectList,
    CcdpV1ProjectOpen,
    CcdpV1ModelEdit,
    CcdpV1ModelList,
    CcdpV1ModelOpen
}