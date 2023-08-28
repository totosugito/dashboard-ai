import {Box, Grid, Typography, useTheme} from "@mui/material";
import BaseUi from "../base-ui";
import BoxSummary from "./component/box-summary";
import TableProjectList from "./component/table-project-list";
import {useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const UiDashboard = () => {
    const theme = useTheme()
    const styles = {

    }

    const profile = useSelector((state) => state.profile)
    const [project, setProject] = useState(profile.project)
    const navigate = useNavigate()
    const onClickCreateProject = () => {
        navigate('/ui-project-create')
    }

    return (
        <>
            <BaseUi>
                <BoxSummary/>
                <TableProjectList onClickCreateProject={onClickCreateProject} data={project}/>
            </BaseUi>
        </>
    )
}
export default UiDashboard