/**
 * A lightweight library that provides reactivity and data binding in the DOM.
 * The library supports basic event handling and data-binding expressions.
 *
 * @param {Object} data - The initial state object that will be bound to DOM elements.
 * @returns {Proxy} - A reactive proxy object representing the state.
 */
export function usePapadam(data = {}) {
    const root = document.querySelector("body");
    const state = createReactiveState(data);

    refreshDom();
    registerEventListeners();

    /**
     * Refreshes the DOM by evaluating expressions in elements with @data attributes
     * and updating their content.
     */
    function refreshDom() {
        try {
            // Traverse the DOM and process elements that have @data attribute.
            traverseDom(root, (element) => {
                if (element.hasAttribute("@data")) {
                    const expression = element.getAttribute("@data");
                    try {
                        // Evaluate the expression and update the element's content.
                        element.innerHTML = evaluateExpression(
                            expression,
                            state
                        );
                    } catch (err) {
                        console.error(
                            `Error processing @data binding: "${expression}"`,
                            err
                        );
                    }
                }
            });
        } catch (err) {
            console.error("Error refreshing DOM", err);
        }
    }

    /**
     * Registers event listeners for elements that have @event attributes (like @click).
     * These listeners execute JavaScript expressions that modify the reactive state.
     */
    function registerEventListeners() {
        try {
            // Traverse DOM elements and bind event listeners for @click, @input, etc.
            traverseDom(root, (element) => {
                Array.from(element.attributes).forEach((attribute) => {
                    if (
                        !attribute.name.startsWith("@") ||
                        attribute.name === "@data"
                    )
                        return;

                    // Get the event name (e.g., "click").
                    const event = attribute.name.slice(1);
                    const handler = attribute.value;

                    // Add event listener to the element.
                    element.addEventListener(event, () => {
                        try {
                            // Execute the handler expression and update state.
                            evaluateAndUpdateState(handler, state);
                        } catch (err) {
                            console.error(
                                `Error in @${event} handler: ${handler}`,
                                err
                            );
                        }
                    });
                });
            });
        } catch (err) {
            console.error("Error registering event listeners", err);
        }
    }

    /**
     * Recursively traverses the DOM and applies a callback to each element.
     *
     * @param {Element} element - The current DOM element.
     * @param {Function} callback - The callback function to execute on each element.
     */
    function traverseDom(element, callback) {
        callback(element); // Apply the callback to the current element.
        let child = element.firstElementChild;
        while (child) {
            traverseDom(child, callback); // Recursively traverse child elements.
            child = child.nextElementSibling;
        }
    }

    /**
     * Creates a reactive state object using a Proxy. The Proxy traps `get` and `set`
     * operations to trigger DOM updates when the state changes.
     *
     * @param {Object} object - The initial state object.
     * @returns {Proxy} - A Proxy that automatically triggers DOM updates on state changes.
     */
    function createReactiveState(object) {
        return new Proxy(object, {
            /**
             * Intercepts the `get` operation to access properties on the state object.
             *
             * @param {Object} target - The target object (state).
             * @param {string} key - The property key being accessed.
             * @returns {*} - The value of the property.
             */
            get(target, key) {
                return target[key];
            },

            /**
             * Intercepts the `set` operation to modify properties on the state object.
             * When a property is updated, it triggers a DOM refresh.
             *
             * @param {Object} target - The target object (state).
             * @param {string} key - The property key being set.
             * @param {*} value - The value to assign to the property.
             */
            set(target, key, value) {
                if (target[key] !== value) {
                    target[key] = value;
                    refreshDom();
                }
            },
        });
    }

    /**
     * Evaluates a JavaScript expression within the context of the reactive state.
     * This function allows dynamic binding of expressions to DOM elements.
     *
     * @param {string} expression - The JavaScript expression to evaluate.
     * @param {Object} context - The reactive state context.
     * @returns {*} - The result of the evaluated expression.
     * @throws {Error} - If the expression is invalid or cannot be evaluated.
     */
    function evaluateExpression(expression, context) {
        try {
            const keys = Object.keys(context);
            const values = Object.values(context);

            // Create a new function dynamically and bind the context
            const func = new Function(...keys, `return ${expression}`);
            return func(...values);
        } catch (err) {
            throw new Error(
                `Invalid expression: "${expression}". Error: ${err.message}`
            );
        }
    }

    /**
     * Evaluates a JavaScript expression in the context of the provided state (object)
     * and updates the state based on that evaluation.
     *
     * @param {string} expression - The JavaScript expression to evaluate as a string.
     * @param {Object} context - The state object that serves as the context for the evaluation.
     * @throws {Error} If the expression is invalid or if there's an error during evaluation.
     */
    function evaluateAndUpdateState(expression, context) {
        try {
            // Extract the keys and values from the context (state)
            const keys = Object.keys(context);
            const values = Object.values(context);

            // Create a new function from the expression
            const func = new Function(...keys, `with(this) { ${expression} }`);

            // Execute the function in the context of the state
            func.apply(context, values);
        } catch (err) {
            throw new Error(
                `Error in evaluating and updating state: "${expression}". Error: ${err.message}`
            );
        }
    }

    return state;
}

(function(global) {
    // Define the usePapadam function
    function usePapadam(data = {}) {
        // Your existing usePapadam implementation
    }

    // Check if we're in a module environment or global context
    if (typeof module !== 'undefined' && module.exports) {
        // For CommonJS (Node.js) or ES Modules
        module.exports = usePapadam;
    } else if (typeof define === 'function' && define.amd) {
        // For AMD (Asynchronous Module Definition)
        define(() => usePapadam);
    } else {
        // For browsers, attach to the global window object
        global.usePapadam = usePapadam;
    }

})(typeof window !== 'undefined' ? window : global);