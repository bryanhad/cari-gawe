"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";

function FormSubmitButton({ className, ...props }: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            className={className}
            {...props}
            type="submit"
            disabled={props.disabled || pending}
        >
            <span className="flex items-center justify-center gap-1">
                {pending && <Loader2 size={16} className="animate-spin" />}
                {pending ? 'Loading..' : props.children }
            </span>
        </Button>
    );
}

export default FormSubmitButton;