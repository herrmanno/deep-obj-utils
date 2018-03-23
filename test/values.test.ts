import test from "ava"
import values from "../src/values"

test("does retrieve all values from object", t => {
    const object = {
        foo: "foo",
        bar: "foo",
    }
    const expected = ["foo", "foo"]
    const result = values(object)
    t.deepEqual(expected, result)
})

test("does retrieve all values from array", t => {
  const object = ["foo", "bar"]
  const expected = [
    "foo",
    "bar"
  ]
  const result = values(object)
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
  const expected = [true, false, "foo", "bar"]
  const result = values(object)
  t.deepEqual(expected, result)
})