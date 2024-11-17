# Papadam.js

**Papadam.js** is a lightweight JavaScript library that provides reactivity and data-binding for DOM elements. It allows you to create reactive state objects that automatically update the DOM when the state changes, making it easy to implement dynamic and interactive UIs.

## Features

-   **Reactive State**: Automatically updates the DOM when the state changes.
-   **DOM Binding**: Bind data to DOM elements using `@data` attributes.
-   **Event Handling**: Handle events with `@event` attributes (like `@click`, `@input`).
-   **No Build Tools Required**: Works directly in the browser with vanilla JavaScript.
- **Minimalistic Design**: The entire library is just **6 KB**, making it an extremely efficient choice for performance-conscious applications.

## Installation

You can directly include `papadam.js` in your HTML file or download the library to use it.


### Via Download

1. Download `papadam.js` from the [repository](https://github.com/furqaaan/papadam.js).
2. Include it in your project.

```html
<script src="path/to/papadam.js"></script>
```

## Basic Usage

### HTML Structure

To use papadam.js`, you need to set up your HTML with special data-binding attributes.

#### Example HTML

```html
<h1 @data="`Current count is: ${count}`"></h1>
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
<h1 @data="message"></h1>
```

In this case, when the input field is updated, the `message` property is updated, which automatically triggers the DOM to reflect the new message.

## Contributing

If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. You can also report bugs or suggest new features by opening an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Furqaaan/papadam/blob/master/LICENSE) file for details.

---

### Additional Notes

-   This library is designed to be simple and minimalistic. It does not include routing, templating, or other advanced features found in larger frameworks.
-   It is intended for small to medium-sized projects or for those who want to add reactivity to a project without introducing a full-fledged framework.

---
