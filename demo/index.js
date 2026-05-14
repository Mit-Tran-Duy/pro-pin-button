import { component } from "pin-button";

// Wait for the HTML template to load
await component.Template.load("component.template.html");

// Register the custom element with the browser
customElements.define(component.Tag, component);