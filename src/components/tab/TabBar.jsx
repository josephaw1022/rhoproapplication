import {
    BottomNavigation,
    BottomNavigationAction,
} from "@mui/material";
import React from "react";

export const TabBar = props => {
    return (
        <BottomNavigation
            sx={{
                backgroundColor: "#1976D2",
                position: "fixed",
                bottom: 0,
                width: "100%",
            }}
            value={props.selectedTab}
            showLabels
            onChange={(event, newValue) => props.setTab(newValue)}
        >
            {props.tabs &&
                props.tabs.map((item, index) => (
                    <BottomNavigationAction
                        {...item}
                        key={index}
                        icon={item.icon}
                        value={item.label}
                        label={
                            <span
                                className={
                                    item.label === props.selectedTab
                                        ? "text-white"
                                        : null
                                }
                            >
                                {item.label}
                            </span>
                        }
                    />
                ))}
        </BottomNavigation>
    );
};
