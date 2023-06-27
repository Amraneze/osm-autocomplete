import * as react_jsx_runtime from 'react/jsx-runtime';

interface Props {
    debounce?: number;
    placeholder?: string;
    noOptionName?: string;
    openStreetMapUrl?: string;
    value: OpeenStreetMap | null;
    onChange: (location: OpeenStreetMap | null) => void;
}
interface OpeenStreetMap {
    lat: string;
    lon: string;
    type: string;
    class: string;
    osm_id: number;
    licence: string;
    osm_type: string;
    place_id: number;
    importance: number;
    display_name: string;
    boundingbox: string[];
}
declare const OpenStreetMapAutocomplete: ({ value, onChange, debounce, placeholder, noOptionName, openStreetMapUrl }: Props) => react_jsx_runtime.JSX.Element;

export { OpeenStreetMap, OpenStreetMapAutocomplete };
