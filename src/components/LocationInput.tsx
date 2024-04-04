import cityList from "@/lib/cities";
import { ComponentProps, forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";

type LocationInputProps = {
    onLocationSelected: (location: string) => void;
} & ComponentProps<"input">;

// we need a ref in this custom input component, cuz in react hook form, a ref is needed for react-hook-form to make the user auto focus to a field that has a validation error!

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
    ({ onLocationSelected, ...props }, ref) => {
        const [locationSearchInput, setLocationSearchInput] = useState("");
        const [onFocus, setOnFocus] = useState(false);

        // use memo makes it so that this variable below will only re-render when locationSearchInput change. cuz otherwise, itwill re-render on every other change in any state. Cuz this filter operation is quite expensive.. the array is HUUUUGEEE
        const filteredCities = useMemo(() => {
            if (!locationSearchInput.trim()) return [];

            const searchWords = locationSearchInput.split(" ");

            return cityList
                .map(
                    (city) =>
                        `${city.name}, ${city.subcountry}, ${city.country}`,
                )
                .filter(
                    (city) =>
                        city
                            .toLowerCase()
                            .startsWith(searchWords[0].toLowerCase()) &&
                        searchWords.every((word) =>
                            city.toLowerCase().includes(word.toLowerCase()),
                        ),
                )
                .slice(0, 5);
        }, [locationSearchInput]);

        return (
            <div className="relative">
                <Input
                    placeholder="Search for a city"
                    type="search"
                    onChange={(e) => setLocationSearchInput(e.target.value)}
                    // Using onFocus and onBlur to set the onFocus state
                    onFocus={() => setOnFocus(true)}
                    onBlur={() => setOnFocus(false)}
                    value={locationSearchInput}
                    ref={ref}
                    {...props}
                />
                {locationSearchInput.trim() && onFocus && (
                    // we only show the filtered cities when the search input is not empty and if the onFocus is true
                    <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
                        {!filteredCities.length && (
                            <p className="p-3">No matching result found</p>
                        )}
                        {filteredCities.map((city) => (
                            <button
                                type="button"
                                key={city}
                                className="block w-full p-2 text-start"
                                // We use onMouseDown instead of onClick. cuz if we use onClik, it messed with the focus
                                onMouseDown={(e) => {
                                    e.preventDefault()
                                    onLocationSelected(city)
                                    setLocationSearchInput('')
                                }}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    },
);
LocationInput.displayName = "LocationInput";

export default LocationInput;
