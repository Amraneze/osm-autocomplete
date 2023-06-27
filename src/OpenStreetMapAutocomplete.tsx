import { useState, useEffect, KeyboardEvent, useRef } from 'react';

import './index.scss';
import { useDebounce } from '@hooks';

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

export const OpenStreetMapAutocomplete = ({
  value,
  onChange,
  debounce = 500,
  placeholder = 'Search',
  noOptionName = 'No locations found',
  openStreetMapUrl = 'https://nominatim.openstreetmap.org'
}: Props) => {
  const [isActive, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce<string>(inputValue, debounce);
  const [options, setOptions] = useState<OpeenStreetMap[]>([]);
  const [selectedOption, setSelectedOption] = useState<OpeenStreetMap | null>(
    null
  );
  
  useEffect(() => {
    if (value) {
      if (inputRef.current) {
        setSelectedOption(value);
        setInputValue(value.display_name);
        inputRef.current.value = value.display_name;
      }
    }
  }, [value])

  useEffect(() => {
    if (debouncedValue) {
      displayOptionsList();
      getGeocoding(debouncedValue);
    }
  }, [debouncedValue]);

  const getGeocoding = (address = '') => {
    if (!address) return;
    const url = `${openStreetMapUrl}/search?format=json&q=${address}`;

    fetch(url)
      .then((response) => response.json())
      .then((data: OpeenStreetMap[]) =>
        setOptions(
          data.filter(
            (location, index, array) =>
              array.findIndex(
                (innerLocation) =>
                  innerLocation.display_name === location.display_name
              ) === index
          )
        )
      )
      .catch(() => setOptions([]));
  };

  const handleOnAutocomplete = (event: KeyboardEvent<HTMLInputElement>) => {
    setInputValue((event.target as HTMLInputElement).value);
  };

  const handleOnSearchClick = () => {
    if (inputRef.current) {
      displayOptionsList();
      setInputValue(inputRef.current.value);
    }
  };

  const displayOptionsList = () => {
    setActive(true);
  };

  const hideOptionsList = () => {
    setActive(false);
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
    <div className='autocomplete'>
      <form className='autocomplete-form' onBlur={hideOptionsList}>
        <div className='autocomplete-input-wrapper'>
          <input
            type='text'
            ref={inputRef}
            placeholder={placeholder}
            onClick={displayOptionsList}
            onKeyUp={handleOnAutocomplete}
          />
        </div>
        <hr className='autocomplete-divider' role='none' />
        <button
          tabIndex={0}
          type='button'
          onClick={handleOnSearchClick}
          className='autocomplete-button'
        >
          <svg>
            <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'></path>
          </svg>
        </button>
      </form>
      <div className={`autocomplete-list-wrapper ${isActive ? 'active' : ''}`}>
        <ul className='autocomplete-options' role='presentation'>
          {(options.length > 0
            ? options
            : [{ ...DEFAULT_OPTION, display_name: noOptionName }]
          ).map((option, index) => (
            <li
              key={`${option.osm_id}-${index}`}
              onClick={() => handleOnSelectOption(option)}
              className={
                option.osm_id === selectedOption?.osm_id ? 'selected' : ''
              }
            >
              {option.display_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};