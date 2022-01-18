import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { PrimaryButton } from "../button/PrimaryButton";
import { ConstantTextInput, TextInput } from "./Field";
import { Field } from "./FieldProps";
import { FormRow, FormWrapper as Form } from "./FormComponents";

export const FormTemplateComponent = ({
    initialValues,
    submitValue,
    validationSchema,
    FormTemplate,
    constant,
    ...props
}) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape(validationSchema),
        onSubmit: values => submitValue(values),
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            {FormTemplate.map((eachRow, index1) => (
                <FormRow key={index1*.2}>
                    {eachRow.map((eachField, index2) =>
                        constant ? (
                            <ConstantTextInput
                                {...Field(
                                    formik,
                                    eachField.fieldName,
                                    eachField.label,
                                    eachField?.type || "text"
                                )}
                                value={String(eachField.value)}
                                onChange={() => {}}
                                key={index2*2}
                                
                            />
                        ) : (
                            <TextInput
                                {...Field(
                                    formik,
                                    eachField.fieldName,
                                    eachField.label,
                                    eachField?.type || "text"
                                )}
                                key={index2*2}
                            />
                        )
                    )}
                </FormRow>
            ))}
            {constant ? null : (
                <div className="flex flex-row gap-4 my-8 w-full flex-wrap lg:flex-nowrap justify-end">
                    <PrimaryButton type="submit">
                        Submit
                    </PrimaryButton>
                </div>
            )}
        </Form>
    );
};
