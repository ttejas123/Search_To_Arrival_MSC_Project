export interface MapProps {
  center?: string
  coord: LatLng
  latitudeFieldName?: string
  longitudeFieldName?: string
  zoom?: number
  markers?: string
  enableAddMark?: boolean
  enableSearch?: boolean
  enableClustering?: boolean
  onMarkerSelected?: (latLng: LatLng) => void
  onMarkerCreated?: (latLng: LatLng) => void
  onMarkersChanged?: (marks: LatLng[]) => void,
  colleges?: any[], 
  setColleges?: any,
  setNormalizedColleges?: any
}

export interface WrappedMapProps {
    displayName: string
    markers?: MarkersType
    loading?: boolean
    handleUpdateMultiExecutionResult: (
        updateSlice: {
        displayName: string
        value: Record<string, any>
        }[],
    ) => void
    handleOnMarkerCreated?: () => void
    handleOnMarkerSelect?: () => void
}

export interface SearchInputProps {
  onPlaceChanged: (location: google.maps.LatLngLiteral) => void
}
export type LatLng = google.maps.LatLngLiteral
export interface CustomLatLing {
  [key: string]: number
}
export type MarkersType = LatLng[] | CustomLatLing[]