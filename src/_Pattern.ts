import { Pattern } from "./Pattern"
import get from "./get"
import { Path } from "./Path"
import expand from "./expand"
import _Path from "./_Path"

/**
 * Encapsulates the {@link get} and {@link expand} function in an object oriented manner
 * @private
 * @hidden
 */
export default class _Pattern {
  readonly pattern: Pattern

  constructor(pattern: Pattern) {
    this.pattern = pattern
  }

  get(object: object | any[]): any[] {
    return this.expand(object).map(_Path.prototype.get)
  }

  expand(object: object | any[]): _Path[] {
    return expand(this.pattern, object).map(p => new _Path(p))
  }

  expandRaw(object: object | any[]): Path[] {
    return expand(this.pattern, object)
  }
}
