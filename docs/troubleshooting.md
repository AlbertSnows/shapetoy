
# Troubleshooting

## JS doesn't show up for scripts labeled module

has something to do with CQRS thing maybe? Make sure files end in .js when
you import them (I think). Same goes for imported files in the html, or
from URLs.

## "module" was a bare specifier or disallowed mime type

make sure when you import a JS file it ends in '.js'

## defining objects with constant keys

```js
const X = "x";
const obj = {
	[X]: "bar" // this works
	X: "foo", // this doesnt
};
console.log(obj[X]);
```