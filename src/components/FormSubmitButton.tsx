"use client";

import { useFormStatus } from "react-dom";
import LoadingButton from "./LoadingButton";
import { ButtonProps } from "./ui/button";

function FormSubmitButton(props: ButtonProps) {
    const { pending } = useFormStatus();

    return <LoadingButton {...props} type="submit" loading={pending} />;
}

export default FormSubmitButton;
