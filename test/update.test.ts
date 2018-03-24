import test from "ava"
import update from "../src/update"

test("Should update value in object", t => {
  const object = { foo: { bar: "bar" } }
  const expected = { foo: { bar: "BAR" } }
  const result = update(["foo", "bar"], object, (v: string) => v.toUpperCase())
  t.deepEqual(expected, result)
})

test("Should update value in array", t => {
  const object = [[null, "bar"]]
  const expected = [[null, "BAR"]]
  const result = update([0, 1], object, (v: string) => v.toUpperCase())
  t.deepEqual(expected, result)
})

test("Should create object if needed", t => {
  const object = {}
  const expected = { foo: { bar: "baz" } }
  const result = update(["foo", "bar"], object, () => "baz")
  t.deepEqual(expected, result)
})

test("Should create array if needed", t => {
  const object: any[] = []
  const expected = [[, "baz"]]
  const result = update([0, 1], object, () => "baz")
  t.deepEqual(expected, result)
})
