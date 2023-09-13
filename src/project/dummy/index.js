import Loadable from "../../component/Loadable";
import {lazy} from "react";

const DummyTaskList = Loadable(lazy(() => import('./page/ui-task-list')))
export {DummyTaskList}