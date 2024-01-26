# react-2-web

Welcome to `react-2-web` – a library designed to seamlessly transform React components into Web Components. This project enables you to expose your existing React components as Web Components, making them easily consumable in any environment, including frameworks like Angular, Vue, and even in plain static HTML web pages.

## Features

- **React in Web Components**: Embed your React components inside Web Components, combining the power of React with the wide compatibility of Web Components.
- **Framework Agnostic**: Use the transformed components in any JavaScript framework or even without any framework at all.
- **Easy Integration**: Seamlessly integrate with existing projects without heavy modifications.
- **Isolation and Encapsulation**: Leverage the Shadow DOM's style and behavior encapsulation to keep your components isolated and consistent across different environments.

## Installation

```bash
npm install react-2-web
```

or

```bash
yarn add react-2-web
```

## Usage

### Converting a React Component to a Web Component

1. **Import the library**:

   ```javascript
   import { convertComponent } from 'react-2-web';
   ```

2. **Convert your React Component**:

   ```javascript
   import { YourReactComponent } from 'your-react-components';
   convertComponent('your-custom-element', YourReactComponent);
   ```

3. **Use the Web Component in HTML**:

   ```html
   <your-custom-element
     some-prop="true"
     some-other-prop="false"
   >
     Hello World!
   </your-custom-element>
   ```

### Passing Props and Events

Props can be passed to the Web Component as attributes. For complex data structures or events, refer to our advanced usage documentation.

## Advanced Usage

For complex scenarios like passing JSX, handling events, or using slots, please refer to the [Advanced Usage](#advanced-usage) section in our documentation.

## Browser Support

`react-2-web` supports all modern browsers. For full compatibility details, please refer to our [Browser Support](#browser-support) documentation.

## Contributing

Contributions are welcome! If you have a feature request, bug report, or pull request, please open an issue or submit a PR on our [GitHub repository](#).

## License

`react-2-web` is MIT licensed. See [LICENSE](LICENSE.md) for details.
