
import Loadable from "../../component/Loadable";
import {lazy} from "react";

const UiMain = Loadable(lazy(() => import('./page/ui-main')))
export {UiMain}