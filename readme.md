# deep-obj-utils

deep-obj-utils is an utility library for modifieng (e. g. cloning) immutable objects while changing nested properties.

## Installation

```shell
npm i deep-obj-utils
```

## Examples

```javascript
import { get, set, update } from "deep-obj-utils"

// retrieving nested values

const object = { foo: { bar: "baz" } }
get(["foo", "bar"], object) // "baz"

const object = [[null, "baz"]]
get([0, 1], object) // "baz"


// creating objects with changed nested properties

const object = { foo: { bar: "bar" } }
set(["foo", "bar"], object, "baz") // { foo: { bar: "baz" } }

const object = { foo: { bar: "bar" } }
update(["foo", "bar"], object, v => v.toUpperCase()) // { foo: { bar: "BAR" } }


// auto vivication

const object = {}
set(["foo", 0, "baz"], object, "baz") // { foo: ["baz", { bar: "BAR" }] }
```

## Api

The documentation can be found at [herrmanno.github.io/deep-obj-utils/api/](https://herrmanno.github.io/deep-obj-utils/api/).

This project is licensed under the [ISC license](LICENSE).
