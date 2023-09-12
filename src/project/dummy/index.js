import Loadable from "../../component/Loadable";
import {lazy} from "react";

const DummyDashboard = Loadable(lazy(() => import('./page/ui-dashboard')))
const DummyProjectCreate = Loadable(lazy(() => import('./page/ui-project-create')))
const DummyProjectOpen = Loadable(lazy(() => import('./page/ui-project-open')))
const DummyTaskList = Loadable(lazy(() => import('./page/ui-task-list')))
export {DummyDashboard, DummyProjectCreate, DummyProjectOpen, DummyTaskList}