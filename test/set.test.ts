import test from "ava"
import set from "../src/set"

test("Should set value in object", t => {
  const object = { foo: { bar: "bar" } }
  const expected = { foo: { bar: "baz" } }
  const result = set(["foo", "bar"], object, "baz")
  t.deepEqual(expected, result)
})

test("Should set value in array", t => {
  const object = [[null, "bar"]]
  const expected = [[null, "baz"]]
  const result = set([0, 1], object, "baz")
  t.deepEqual(expected, result)
})

test("Should create object if needed", t => {
  const object = {}
  const expected = { foo: { bar: "baz" } }
  const result = set(["foo", "bar"], object, "baz")
  t.deepEqual(expected, result)
})

test("Should create array if needed", t => {
  const object: any[] = []
  const expected = [[, "baz"]]
  const result = set([0, 1], object, "baz")
  t.deepEqual(expected, result)
})
