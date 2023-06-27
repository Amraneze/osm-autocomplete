[![npm version](https://badge.fury.io/js/%40amraneze%2Fosm-autocomplete.svg)](https://badge.fury.io/js/%40amraneze%2Fosm-autocomplete)

# React Autocomplete using OpenStreetMap

> A React component to search for addresses using [OpenStreetMap](https://www.openstreetmap.org/)

## Install

```
npm install @amraneze/osm-autocomplete
```

```
yarn add @amraneze/osm-autocomplete
```

## How to use
```js
import ReactDOM from 'react-dom';
import { OpeenStreetMap, OpenStreetMapAutocomplete } from '@amraneze/osm-autocomplete';

const responseInstagram = (response) => {
  console.log(response);
};

ReactDOM.render(
  <OpenStreetMapAutocomplete value={null} onChange={handleOnOptionSelected} />,
  document.getElementById("root")
);
```

>Note: Here is a [sandbox](https://codesandbox.io/s/osm-autocomplete-yt5mn8) to play around.

## Parameters

|       params      |                     value                     |             default value             |
| :---------------: | :-------------------------------------------: | :-----------------------------------: |
| value             | OpeenStreetMap                                | REQUIRED                              |
| onChange          | function                                      | REQUIRED                              |
| debounce          | string                                        | 500                                   |
| placeholder       | string                                        | 'Search'                              |
| noOptionName      | string                                        | 'No locations found'                  |
| openStreetMapUrl  | string                                        | 'https://nominatim.openstreetmap.org' |
| classes           | OpenStreetMapAutocompleteStyle<string>        | -                                     |
| styles            | OpenStreetMapAutocompleteStyle<CSSProperties> | -                                     |

Where `OpeenStreetMap` is 
````typescript
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
````

and

````typescript
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
````

```typescript
<OpenStreetMapAutocomplete value={value} onChange={handleOnOptionSelected} />
```

## Running the project
### Locally
Before you will run the example to test lively the component, you should run these following commands:

On the root directory
```
yarn link
```
or
```
npm link
```

On the `example` directory
```
yarn link osm-autocomplete
```
or
```
npm link osm-autocomplete
```

And don't forget to build the project with:
```
yarn build
```
or
```
npm build
```

or if you want to keep watching the changes on the file

```
yarn build:watch
```
or
```
npm build:watch
```

>Note: If you don't build the project, you will get the error `Can't resolve osm-autocomplete`

## Production Bundle
```
yarn build
```
or
```
npm build
```


#### TODO

- [ ] Add tests
- [ ] Add templates for PR and Issues

### Follow me on Twitter: [@Amraneze](https://twitter.com/amraneze)