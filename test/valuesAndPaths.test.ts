import test from "ava"
import valuesAndPaths from "../src/valuesAndPaths"

test("does retrieve all values from object", t => {
    const object = {
        foo: "foo",
        bar: "foo",
    }
    const expected = [{ path: ["foo"], value: "foo" }, { path: ["bar"], value: "foo" }]
    const result = valuesAndPaths(object)
    t.deepEqual(expected, result)
})

test("does retrieve all values from array", t => {
  const object = ["foo", "bar"]
  const expected = [
    { path: [0], value: "foo" },
    { path: [1], value: "bar" }
  ]
  const result = valuesAndPaths(object)
  t.deepEqual(expected, result)
})

test("does retrieve all values from object / array", t => {
  const object = {
      obj: {
          o1: true,
          o2: false,
      },
      arr: [
          "foo",
          "bar"
      ]
  }
  const expected = [{ path: ["obj", "o1"], value: true }, { path: ["obj", "o2"], value: false }, { path: ["arr", 0], value: "foo" }, { path: ["arr", 1], value: "bar" }]
  const result = valuesAndPaths(object)
  t.deepEqual(expected, result)
})