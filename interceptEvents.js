/**
 * Sets up interception for all PubSub events with logging and table display.
 * @param {Object} [styles] - Optional styles for customizing the console output.
 */
function interceptEvents(customStyles = {}) {
  // Default styles for logging
  const styles = {
    label:
      "color: white; background: red; padding: 5px; border: 1px solid red;",
    type: "color: green; padding: 5px; border: 1px solid red; border-left: 0;",
    ...customStyles,
  };

  /**
   * Logs an event with custom styles and displays the event data in a table.
   * @param {string} type - The type of the event.
   * @param {Object} data - The data associated with the event.
   */
  function logEvent(type, data) {
    // Log the event with styles
    console.log(`%cNEW EVENT:%c${type}`, styles.label, styles.type);

    // Display the event data in a table
    console.table(data);
  }

  // Subscribe to all events with the logging function
  PubSub.subscribe("*", logEvent);
}

// Start intercepting Events
interceptEvents();
