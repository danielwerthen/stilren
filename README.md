# What is stilren?

Stilren augments React to make CSS attributes top level props to **every** element, with support for both media queries and pseudo selectors.

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

"How can I modify the styling of a specific element in my application?"

In any React application of a non-trivial size, styling can be a complicated business. Perhaps a UI element library is used, perhaps several. These element libraries may or may not expose a way of modifying the styling of the components. The application itself might have a defined way to declare styling in components. This approach may or may not match the element library. The problem? Well, navigating around the code base, the developer might want to import a component and use it in some way, and also modify some css. How can this be achieved? There are a range of possibilities here:

- The component accepts css modification via the `style` prop
- The component allows css modifications via a custom syntax
- The component allows css modifications via the `className` prop
- The component does not accept any css modifications
- The component styling can be modified via css modifications on a parent element
- CSS specificity might complicate matters even further

To make matters worse, not all components are created equal. Different components have different configurations of the above, and they will most often be different from the standard html elements. Navigating around the code base, answering the question of how a css attribute can be added to a jsx element of some kind is often a considerable burden.

Stilren tries to solve this problem by augmenting the React function `createElement` (and the `jsx` function). This approach is subtly different from using the jsx pragma. By aliasing `react` itself, the augmented version will be used for all components, even third party components, which ensures that the stilren api is everpresent on all jsx elements. The sole exception are components which do not spread the rest of the props into a html element.

The result is that you'll be able to use the `$cssAttribute="value"` syntax on close to all jsx elements, native or custom, first or third party.

## Considerations

_Why use top level props instead of a `css={{ cssAttribute: value }}` syntax?_

This is a matter of taste, but the top level props approach makes it a little bit easier to create nested components that work the way you'd expect. You can simply spread all rest props onto elements, without having to consider merging any other objects.

_Why use media prefixes and pseudo suffixes?_

Again, a matter of taste. There seems to be three contending approaches.

1. `css={{ '@media (min-width: 1024px)': { color: 'red' }}`

Stilren prefers to colocate the media and pseudo variations with each single css attribute, rather than grouping all variants of each kind together. Again, avoiding the object values makes nesting easier and avoids merging deep prop structures.

2. `$color={["red", "blue", "yellow"]}`

The stilren approach is more verbose, but it is also more declarative.

3. `$color={{ small: "red", medium: "blue", large: "yellow" }}`

This approach means that you always have to consider all variations of single attribute. It is not as easy to override a single media query or pseudo selector.

_Performance_

Disclaimer: This is very much an experimental library. Do not use it if you uncomfortable with some risk for unexpected performance bottlenecks or weird bugs.

Stilren introduces additional work for each `createElement` call. On `<div className="foobar">Foo</div>`, there will be some overhead, even though there is no styling usage. This is due to stilren having to iterate through the props an extra time and check if a prop starts with the `$` prefix or not. How big is this overhead? Frankly, I haven't had time to figure this out just yet, my guess is that it _should_ not be enough of a bottleneck to cause problems. If there is a particular hotspot, you might be able to solve the problem by using `React.memo` or `React.useMemo` to avoid having to recreate the elements as often.

On elements that do use the styling props, there is overhead in creating the css class for each key-value pair before completing the call, this overhead is cached though, so for every subsequent call with the same key value pair the overhead will be much smaller.

_Which version of React is this using?_

So a drawback in aliasing React with this approach is that Stilren need to use a fixed version of React as a dependency. That means that any application using Stilren might run in problems if it needs a specific version of React that is different from the one that Stilren is using. At the moment Stilren will try always support the very latest version of React.
