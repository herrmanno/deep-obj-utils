import { RawPath } from "./RawPath"
import get from "./get"

/**
 * Encapsulates the {@link get} function in an object oriented manner
 * @private
 * @hidden
 */
export default class Path {
  readonly path: RawPath

  constructor(path: RawPath) {
    this.path = path
  }

  get(object: object | any[]): any {
    return get(this.path, object)
  }
}
