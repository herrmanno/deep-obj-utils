import { RawPattern } from "./RawPattern"
import get from "./get"
import { RawPath } from "./RawPath"
import expand from "./expand"
import Path from "./Path"

/**
 * Encapsulates the {@link get} and {@link expand} function in an object oriented manner
 * @private
 */
export default class Pattern {
  readonly pattern: RawPattern

  constructor(pattern: RawPattern) {
    this.pattern = pattern
  }

  get(object: object | any[]): any[] {
    return this.expand(object).map(Path.prototype.get)
  }

  expand(object: object | any[]): Path[] {
    return expand(this.pattern, object).map(p => new Path(p))
  }

  expandRaw(object: object | any[]): RawPath[] {
    return expand(this.pattern, object)
  }
}
