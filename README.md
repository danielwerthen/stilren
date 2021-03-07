# What is stilren?

Stilren augments react to enable a richer experience for working with css-in-js. A common trends in various approaches to css-in-js is to include a more or less complicated setup process as well as a more or less unique syntax for adding styles to jsx elements. Stilren tries to do away with both of these. A simple setup process together with a simple styling api.

It uses the great library [styletron](https://github.com/styletron/styletron) under the hood.

## Setup

Stilren works by augmenting the react library itself. Installing it by aliasing the react module.

```bash
yarn add react@npm:stilren @types/react@npm:stilren-types
```

That second part is optional, though recommended, to enable typescript support.

## Usage

Having setup the stilren augmentation you can now use the stilren api. Stilren adds new styling props to the basic html tags themselves. So a `<div />` does not only have a `style` prop for setting styles, not it also have a `$color` prop, and a `$backgroundColor` prop, and a `$fontSize` prop. In fact, any valid css attribute is now exposed as a top level prop on all html tags, prefixed by a `$`.

There is more, a configurable set of media queries can also prefix all of the css props. `$smallColor="red"` Would set the color to red on screens with a max width of `425px`. These can be combined like `$smallPortraitColor="red"`, meaning max width `425px` AND orientation equal to `portrait`.

```js
export const defaultMediaPrefixes = {
  small: '(max-width: 425px)',
  medium: '(min-width: 426px) and (max-width: 1024px)',
  large: '(min-width: 1025px)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
};
```

Pseudo selectors is also available as suffixes. `colorHover="blue"` Would set the color of blue if the element is hovered. The pseudo suffixes can be combined with media prefixes. `smallColorHover="yellow"` Would set color to yellow on screens with a max width of `425px` AND if the element is hovered. The enabled pseudo suffixes can also be configured if something is missing.

```js
export const defaultPseudoSuffixes = {
  Active: 'active',
  Checked: 'checked',
  Default: 'default',
  Disabled: 'disabled',
  Empty: 'empty',
  Enabled: 'enabled',
  First: 'first',
  FirstChild: 'first-child',
  FirstOfType: 'first-of-type',
  Fullscreen: 'fullscreen',
  Focus: 'focus',
  Hover: 'hover',
  Indeterminate: 'indeterminate',
  InRange: 'in-range',
  Invalid: 'invalid',
  LastChild: 'last-child',
  LastOfType: 'last-of-type',
  Link: 'link',
  OnlyChild: 'only-child',
  OnlyOfType: 'only-of-type',
  Optional: 'optional',
  OutOfRange: 'out-of-range',
  ReadOnly: 'read-only',
  ReadWrite: 'read-write',
  Required: 'required',
  Scope: 'scope',
  Target: 'target',
  Valid: 'valid',
  Visited: 'visited',
  Before: ':before',
  After: ':after',
};
```

## Motivation

In any React application of a non-trivial size, styling can be a complicated business. Perhaps a UI element library is used, perhaps several. These element libraries may or may not expose a way of modifying the styling of the components. The application itself might have a defined way to declare styling in components. This approach may or may not match the element library. The problem? Well, navigating around the code base, the developer might want to import a component and use it in some way, and also modify some css. How can this be achieved? There are a range of possibilities here:

- The component accepts css modification via the `style` prop
- The component allows css modifications via a custom syntax
- The component allows css modifications via the `classname` prop
- The component does not accept any css modifications
- The component styling can be modified via css modifications on a parent element
- CSS specificity might complicate matters even further

To make matters worse, not all components are created equal. Different components have different configurations of the above, and they will most often be different from the standard html elements. Navigating around the code base, answering the question of how a css attribute can be added to a jsx element is often a considerable developer burden.
