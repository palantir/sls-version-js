/**
 * @license Copyright 2018 Palantir Technologies, Inc. All rights reserved.
 */

export function compareNullable<T>(a: T | undefined, b: T | undefined, compute: (t: T | undefined) => T): -1 | 0 | 1 {
    if (a === b) {
        return 0;
    }
    return compute(a) > compute(b) ? 1 : -1;
}
