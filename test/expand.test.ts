import test from "ava"
import expand from "../src/expand"
import { Pattern } from "../src/Pattern"

test("does expand a simple path on object correct", t => {
  const pattern: Pattern = ["foo", "*"]
  const object = {
    foo: {
      bar: "bar",
      baz: "baz"
    }
  }
  const expected = [["foo", "bar"], ["foo", "baz"]]
  const result = expand(pattern, object)
  t.deepEqual(result, expected)
})

test("does expand a simple path on array correct", t => {
  const pattern: Pattern = ["foo", "*"]
  const object = {
    foo: ["bar", "baz"]
  }
  const expected = [["foo", 0], ["foo", 1]]
  const result = expand(pattern, object)
  t.deepEqual(result, expected)
})

test("does expand a simple path on object and array correct", t => {
  const pattern: Pattern = ["*", "*"]
  const object = { foo: ["bar", "baz"], bar: { bar: "bar", baz: "baz" } }
  const expected = [["foo", 0], ["foo", 1], ["bar", "bar"], ["bar", "baz"]]
  const result = expand(pattern, object)
  t.deepEqual(result, expected)
})

test("does expand a complex path on object and array correct", t => {
  const pattern: Pattern = ["*", "*", "foo", "*"]
  const object = {
    foo: [{ foo: { foo1: "" }, bad: [], also: "bad" }],
    bar: { any: { foo: { foo2: "" }, bad: [], also: "bad" } }
  }
  const expected = [["foo", 0, "foo", "foo1"], ["bar", "any", "foo", "foo2"]]
  const result = expand(pattern, object)
  t.deepEqual(result, expected)
})

test("Should expand a path w/ '**' on object and array correct", t => {
  const pattern: Pattern = ["**", "foo", "*"]
  const object = {
    foo: [{ foo: { foo1: "" }, bad: [], also: "bad" }],
    bar: { any: { foo: { foo2: "" }, bad: [], also: "bad" } }
  }
  const expected = [["foo", 0, "foo", "foo1"], ["bar", "any", "foo", "foo2"]]
  const result = expand(pattern, object)
  t.deepEqual(result, expected)
})

test("Should expand a path w/ '**' and following nont-matching concrete segment correct", t => {
  const pattern: Pattern = ["**", "bar", "*"]
  const object = {
    foo: [{ foo: { foo1: "" }, bad: [], also: "bad" }],
    bar: { any: { foo: { foo2: "" }, bad: [], also: "bad" } }
  }
  const expected = new Array<any>()
  const result = expand(pattern, object)
  t.deepEqual(result, expected)
})

test("does expand a path w/ regexp on object and array correct", t => {
  const pattern: Pattern = [/bar/, "*"]
  const object = { foo: ["bar", "baz"], bar: { bar: "bar", baz: "baz" } }
  const expected = [["bar", "bar"], ["bar", "baz"]]
  const result = expand(pattern, object)
  t.deepEqual(result, expected)
})

test("does return nothing on empty object", t => {
  const pattern: Pattern = ["*", "*"]
  const object = {}
  const expected = new Array<any>()
  const result = expand(pattern, object)
  t.deepEqual(result, expected)
})

test("does return nothing on empty array", t => {
  const pattern: Pattern = ["*", "*"]
  const object = new Array<any>()
  const expected = new Array<any>()
  const result = expand(pattern, object)
  t.deepEqual(result, expected)
})

test("does return nothing on primitive value array", t => {
  const pattern: Pattern = ["*", "*"]

  let object: any = 1
  let expected = new Array<any>()
  let result = expand(pattern, object)
  t.deepEqual(result, expected)

  object = "s"
  expected = new Array<any>()
  result = expand(pattern, object)
  t.deepEqual(result, expected)

  object = true
  expected = new Array<any>()
  result = expand(pattern, object)
  t.deepEqual(result, expected)

  object = null
  expected = new Array<any>()
  result = expand(pattern, object)
  t.deepEqual(result, expected)
})
