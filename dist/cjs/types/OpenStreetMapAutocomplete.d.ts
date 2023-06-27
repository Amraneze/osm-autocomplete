import './index.scss';
interface Props {
    debounce?: number;
    placeholder?: string;
    noOptionName?: string;
    openStreetMapUrl?: string;
    value: OpeenStreetMap | null;
    onChange: (location: OpeenStreetMap | null) => void;
}
export interface OpeenStreetMap {
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
export declare const OpenStreetMapAutocomplete: ({ value, onChange, debounce, placeholder, noOptionName, openStreetMapUrl }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
