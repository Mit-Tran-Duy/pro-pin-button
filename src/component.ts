/**
 * @module Component
 */
import { Component, Template } from "@scalable.software/component";
import { type Configuration } from "@scalable.software/component";
import { Tag, CSS, Attributes } from "./component.meta.js";

export const configuration: Configuration = {
  url: import.meta.url,
  template: { id: Tag },
  css: { name: CSS }
} as const;

export class component extends Component {
  public static get Tag() { return Tag; }
  public static get Attributes(): Attributes { return Attributes; }
  public static Template = new Template(import.meta.url);

  protected elements: {} = {};

  constructor() {
    super(configuration);
  }

  protected _attributeHandlers = {};

  // Your custom property getter/setter
  get pinned() {
    return this.hasAttribute('pinned');
  }

  set pinned(val) {
    if (val) {
      this.setAttribute('pinned', '');
      this.dispatchEvent(new CustomEvent('pin-changed', { detail: { isPinned: true } }));
    } else {
      this.removeAttribute('pinned');
      this.dispatchEvent(new CustomEvent('pin-changed', { detail: { isPinned: false } }));
    }
  }

  // Your toggle logic
  togglePin = () => {
    this.pinned = !this.pinned;
  };

  protected _cache = () => {};
  protected _initialize = () => {};

  // The framework's way of listening for clicks
  protected _addEventListeners = () => {
    this.addEventListener('click', this.togglePin);
  };

  // The framework's way of cleaning up listeners
  protected _removeEventListeners = () => {
    this.removeEventListener('click', this.togglePin);
  };
}