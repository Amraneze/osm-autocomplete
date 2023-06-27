import { useState, useEffect, KeyboardEvent, useRef, useCallback, CSSProperties } from 'react';

import './index.scss';
import { useDebounce } from '@hooks';

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

const DEFAULT_OPTION = {
    lat: '0',
    lon: '0',
    type: '0',
    class: '0',
    osm_id: 0,
    licence: '0',
    osm_type: '0',
    place_id: 0,
    importance: 0,
    display_name: '',
    boundingbox: [],
};

export function OpenStreetMapAutocomplete({
    value,
    styles,
    classes,
    onChange,
    debounce = 500,
    placeholder = 'Search',
    noOptionName = 'No locations found',
    openStreetMapUrl = 'https://nominatim.openstreetmap.org',
}: Props) {
    const [isActive, setActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const debouncedValue = useDebounce<string>(inputValue, debounce);
    const [options, setOptions] = useState<OpeenStreetMap[]>([]);
    const [selectedOption, setSelectedOption] = useState<OpeenStreetMap | null>(null);

    useEffect(() => {
        if (value) {
            if (inputRef.current) {
                setSelectedOption(value);
                setInputValue(value.display_name);
                inputRef.current.value = value.display_name;
            }
        }
    }, [value]);

    const displayOptionsList = () => {
        setActive(true);
    };

    const hideOptionsList = () => {
        setActive(false);
    };

    const getGeocoding = useCallback(
        (address = '') => {
            if (!address) return;
            const url = `${openStreetMapUrl}/search?format=json&q=${address}`;

            fetch(url)
                .then((response) => response.json())
                .then((data: OpeenStreetMap[]) =>
                    setOptions(
                        data.filter(
                            (location, index, array) =>
                                array.findIndex(
                                    (innerLocation) => innerLocation.display_name === location.display_name
                                ) === index
                        )
                    )
                )
                .catch(() => setOptions([]));
        },
        [openStreetMapUrl]
    );

    useEffect(() => {
        if (debouncedValue) {
            displayOptionsList();
            getGeocoding(debouncedValue);
        }
    }, [debouncedValue, getGeocoding]);

    const handleOnAutocomplete = (event: KeyboardEvent<HTMLInputElement>) => {
        setInputValue((event.target as HTMLInputElement).value);
    };

    const handleOnSearchClick = () => {
        if (inputRef.current) {
            displayOptionsList();
            setInputValue(inputRef.current.value);
        }
    };

    const handleOnSelectOption = (option: OpeenStreetMap) => {
        setSelectedOption(option);
        if (inputRef.current) {
            inputRef.current.value = option.display_name;
        }
        onChange(option);
        hideOptionsList();
    };

    return (
        <div className={classes?.root ?? 'autocomplete'} style={{ ...(styles?.root ?? {}) }}>
            <form
                className={classes?.form ?? 'autocomplete-form'}
                onBlur={hideOptionsList}
                style={{ ...(styles?.form ?? {}) }}
            >
                <div
                    className={classes?.inputWrapper ?? 'autocomplete-input-wrapper'}
                    style={{ ...(styles?.inputWrapper ?? {}) }}
                >
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder={placeholder}
                        onClick={displayOptionsList}
                        onKeyUp={handleOnAutocomplete}
                        className={classes?.input ?? ''}
                        style={{ ...(styles?.input ?? {}) }}
                    />
                </div>
                <hr
                    className={classes?.divider ?? 'autocomplete-divider'}
                    style={{ ...(styles?.divider ?? {}) }}
                    role="none"
                />
                <button
                    tabIndex={0}
                    type="button"
                    onClick={handleOnSearchClick}
                    style={{ ...(styles?.button ?? {}) }}
                    className={classes?.button ?? 'autocomplete-button'}
                >
                    <svg>
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                </button>
            </form>
            <div
                style={{ ...(styles?.listWrapper ?? {}) }}
                className={`${classes?.listWrapper ?? 'autocomplete-list-wrapper'} ${isActive ? 'active' : ''}`}
            >
                <ul
                    style={{ ...(styles?.options ?? {}) }}
                    className={classes?.options ?? 'autocomplete-options'}
                    role="presentation"
                >
                    {(options.length > 0 ? options : [{ ...DEFAULT_OPTION, display_name: noOptionName }]).map(
                        (option) => (
                            <li
                                role="menuitem"
                                key={option.osm_id}
                                onClick={() => handleOnSelectOption(option)}
                                onKeyDown={() => handleOnSelectOption(option)}
                                className={option.osm_id === selectedOption?.osm_id ? 'selected' : ''}
                            >
                                {option.display_name}
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}
