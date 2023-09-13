import BaseUi from "../base-ui";
import {Button, Grid, Paper, Typography, useTheme} from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import {useNavigate} from "react-router-dom";
import {getRouterUrl} from "../../../../router";

const MainDashboard = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const styles = {
        title: {
            mt: 3,
            mb: 3,
            fontSize: "20px"
        },
        grid: {
            mt: 1,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            overflow: "auto",
        },
        paper: {
            p: 2,
            width: '150px',
            textTransform: 'none'
        },
        icon: {
            fontSize: 60,
            color: theme.palette.primary.main
        }
    }
    return (<BaseUi title={<Typography sx={styles.title}>Project List</Typography>}>
        <Grid sx={styles.grid}>

            <Button onClick={()=>navigate(getRouterUrl("dummy-task-list"))}>
                <Paper sx={styles.paper}>
                    <AppRegistrationIcon style={styles.icon}/>
                    <Typography variant={'h4'}>Dummy</Typography>
                </Paper>
            </Button>
            <Button onClick={()=>navigate(getRouterUrl("ccdp-dashboard"))}>
                <Paper sx={styles.paper}>
                    <CreditCardIcon style={styles.icon}/>
                    <Typography variant={'h4'}>CCDP</Typography>
                </Paper>
            </Button>

            <Button onClick={()=>navigate(getRouterUrl("ccdp-v1-dashboard"))}>
                <Paper sx={styles.paper}>
                    <CreditScoreIcon style={styles.icon}/>
                    <Typography variant={'h4'}>CCDP v1</Typography>
                </Paper>
            </Button>
        </Grid>
    </BaseUi>)
}
export default MainDashboard