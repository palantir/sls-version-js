/**
 * @license
 * Copyright 2018 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { compareToMatcher, isValidMatcher, matches } from "../public";

const m0 = "5.3.2";
const m1 = "5.3.x";
const m2 = "5.x.2";
const m3 = "x.3.2";
const m4 = "5.x.x";
const m5 = "x.x.2";
const m6 = "x.x.x";

const v0 = "5.0.0-rc0";
const v1 = "5.0.0";
const v2 = "5.3.2";
const v3 = "5.3.4";
const v4 = "5.4.2";
const v5 = "6.3.2";

describe("SLS Version matcher", () => {
    it("Validates matcher correctly", () => {
        expect(isValidMatcher(m0)).toBeTruthy();
        expect(isValidMatcher(m1)).toBeTruthy();
        expect(isValidMatcher(m2)).toBeFalsy();
        expect(isValidMatcher(m3)).toBeFalsy();
        expect(isValidMatcher(m4)).toBeTruthy();
        expect(isValidMatcher(m5)).toBeFalsy();
        expect(isValidMatcher(m6)).toBeTruthy();
    });

    it("Matches versions correctly", () => {
        expect(matches(v0, m0)).toBeFalsy();
        expect(matches(v1, m0)).toBeFalsy();
        expect(matches(v1, m4)).toBeTruthy();
        expect(matches(v2, m0)).toBeTruthy();
        expect(matches(v2, m1)).toBeTruthy();
        expect(matches(v2, m4)).toBeTruthy();
        expect(matches(v3, m0)).toBeFalsy();
        expect(matches(v3, m1)).toBeTruthy();
        expect(matches(v3, m4)).toBeTruthy();
        expect(matches(v4, m0)).toBeFalsy();
        expect(matches(v4, m1)).toBeFalsy();
        expect(matches(v4, m4)).toBeTruthy();
        expect(matches(v5, m0)).toBeFalsy();
        expect(matches(v5, m1)).toBeFalsy();
        expect(matches(v5, m4)).toBeFalsy();
    });

    it("Compares versions correctly", () => {
        expect(compareToMatcher(v1, m0)).toBeLessThan(0);
        expect(compareToMatcher(v1, m1)).toBeLessThan(0);
        expect(compareToMatcher(v1, m4)).toEqual(0);
        expect(compareToMatcher(v2, m0)).toEqual(0);
        expect(compareToMatcher(v2, m1)).toEqual(0);
        expect(compareToMatcher(v2, m4)).toEqual(0);
        expect(compareToMatcher(v3, m0)).toBeGreaterThan(0);
        expect(compareToMatcher(v3, m1)).toEqual(0);
        expect(compareToMatcher(v3, m4)).toEqual(0);
        expect(compareToMatcher(v4, m0)).toBeGreaterThan(0);
        expect(compareToMatcher(v4, m1)).toBeGreaterThan(0);
        expect(compareToMatcher(v4, m4)).toEqual(0);
        expect(compareToMatcher(v5, m0)).toBeGreaterThan(0);
        expect(compareToMatcher(v5, m1)).toBeGreaterThan(0);
        expect(compareToMatcher(v5, m4)).toBeGreaterThan(0);
    });
});
