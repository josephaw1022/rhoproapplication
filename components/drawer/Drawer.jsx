import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { AppBar, BackdropUnstyled, Toolbar } from "@mui/material";
import React from "react";
import { useRouter} from "next/router"
import { PrimaryButton } from "../button/PrimaryButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
export const DrawerComponent = ({
    open,
    onClose,
    anchor,
    ...props
}) => {
    const navigate = useRouter();

    const handleRosterButtonClick = () => {
        props.closeDrawer();
        navigate.push("/apps/brothers");
    };

    const handleEventButtonClick = () => {
        props.closeDrawer();
        navigate.push("/apps/events");
    };

    return (
        <>
            <AppBar sx={{ top: 0, position: "relative" }}>
                <Toolbar className="flex flex-wrap  justify-center items-start gap-2 ">
                    <BackdropUnstyled
                        sx={{
                            color: "#fff",
                            zIndex: theme => theme.zIndex.drawer + 1,
                            top: 0,
                            position: "fixed",
                        }}
                        open={open}
                        onClick={() => {}}
                        className="flex  flex-wrap  lg:flex-nowrap justify-start items-start gap-4 p-6 "
                    >
                        <PrimaryButton
                            onClick={handleEventButtonClick}
                        >
                            Announcements
                        </PrimaryButton>
                        <PrimaryButton
                            startIcon={<AccountBoxIcon />}
                            onClick={handleRosterButtonClick}
                        >
                            Roster
                        </PrimaryButton>

                        <PrimaryButton
                            onClick={handleEventButtonClick}
                            startIcon={<InsertInvitationIcon />}
                        >
                            Events
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={handleEventButtonClick}
                            startIcon={<AttachMoneyIcon />}
                        >
                            Budget
                        </PrimaryButton>
                    </BackdropUnstyled>
                </Toolbar>
            </AppBar>
            {/* <CircularProgress color="inherit" /> */}
        </>
    );
};
