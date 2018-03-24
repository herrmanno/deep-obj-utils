import test from "ava"
import get from "../src/get"

test("Should get value from object", t => {
  const object = { foo: { bar: "baz" } }
  const expected = "baz"
  const result = get(["foo", "bar"], object)
  t.deepEqual(expected, result)
})

test("Should get value from array", t => {
  const object = [[null, "baz"]]
  const expected = "baz"
  const result = get([0, 1], object)
  t.deepEqual(expected, result)
})

test("Should get first falsy value on path", t => {
  const object = { null: null, undefined: undefined }
  {
    const expected = null
    const result = get(["null", "bar"], object)
    t.deepEqual(expected, result)
  }
  {
    const expected = undefined
    const result = get(["undefined", "bar"], object)
    t.deepEqual(expected, result)
  }
})
