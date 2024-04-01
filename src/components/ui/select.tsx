import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

type SelectProps = {} & ComponentProps<"select">;

// we wrap the whole component in a forwardRef function, we must do so so that we can get the ref prop.
// IMO, the ref is a special type of prop that is used for some scenario when we want to get the direct reference to the component.. In this case, we need to have the ref available so that this component will work as inteded with react hook form..

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, ...props }, ref) => {
        return (
            // appearance-none is for removing the default arrow icon on select tag
            // truncate is to add an ellipses if the text is too long
            <div className="relative">
                <select
                    {...props}
                    ref={ref}
                    className={cn(
                        "h-10 w-full appearance-none truncate rounded-md border border-input bg-background py-2 pl-3 pr-8 text-sm  ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                    )}
                />
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
            </div>
        );
    },
);

Select.displayName = "Select";
export default Select;
