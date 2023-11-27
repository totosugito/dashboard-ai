
import Loadable from "../../component/Loadable";
import {lazy} from "react";

const UiMain = Loadable(lazy(() => import('./page/ui-main')))
const UiInputCsv = Loadable(lazy(() => import('./page/ui-input-csv')))
const UiSyncfusionKanban = Loadable(lazy(() => import('./page/ui-syncfusion-kanban')))
const UiTrelloKanban = Loadable(lazy(() => import('./page/ui-trello-kanban')))
export {UiMain, UiInputCsv, UiSyncfusionKanban, UiTrelloKanban}