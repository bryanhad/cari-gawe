import React, { ComponentProps, forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import cityList from "@/lib/cities";

type LocationInputProps = {
    onLocationSelected: (location: string) => void;
} & ComponentProps<"input">;

// we need a ref in this custom input component, cuz in react hook form, a ref is needed for react-hook-form to make the user auto focus to a field that has a validation error!

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
    ({ onLocationSelected, ...props }, ref) => {
        const [locationSearchInput, setLocationSearchInput] = useState("");

        // use memo makes it so that this variable below will only re-render when locationSearchInput change. cuz otherwise, itwill re-render on every other change in any state. Cuz this filter operation is quite expensive.. the array is HUUUUGEEE
        const filteredCities = useMemo(() => {
            if (!locationSearchInput.trim()) return [];

            const searchWords = locationSearchInput.split(' ')

            return cityList.map(city => `${city.name}, ${city.subcountry}, ${city.country}`).filter(city => )
        }, [locationSearchInput]);

        return <Input ref={ref} {...props} />;
    },
);
LocationInput.displayName = "LocationInput";

export default LocationInput;
