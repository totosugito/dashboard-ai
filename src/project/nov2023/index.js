
import Loadable from "../../component/Loadable";
import {lazy} from "react";

const UiMain = Loadable(lazy(() => import('./page/ui-main')))
const UiInputCsv = Loadable(lazy(() => import('./page/ui-input-csv')))
const UiTrelloKanban = Loadable(lazy(() => import('./page/ui-trello-kanban')))
export {UiMain, UiInputCsv, UiTrelloKanban}