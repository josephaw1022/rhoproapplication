
import { useRouter } from "next/router"
import LoggedIn from "../../../components/auth/LoggedIn"
import Navbar from "../../../components/navbar/Navbar"
import AppTable from "../../../components/table/Table"
import {
	ArrowBack,
	FeedOutlined as FeedOutlinedIcon,
	MoreVert as MoreVertIcon,
	Work as WorkIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

const JOB_COLUMNS = [
    { 
        field:"job", 
        headerName: "Job"
    }, 
    { 
        field: 'name', 
        headerName: 'Brother'
    }
]


export default function JobsForEvents(props){
    const router = useRouter()
    const { id } = router.query;
    

    const handleGoBack = () => router.push(`/apps/calendar/${id}`)



    return(
        <> 
            <Navbar 
                icon={<>
                <IconButton onClick={handleGoBack}>
							<ArrowBack className="icon" />
						</IconButton>
                </>}
                title={'Jobs'}
            /> 
            <AppTable 
                drawer={false}
                title="Jobs for event"
                columns={JOB_COLUMNS}
                entity={'jobs'}
                url={`/api/jobsforevent/${id}`}
            /> 

    </> 
    )   



}