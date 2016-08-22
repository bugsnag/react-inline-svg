react-inline-svg
================

React Component to load and inline SVG images, allowing you to target and style SVGs using CSS.


Features
--------
- Easy to use, just add `InlineSVG` components
- Loads SVGs automatically using a `XMLHttpRequest`
- Loads each SVG exactly once, and caches them for repeated use
- Can preload SVGs in advance using `InlineSVG.cache`


Usage
-----

Include the component:
```html
<script src="/scripts/react-inline-svg.js"></script>
```

Render an inline SVG:

```xml
<InlineSVG src="/path/to/your.svg" className="css-class" />
```


Pre-loading SVGs
----------------

```javascript
InlineSVG.cache.load("/path/to/your.svg");
```


Building from Source
--------------------

The compiled/ready-to-use version of react-inline-svg can always be found at `dist/react-inline-svg.js`. To re-build this after making changes in `src`, simply run:

```
$ gulp
```
