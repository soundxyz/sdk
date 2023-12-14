export class PLazy<ValueType> extends Promise<ValueType> {
  private _promise?: Promise<ValueType>

  constructor(private _executor: (resolve: (value: ValueType) => void, reject: (err: unknown) => void) => void) {
    super((resolve: (v?: any) => void) => resolve())
  }

  then: Promise<ValueType>['then'] = (onFulfilled, onRejected) =>
    (this._promise ||= new Promise(this._executor)).then(onFulfilled, onRejected)

  catch: Promise<ValueType>['catch'] = (onRejected) => (this._promise ||= new Promise(this._executor)).catch(onRejected)

  finally: Promise<ValueType>['finally'] = (onFinally) =>
    (this._promise ||= new Promise(this._executor)).finally(onFinally)
}

export function LazyPromise<Value>(fn: () => Value | Promise<Value>): Promise<Value> {
  return new PLazy((resolve, reject) => {
    try {
      Promise.resolve(fn()).then(resolve, reject)
    } catch (err) {
      reject(err)
    }
  })
}
