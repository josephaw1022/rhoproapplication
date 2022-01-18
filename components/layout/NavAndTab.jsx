import React from "react";
import { TabBar } from "../tab/TabBar";
import Navbar  from "../navbar/Navbar";
import { LoadingOrError } from "./LoadingOrError";

export const NavAndTab = ({
    icon,
    title,
    suffix,
    error,
    loading,
    
    selectedTab,
    tabs,
    tab,
    ...props
}) => {
    return (
        <div className="h-full overflow-y-none ">
            <Navbar
                icon={icon || null}
                title={title || null}
                suffix={suffix || null}
            />
            <div className="flex flex-col h-full overflow-y-none ">
                <div className="h-full grow  ">
                    <LoadingOrError error={error} loading={loading}>
                        {props.children}
                    </LoadingOrError>
                </div>
                <TabBar
                    selectedTab={selectedTab}
                    tabs={tabs}
                    setTab={tab => props.setTab(tab)}
                />
            </div>
        </div>
    );
};
