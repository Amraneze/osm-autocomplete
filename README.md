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
### With default button
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

>Note: Here is a [sandbox](https://codesandbox.io/s/amraneze-react-instagram-login-gggjr) to play around.

## onSuccess callback

### Displaying OAuth using a popup
> Note: The redirectUri needs to be the same url as the current url.

### Displaying OAuth using a redirection

If you want to use redirection you should change the prop `useRedirect` to true.
Callback will return a code for use on your server to get a full access_token.
If `implicitAuth` is set to `true` it will return the full access_token directly.

## onFailure callback

Callback will return an error object.

|   property name   | value  |
| :---------------: | :----: |
|       error       | string |
|   error_reason    | string |
| error_description | string |

## Parameters

|    params    |  value   |    default value     |
| :----------: | :------: | :------------------: |
|   clientId   |  string  |       REQUIRED       |
|    scope     |  string  |     user_profile     |
|  onSuccess   | function |       REQUIRED       |
|  onFailure   | function |       REQUIRED       |
| redirectUri  |  string  |          -           |
|  buttonText  |  string  | Login with Instagram |
|   cssClass   |  string  |          -           |
|     tag      |  string  |        button        |
|     type     |  string  |        button        |
| implicitAuth | boolean  |        false         |
| useRedirect  | boolean  |        false         |
|    width     |  number  |         400          |
|    height    |  number  |         800          |

Instagram API Docs: https://www.instagram.com/developer/

You can now also pass child components such as icons into the button component.

```js
<InstagramLogin
  clientId="CLIENT_ID"
  onSuccess={responseInstagram}
  onFailure={responseInstagram}
>
  <FontAwesome name="instagram" />
  <span> Login with Instagram</span>
</InstagramLogin>
```

## Running the project
### Locally
Before you will run the example to test lively the component, you should run these following commands:

On the root directory
```
yarn link
```

On the `example` directory
```
yarn link osm-autocomplete
```

And don't forget to build the project with:
```
yarn rollup
```

or if you want to keep watching the changes on the file

```
yarn rollup:watch
```

>Note: If you don't build the project, you will get the error `Can't resolve osm-autocomplete`

## Production Bundle

```
yarn build
```

#### TODO

- [ ] Add tests
- [ ] Improve Readme
- [ ] Add templates for PR and Issues


### Follow me on Twitter: [@Amraneze](https://twitter.com/amraneze)