import {Button, Card, CardHeader, Container, Link, Stack, Typography, useTheme} from "@mui/material";
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

    const dataStore = useSelector((state) => state.ccdp)
    const [project, setProject] = useState(dataStore["project"])
    const [model, setModel] = useState(dataStore["model"])


    const onProjectNewClicked = () => {
        navigate(getRouterUrl("ccdp-v1-project-edit"))
    }
    const onProjectSeeAllClicked = () => {
        console.log("all project")
    }

    const onModelNewClicked = () => {
        console.log("new model")
    }
    const onModelSeeAllClicked = () => {
        console.log("all model")
    }

    return (
        <>
            <BaseUi>
                <BoxSummary/>
                <HorItemList title={"PROJECTS"} see_all={"See all"} data={project} newText="New project"
                             onNewClicked={() => onProjectNewClicked()}
                             onSeeAllClicked={() => onProjectSeeAllClicked()}/>
                <HorItemList title={"MODELS"} see_all={"See all"} data={model} newText="New model"
                             onNewClicked={() => onModelNewClicked()} onSeeAllClicked={() => onModelSeeAllClicked()}/>
            </BaseUi>
        </>
    )
}
export default UiDashboard