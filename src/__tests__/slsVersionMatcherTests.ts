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

import { SlsVersion } from "../slsVersion";
import { SlsVersionMatcher } from "../slsVersionMatcher";

const m0 = "5.3.2";
const m1 = "5.3.x";
const m2 = "5.x.2";
const m3 = "x.3.2";
const m4 = "5.x.x";
const m5 = "x.x.2";
const m6 = "x.x.x";

const v0 = SlsVersion.of("5.0.0-rc0");
const v1 = SlsVersion.of("5.0.0");
const v2 = SlsVersion.of("5.3.2");
const v3 = SlsVersion.of("5.3.4");
const v4 = SlsVersion.of("5.4.2");
const v5 = SlsVersion.of("6.3.2");

describe("SLS Version matcher", () => {
    it("Validates matcher correctly", () => {
        expect(SlsVersionMatcher.safeValueOf(m0)).not.toBeNull();
        expect(SlsVersionMatcher.safeValueOf(m1)).not.toBeNull();
        expect(SlsVersionMatcher.safeValueOf(m2)).toBeNull();
        expect(SlsVersionMatcher.safeValueOf(m3)).toBeNull();
        expect(SlsVersionMatcher.safeValueOf(m4)).not.toBeNull();
        expect(SlsVersionMatcher.safeValueOf(m5)).toBeNull();
        expect(SlsVersionMatcher.safeValueOf(m6)).not.toBeNull();
    });

    it("Matches versions correctly", () => {
        expect(SlsVersionMatcher.of(m0).matches(v0)).toBeFalsy();
        expect(SlsVersionMatcher.of(m0).matches(v1)).toBeFalsy();
        expect(SlsVersionMatcher.of(m4).matches(v1)).toBeTruthy();
        expect(SlsVersionMatcher.of(m0).matches(v2)).toBeTruthy();
        expect(SlsVersionMatcher.of(m1).matches(v2)).toBeTruthy();
        expect(SlsVersionMatcher.of(m4).matches(v2)).toBeTruthy();
        expect(SlsVersionMatcher.of(m0).matches(v3)).toBeFalsy();
        expect(SlsVersionMatcher.of(m1).matches(v3)).toBeTruthy();
        expect(SlsVersionMatcher.of(m4).matches(v3)).toBeTruthy();
        expect(SlsVersionMatcher.of(m0).matches(v4)).toBeFalsy();
        expect(SlsVersionMatcher.of(m1).matches(v4)).toBeFalsy();
        expect(SlsVersionMatcher.of(m4).matches(v4)).toBeTruthy();
        expect(SlsVersionMatcher.of(m0).matches(v5)).toBeFalsy();
        expect(SlsVersionMatcher.of(m1).matches(v5)).toBeFalsy();
        expect(SlsVersionMatcher.of(m4).matches(v5)).toBeFalsy();
    });

    it("Compares versions correctly", () => {
        expect(SlsVersionMatcher.of(m0).compare(v1)).toBeGreaterThan(0);
        expect(SlsVersionMatcher.of(m1).compare(v1)).toBeLessThan(0);
        expect(SlsVersionMatcher.of(m4).compare(v1)).toEqual(0);
        expect(SlsVersionMatcher.of(m0).compare(v2)).toEqual(0);
        expect(SlsVersionMatcher.of(m1).compare(v2)).toEqual(0);
        expect(SlsVersionMatcher.of(m4).compare(v2)).toEqual(0);
        expect(SlsVersionMatcher.of(m0).compare(v3)).toBeLessThan(0);
        expect(SlsVersionMatcher.of(m1).compare(v3)).toEqual(0);
        expect(SlsVersionMatcher.of(m4).compare(v3)).toEqual(0);
        expect(SlsVersionMatcher.of(m0).compare(v4)).toBeLessThan(0);
        expect(SlsVersionMatcher.of(m1).compare(v4)).toBeGreaterThan(0);
        expect(SlsVersionMatcher.of(m4).compare(v4)).toEqual(0);
        expect(SlsVersionMatcher.of(m0).compare(v5)).toBeLessThan(0);
        expect(SlsVersionMatcher.of(m1).compare(v5)).toBeGreaterThan(0);
        expect(SlsVersionMatcher.of(m4).compare(v5)).toBeGreaterThan(0);
    });
});
