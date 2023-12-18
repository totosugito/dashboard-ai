import {Link} from "@mui/material";
import {getRouterUrl} from "../../../../router";
import HomeIcon from "@mui/icons-material/Home";

const BrProjectList = ({hasClick=true}) => {
    return (
        <Link underline="hover" color="inherit" sx={{display: 'flex', alignItems: 'center'}}
              href={hasClick ? getRouterUrl("skk-project-list") : "#"}>
            <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>
            Project
        </Link>
    )
}
export default BrProjectList