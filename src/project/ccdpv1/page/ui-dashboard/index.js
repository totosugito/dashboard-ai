import {useTheme} from "@mui/material";
import BaseUi from "../base-ui";
import BoxSummary from "./component/box-summary";
import {useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getRouterUrl} from "../../../../router";
import HorItemList from "./component/hor-item-list";

const UiDashboard = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const styles = {}

    const dataStore = useSelector((state) => state.ccdpv1)
    const [project, setProject] = useState(dataStore["project"])
    const [model, setModel] = useState(dataStore["model"])


    const onProjectNewClicked = () => {
        navigate(getRouterUrl("ccdp-v1-project-edit"))
    }

    const onModelNewClicked = () => {
        navigate(getRouterUrl("ccdp-v1-model-edit"))
    }

    return (
        <>
            <BaseUi>
                <BoxSummary/>
                <HorItemList title={"PROJECTS"} see_all={"See all"} data={project} newText="New project"
                             onNewClicked={() => onProjectNewClicked()}
                             seeAllUrl={getRouterUrl("ccdp-v1-project-list")}
                             onItemClicked={(v) => navigate(getRouterUrl("ccdp-v1-project-open", "/", {id: v["id"]}))}
                />
                <HorItemList title={"MODELS"} see_all={"See all"} data={model} newText="New model"
                             onNewClicked={() => onModelNewClicked()}
                             seeAllUrl={getRouterUrl("ccdp-v1-model-list")}
                             onItemClicked={(v) => navigate(getRouterUrl("ccdp-v1-model-open", "/", {id: v["id"]}))}
                />
            </BaseUi>
        </>
    )
}
export default UiDashboard