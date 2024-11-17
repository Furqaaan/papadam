
# Papadam

```papadam``` is a lightweight JavaScript library that provides reactivity and data-binding for DOM elements. It allows you to create reactive state objects that automatically update the DOM when the state changes, making it easy to implement dynamic and interactive UIs.

## Features

-   **Reactive State**: Automatically updates the DOM when the state changes.
-   **DOM Binding**: Bind data to DOM elements using `@data` attributes.
-   **Event Handling**: Handle events with `@event` attributes (like `@click`, `@input`).
-   **No Build Tools Required**: Works directly in the browser with vanilla JavaScript.
-   **Minimalistic Design**: The entire library is just **1.5 KB**, making it an extremely efficient choice for performance-conscious applications.

## Data Binding with @data

- The `@data` attribute is used to bind a DOM element to a property in the reactive state managed by `usePapadam`. Any change in state would update the DOM element.

### Example:

```html
<span @data="count"></span>

<script>
    const state = Papadam.usePapadam({
        count: 0
    });

    state.count = 100 // This would update the <span>
</script>
```

## Event Handlers Support

- `@click`
- `@mouseenter`
- `@mouseleave`
- `@input`
- `@keydown`
- `@change`
- `@focus`
- `@blur`

**Note**: ```papadam``` supports all JavaScript events, so you can use any event name with the `@` prefix (e.g., `@submit`, `@keyup`, `@resize`, etc.).


## Installation

You can use `papadam` in your project in multiple ways.

### 1. **Via CDN (Content Delivery Network)**

To use ```papadam``` directly from a CDN, include the following `<script>`.

```html
<script src="https://cdn.jsdelivr.net/npm/papadam/dist/index.min.js"></script>
```
Then, in your JavaScript file:

```javascript
const state = Papadam.usePapadam({
    count: 0
});
```

### 2. **Via ```import``` (ES Modules)**
First, install the package:

```javascript
npm install papadam
```

Then, in your JavaScript file:

```javascript
import { usePapadam } from 'papadam';
```

## Basic Usage

### HTML Structure

To use ```papadam```, you need to set up your HTML with special data-binding attributes.

#### Example HTML

```html
<span @data="count"></span>
<button @click="count++">Increment Count</button>
```

### JavaScript

You initialize a reactive state using `usePapadam()`. The state object can contain any properties you want to be bound to the DOM.

#### Example JavaScript

```javascript
// Initialize the reactive state with some default values.
const state = usePapadam({
    message: "Welcome to Papadam!",
    count: 0, // Initial count value
});

// Dynamically change state after 3 seconds
setTimeout(() => {
    state.message = "State updated after 3 seconds!";
}, 3000);
```

### How It Works

1. **Reactive State**: The `usePapadam` function creates a reactive proxy for the provided state. The state can contain any properties, and whenever those properties change, the DOM will automatically update.
2. **Data Binding**: Elements with the `@data` attribute will evaluate the expression inside the attribute and display the result in the element’s inner HTML. In the example above, the `<h1>` element binds the `count` property to display the current count.

3. **Event Binding**: You can bind events like `@click` or `@input` to HTML elements. When the event is triggered, the corresponding JavaScript expression in the attribute will be executed. In the example above, clicking the `<button>` increments the `count`.

4. **No Framework Overhead**: This library provides the basic functionality of a reactive framework, without requiring any build tools or heavy dependencies.

## Advanced Usage

You can bind more complex expressions or use JavaScript functions in your event handlers.

#### Example

```html
<input
    type="text"
    @input="message = event.target.value"
    placeholder="Type a message"
/>
<span @data="message"></span>
```

In this case, when the input field is updated, the `message` property is updated, which automatically triggers the DOM to reflect the new message.

## Build

```javascript
npm run build
```

## Contributing

If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. You can also report bugs or suggest new features by opening an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Furqaaan/papadam/blob/master/LICENSE) file for details.

## Changelog

You can find the detailed changelog of this project in the [CHANGELOG.md](https://github.com/Furqaaan/papadam/blob/master/CHANGELOG.md) file.

### Additional Notes

-   This library is designed to be simple and minimalistic. It does not include routing, templating, or other advanced features found in larger frameworks.
-   It is intended for small to medium-sized projects or for those who want to add reactivity to a project without introducing a full-fledged framework.
