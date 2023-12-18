import {Box, Grid, IconButton, Typography, useTheme} from "@mui/material";
import MaterialReactTable from "material-react-table";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import {useState} from "react";
import {dispatch} from "../../../../../store";
import MuiDialog from "../../../../../component/MuiDialog";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {getRouterUrl} from "../../../../../router";
import {modelDelete, projectDelete} from "../../../../../store/slice/ccdpv1";

const TableProjectList = (props) => {
    const theme = useTheme()
    const styles = {}

    const create_table_column = () => {
        return ([
            {
                accessorKey: 'title',
                header: "Title",
                enableSorting: true,
                enableColumnActions: false,
                Cell: ({cell, row}) => (
                    <>
                        <Typography>{cell.getValue()}</Typography>
                        <Typography sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '90%',
                            fontStyle: 'italic'
                        }}>{row.original["desc"]}</Typography>
                    </>
                )
            },
            {
                accessorKey: 'creator',
                header: "Creator",
                enableSorting: true,
                enableColumnActions: false,
                size: 100,
            },
            {
                accessorKey: 'created',
                header: "Created",
                enableSorting: true,
                enableColumnActions: false,
                size: 100,
                Cell: ({cell}) => (
                    <>
                        <div>{cell.getValue() !== undefined ? cell.getValue().split(", ")[0] : ""}</div>
                        <div>{cell.getValue() !== undefined ? cell.getValue().split(", ")[1] : ""}</div>
                    </>
                )
            },
            {
                accessorKey: 'action',
                header: "Action",
                enableSorting: false,
                enableColumnActions: false,
                size: 100,
                Cell: ({cell, row}) => (
                    <>
                        <IconButton
                            onClick={() => showDialogDelete(row.original)}><DeleteForeverOutlinedIcon/></IconButton>
                        <IconButton onClick={() => openProjectPage(row.original)}><FolderOpenOutlinedIcon/></IconButton>
                    </>
                )
            }
        ])
    }

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState({original: {title: ''}})
    const [data, setData] = useState(props.data)
    const dataPrev = useRef(props.data);
    const navigate = useNavigate()

    const openProjectPage = (row) => {
        navigate(getRouterUrl("ccdp-v1-model-open", "/", {id: row['id']}))
    }

    const showDialogDelete = (row) => {
        setSelectedRow(row)
        setOpenDeleteDialog(true)
    }
    const dialogClearOnCancelClicked = () => {
        setOpenDeleteDialog(false)
    }
    const dialogClearOnConfirmClicked = () => {
        dispatch(modelDelete(selectedRow))
        setOpenDeleteDialog(false)
        window.location.reload()
    }
    return (
        <>
            {/*<MaterialReactTable*/}
            {/*    columns={create_table_column()}*/}
            {/*    data={data}*/}
            {/*    enableStickyHeader*/}
            {/*    manualSorting={false}*/}
            {/*    enableTopToolbar={false}*/}
            {/*    enableStickyFooter={false}*/}
            {/*    enableFullScreenToggle={false}*/}
            {/*    enableDensityToggle={false}*/}
            {/*    enableColumnFilters={false}*/}
            {/*    enableBottomToolbar={data.length > 10}*/}
            {/*    muiTableProps={{*/}
            {/*        sx: {},*/}
            {/*    }}*/}
            {/*    initialState={{}}*/}
            {/*/>*/}

            <MuiDialog
                open={openDeleteDialog}
                title={<Box textAlign={'center'}><Typography variant={'h4'}>Delete Project</Typography></Box>}
                contents={
                    <>
                        <Grid container spacing={2}>
                            <Grid item sx={{maxWidth: '300px'}}>
                                <Typography>Are you want to delete project <b>{selectedRow['title']}</b> ?</Typography>
                            </Grid>
                        </Grid>
                    </>
                }
                cancelText={"No"}
                confirmText={"Yes"}
                onCancelClicked={dialogClearOnCancelClicked}
                onConfirmClicked={dialogClearOnConfirmClicked}
            />
        </>
    )
}
export default TableProjectList