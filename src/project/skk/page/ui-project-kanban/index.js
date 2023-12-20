import BaseUi from "../base-ui";
import {Breadcrumbs, Button, Container, Stack, Typography, useTheme} from "@mui/material";
import {useParams} from "react-router-dom";
import {BrLabel, BrProjectList, BrProjectOpen, SkkToolbar} from "../../component";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import "../../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import '../../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import "../../../../../node_modules/@syncfusion/ej2-layouts/styles/material.css";
import '../../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import "../../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-react-kanban/styles/material.css";
import {registerLicense} from "@syncfusion/ej2-base";
import {ColumnDirective, ColumnsDirective, KanbanComponent} from "@syncfusion/ej2-react-kanban";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZiWH1ZcHdQRWJZWE12Xg==");
const UiProjectKanban = (props) => {
    const theme = useTheme()
    const styles = {
        container: {
            mt: 2
        },
        label: {
            mt: 2,
            fontWeight: 'bold',
            color: theme.palette.secondary.main
        },
        board: {
            backgroundColor: theme.palette.background.default
        }
    }

    const params = useParams();
    const dataStore = useSelector((state) => state.skk)
    const [project, setProject] = useState(dataStore["project"])
    const [selectedProject, setSelectedProject] = useState({})
    const [kanban, setKanban] = useState(undefined)


    useEffect(() => {
        let selectedId = params["id"] * 1
        for (let i = 0; i < project.length; i++) {
            if (project[i]["id"] === selectedId) {
                let tmp_ = JSON.parse(JSON.stringify(project[i]))
                setSelectedProject(tmp_)
                setKanban(tmp_["kanban"])
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    const onSaveClicked = () => {
        // console.log(JSON.stringify(trello))
    }

    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Container maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                        <BrLabel label={"Kanban"}/>
                        <BrProjectOpen label={selectedProject["title"]} hasClick={false}/>
                    </Breadcrumbs>

                    {/*<Button onClick={()=>onSaveClicked()} >Save</Button>*/}

                    {kanban !== undefined &&
                        <KanbanComponent
                            id="kanban"
                            keyField="Status"
                            dataSource={kanban}
                            cardSettings={{
                                contentField: "Summary",
                                headerField: "Id",
                                tagsField: "Tags",
                            }}
                        >
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open"/>
                                <ColumnDirective headerText="In Progress" keyField="InProgress"/>
                                <ColumnDirective headerText="Testing" keyField="Testing"/>
                                <ColumnDirective headerText="Done" keyField="Close"/>
                            </ColumnsDirective>
                        </KanbanComponent>
                    }
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectKanban