import BaseUi from "../base-ui";
import {Breadcrumbs, Button, Container, useTheme} from "@mui/material";
import {useParams} from "react-router-dom";
import {BrLabel, BrProjectList, BrProjectOpen, SkkToolbar} from "../../component";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    Edit,
    Filter,
    Selection,
    GanttComponent,
    Inject,
    Resize,
    Sort,
    Toolbar,
    ExcelExport,
    ColumnDirective, ColumnsDirective
} from "@syncfusion/ej2-react-gantt";

import '../../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-lists/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-layouts/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-grids/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-treegrid/styles/material.css';
import '../../../../../node_modules/@syncfusion/ej2-react-gantt/styles/material.css';

import { registerLicense } from '@syncfusion/ej2-base';
import {useRef} from "react";
registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEZiWH1ZcHdQRWJZWE12Xg==");
const UiProjectGantt = (props) => {
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
    const [trello, setTrello] = useState({lanes: []})


    useEffect(() => {
        let selectedId = params["id"] * 1
        for (let i = 0; i < project.length; i++) {
            if (project[i]["id"] === selectedId) {
                setSelectedProject(project[i])
                let trello_ = project[i]["trello"]
                if (!trello_.hasOwnProperty("lanes")) {
                    trello_ = {lanes: []}
                }
                setTrello(trello_)
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    let data = [
        {
            TaskID: 1,
            TaskName: 'Project Initiation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            subtasks: [
                {
                    TaskID: 2,
                    TaskName: 'Identify Site location',
                    StartDate: new Date('04/02/2019'),
                    Duration: 4,
                    Progress: 50
                },
            ]
        },
        ];
    let taskSettings = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        child: 'subtasks'
    };
    let toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'];
    let editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };

    const [ganttChartData, setGanttChartData] = useState([]);
    const ganttRef = useRef(null);

    const handleSave = (args) => {
        setGanttChartData(args.modifiedRecords);
        console.log('Data saved mod:', args.modifiedRecords);
        console.log('Data saved data:', JSON.stringify(args.data));
    };

    const handleSaveButtonClick = () => {
        let ll = ganttRef.current.currentViewData
        let result = []
        for (let i=0; i<ll.length; i++) {
            result.push(ll[i]["taskData"])
        }
        console.log(JSON.stringify(result))
        // console.log(JSON.stringify(ganttRef.current.currentViewData))
        // const ganttInstance = ganttRef.current;
        //
        // // Manually trigger the save operation
        // ganttInstance.save();
    };
    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Container maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                        <BrLabel label={"Gantt"}/>
                        <BrProjectOpen label={selectedProject["title"]} hasClick={false}/>
                    </Breadcrumbs>

                    <Button onClick={handleSaveButtonClick}>Save</Button>
                    <GanttComponent ref={ganttRef} dataSource={data} treeColumnIndex={1} taskFields={taskSettings}
                                    allowResizing={true} allowSelection={true} toolbar={toolbar} editSettings={editSettings} allowExcelExport={true}
                                    actionBegin={handleSave}>
                        <Inject services={[Edit, Selection, Toolbar, Filter, Sort, Resize, ExcelExport]}/>
                        {/*<Inject services={[ColumnDirective, ColumnsDirective]} />*/}
                    </GanttComponent>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectGantt