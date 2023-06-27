import * as react_jsx_runtime from 'react/jsx-runtime';
import { CSSProperties } from 'react';

interface OpenStreetMapAutocompleteStyle<T> {
    root: T;
    form: T;
    inputWrapper: T;
    input: T;
    divider: T;
    button: T;
    listWrapper: T;
    options: T;
}
interface Props {
    debounce?: number;
    placeholder?: string;
    noOptionName?: string;
    openStreetMapUrl?: string;
    value: OpeenStreetMap | null;
    classes?: OpenStreetMapAutocompleteStyle<string>;
    styles?: OpenStreetMapAutocompleteStyle<CSSProperties>;
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
declare function OpenStreetMapAutocomplete({ value, styles, classes, onChange, debounce, placeholder, noOptionName, openStreetMapUrl, }: Props): react_jsx_runtime.JSX.Element;

export { OpeenStreetMap, OpenStreetMapAutocomplete };
