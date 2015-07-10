react-inline-svg
================

React Component to load and inline SVG images, allowing you to target and style SVGs using CSS.


Features
--------
- Easy to use, just add `InlineSVG` components
- Loads SVGs automatically using a jQuery `$.ajax` request
- Loads each SVG exactly once, and caches them for repeated use
- Can preload SVGs in advance using `SVGCache`


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
SVGCache.instance.load("/path/to/your.svg");
```
