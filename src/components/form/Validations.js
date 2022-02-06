import * as Yup from "yup";

const short = "Too Short!";
const long = "Too Long!";
const required = "Required!";

const min = 2;
const max = 50;

export const requiredTextVal = () =>
    Yup.string().min(min, short).max(max, long).required(required);

export const textVal = () =>
    Yup.string().min(min, short).max(max, long).required(required);

export const emailVal = () => Yup.string().email();

export const requiredEmailVal = () =>
    Yup.string().email("Invalid Email").required(required);

export const requiredAgeVal = () =>
    Yup.number().min(0).max(100).required();

export const requiredGenderVal = () =>
    Yup.string().matches(
        /(male|Male|female|Female|man|Man|woman|Woman|Other|other)/,
        "Please type male, female, or other"
    );
