import { Autocomplete } from "@react-google-maps/api"
import React, { useEffect, useRef, useState } from "react"
import { SearchInputProps } from "./interface"

export const SearchInput: React.FC<SearchInputProps> = ({ onPlaceChanged }) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        onPlaceChanged(location)
      }
    }
  }

  useEffect(() => {
    if (inputRef.current) {
    //   inputRef.current.style.cssText = applyInput
    }
  }, [inputRef])

  return (
    <Autocomplete
      onLoad={(auto) => setAutocomplete(auto)}
      onPlaceChanged={handlePlaceChanged}
      className="border rounded-lg"
    >
      <input className="btn border-b-8 pt-3 font-extrabold text-accent" placeholder="Location" ref={inputRef} />
    </Autocomplete>
  )
}

export default SearchInput