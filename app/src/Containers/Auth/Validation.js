import * as Yup from "yup";

export const signIn = Yup.object().shape({
    email: Yup.string()
        .email()
        .required("Please provide email address."),
    password: Yup.string().required("Please provide password.")
});

export const registerValidation = Yup.object().shape({
    email: Yup.string()
        .email()
        .required("Please provide email address."),
    first_name: Yup.string().required("Please provide  first name."),
    last_name: Yup.string().required("Please provide  last name."),
    password: Yup.string().required("Please provide password."),
    reference_id: Yup.string().required("Please provide student id.").label("Student id"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm the password")
});

export const newBooking = Yup.object().shape({
    room_id: Yup.string().required("Something went wrong please refresh page."),
    booked_from: Yup.string().required("Please select booking from."),
    booked_to: Yup.string().required("Please select booking to."),
    persons: Yup.string().required("Please select number of person."),
    additional_requirements: Yup.string()
});