
import Loadable from "../../component/Loadable";
import {lazy} from "react";

const SkkProjectList = Loadable(lazy(() => import('./page/ui-project-list')))
const SkkProjectCreate = Loadable(lazy(() => import('./page/ui-project-create')))
const SkkProjectOpen = Loadable(lazy(() => import('./page/ui-project-open')))
const SkkProjectEdit = Loadable(lazy(() => import('./page/ui-project-edit')))
const UiProjectTrello = Loadable(lazy(() => import('./page/ui-project-trello')))
export {SkkProjectList, SkkProjectCreate, SkkProjectOpen, SkkProjectEdit, UiProjectTrello}