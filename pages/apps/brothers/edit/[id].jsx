import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {useRouter} from 'next/router'
import { FormTemplateComponent } from "../../../../components/form/Template";
import {
    requiredEmailVal,
    requiredTextVal,
} from "../../../../components/form/Validations";
import { LoadingOrError } from "../../../../components/layout/LoadingOrError";
import { Navbar } from "../../../../components/navbar/Navbar";
import { getBrother } from "../../../../redux/entities/users/user.thunks";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const BrotherEdit = ({ newEntry, ...props }) => {
    
    const dispatch = useDispatch();
    const navigate = useRouter();
    const { id } = navigate.query
    const [brother, setBrother] = useState({});
    const [loading, setLoading] = useState(newEntry ? false : true);
    const [error, setError] = useState(false);
    const FormTemplate = [
        [
            {
                fieldName: "name",
                label: "Name",
                type: "text",
            },
        ],
        [
            {
                fieldName: "scroll_number",
                label: "Scroll Number",
                type: "number",
            },
            {
                fieldName: "email",
                label: "Email",
                type: "email",
            },
        ],
    ];

    const handleSubmit = values => {
        console.log(values);
    };

    const validation = {
        name: requiredTextVal(),
        scroll_number: requiredTextVal(),
        email: requiredEmailVal(),
    };

    useEffect(() => {
        dispatch(
            getBrother({
                id,
                callback: (err, value) => {
                    if (err) setError(true);
                    if (value) setBrother(value);
                    setLoading(false);
                },
            })
        );
    }, []);

    const handleGoBack = () => navigate.push(`/apps/brothers/${id}`);

    const handleMenuClick = () => {
        
    };

    return (
        <>
            <Navbar
                title={newEntry ? "Create Brother" : "Edit Brother"}
                icon={
                    <IconButton onClick={handleGoBack}>
                        <ArrowBack className="icon" />
                    </IconButton>
                }
                suffix={
                    newEntry ? null : (
                        <IconButton onClick={handleMenuClick}>
                            <MoreVertIcon className="icon" />
                        </IconButton>
                    )
                }
            />
            <LoadingOrError loading={loading} error={error}>
                <FormTemplateComponent
                    initialValues={brother}
                    submitValue={values => handleSubmit(values)}
                    validationSchema={validation}
                    FormTemplate={FormTemplate}
                />
            </LoadingOrError>
        </>
    );
};

export default BrotherEdit;