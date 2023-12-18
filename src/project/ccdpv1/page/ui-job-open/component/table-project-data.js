import {Container} from "@mui/material";
import MaterialReactTable from "material-react-table";


const TableProjectData = (props) => {
    const styles = {
        container: {
            mt: 2,
        },
    }

    const create_table_column = () => {
        let columns = []
        for (const key in props.data[0]) {
            columns.push({
                accessorKey: key,
                header: key,
                enableSorting: true,
                enableColumnActions: false,
                size: 130
            })
        }
        return (columns)
    }

    return(
        <>
            <Container maxWidth="xl" sx={styles.container}>
                {/*<MaterialReactTable*/}
                {/*    columns={create_table_column()}*/}
                {/*    data={props.data}*/}
                {/*    enableStickyHeader*/}
                {/*    manualSorting={false}*/}
                {/*    enableTopToolbar={false}*/}
                {/*    enableStickyFooter={false}*/}
                {/*    enableFullScreenToggle={false}*/}
                {/*    enableDensityToggle={false}*/}
                {/*    enableColumnFilters={false}*/}
                {/*    enableBottomToolbar={props.data.length > 15}*/}
                {/*    muiTableProps={{*/}
                {/*        sx: {*/}
                {/*            tableLayout: 'fixed',*/}
                {/*        },*/}
                {/*    }}*/}
                {/*    initialState={{*/}
                {/*        pagination: {pageSize: 15, pageIndex: 0},*/}
                {/*        density: 'compact',*/}
                {/*    }}*/}
                {/*/>*/}
            </Container>
        </>
    )
}
export default TableProjectData