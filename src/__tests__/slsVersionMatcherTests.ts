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

describe("SLS Version matcher", () => {
    it("parses valid matchers", () => {
        expect(SlsVersionMatcher.of("x.x.x")).toEqual({ value: "x.x.x" });
        expect(SlsVersionMatcher.of("1.x.x")).toEqual({ value: "1.x.x", major: 1 });
        expect(SlsVersionMatcher.of("1.2.x")).toEqual({ value: "1.2.x", major: 1, minor: 2 });
        expect(SlsVersionMatcher.of("01.02.x")).toEqual({ value: "01.02.x", major: 1, minor: 2 });
        expect(SlsVersionMatcher.of("1.2.3")).toEqual({ value: "1.2.3", major: 1, minor: 2, patch: 3 });
    });

    it("fails to parse invalid matchers", () => {
        expect(SlsVersionMatcher.safeValueOf("x.x.x-foo")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("1.x.x.x")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("1x.x.x")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("x.1x.x")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("x.x.1x")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("x.x.x.x")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("x.y.z")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("1.2.3-x")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("1.2.3-rcx")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("1.2.3-rc1")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("1.2.3-rc1-x-gabcde")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("1.2.3-x-gabcde")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("x.2.3")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("1.x.3")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("x.x.3")).toBeNull();
        expect(SlsVersionMatcher.safeValueOf("x.2.x")).toBeNull();
    });

    it("Matches versions correctly", () => {
        expect(SlsVersionMatcher.of("x.x.x").matches(SlsVersion.of("0.0.0"))).toBeTruthy();
        expect(SlsVersionMatcher.of("x.x.x").matches(SlsVersion.of("2.3.4"))).toBeTruthy();
        expect(SlsVersionMatcher.of("x.x.x").matches(SlsVersion.of("2.3.4-5-gabcdef"))).toBeFalsy();
        expect(SlsVersionMatcher.of("x.x.x").matches(SlsVersion.of("2.3.4-rc5"))).toBeFalsy();
        expect(SlsVersionMatcher.of("x.x.x").matches(SlsVersion.of("2.3.4-rc3-1-gabc"))).toBeFalsy();

        expect(SlsVersionMatcher.of("2.x.x").matches(SlsVersion.of("2.3.4"))).toBeTruthy();
        expect(SlsVersionMatcher.of("2.x.x").matches(SlsVersion.of("2.3.4-5-gabcdef"))).toBeFalsy();
        expect(SlsVersionMatcher.of("2.x.x").matches(SlsVersion.of("2.3.4-rc5"))).toBeFalsy();
        expect(SlsVersionMatcher.of("2.x.x").matches(SlsVersion.of("2.3.4-rc3-1-gcba"))).toBeFalsy();
        expect(SlsVersionMatcher.of("2.x.x").matches(SlsVersion.of("1.3.4"))).toBeFalsy();
        expect(SlsVersionMatcher.of("2.x.x").matches(SlsVersion.of("3.3.4"))).toBeFalsy();

        expect(SlsVersionMatcher.of("2.3.x").matches(SlsVersion.of("2.3.4"))).toBeTruthy();
        expect(SlsVersionMatcher.of("2.3.x").matches(SlsVersion.of("2.3.4-5-gabcdef"))).toBeFalsy();
        expect(SlsVersionMatcher.of("2.3.x").matches(SlsVersion.of("2.3.4-rc5"))).toBeFalsy();
        expect(SlsVersionMatcher.of("2.3.x").matches(SlsVersion.of("2.3.4-rc3-1-gbbb"))).toBeFalsy();
        expect(SlsVersionMatcher.of("2.3.x").matches(SlsVersion.of("2.2.4"))).toBeFalsy();
        expect(SlsVersionMatcher.of("2.3.x").matches(SlsVersion.of("2.4.4"))).toBeFalsy();
        expect(SlsVersionMatcher.of("2.3.x").matches(SlsVersion.of("1.3.4"))).toBeFalsy();
        expect(SlsVersionMatcher.of("2.3.x").matches(SlsVersion.of("3.3.4"))).toBeFalsy();

        expect(SlsVersionMatcher.of("1.2.x").matches(SlsVersion.of("1.2.3-rc1"))).toBeFalsy();

        expect(SlsVersionMatcher.of("1.2.3").matches(SlsVersion.of("1.2.3"))).toBeTruthy();
        expect(SlsVersionMatcher.of("1.2.3").matches(SlsVersion.of("1.2.3-rc1"))).toBeFalsy();
        expect(SlsVersionMatcher.of("1.2.3").matches(SlsVersion.of("2.3.4-rc3-1-gbbb"))).toBeFalsy();
    });

    it("Compares versions correctly", () => {
        expect(SlsVersionMatcher.of("x.x.x").compare(SlsVersion.of("0.0.0"))).toEqual(0);

        expect(SlsVersionMatcher.of("1.x.x").compare(SlsVersion.of("0.0.0"))).toBeGreaterThan(0);
        expect(SlsVersionMatcher.of("1.x.x").compare(SlsVersion.of("1.0.0"))).toEqual(0);
        expect(SlsVersionMatcher.of("1.x.x").compare(SlsVersion.of("2.0.0"))).toBeLessThan(0);

        expect(SlsVersionMatcher.of("1.2.x").compare(SlsVersion.of("1.1.0"))).toBeGreaterThan(0);
        expect(SlsVersionMatcher.of("1.2.x").compare(SlsVersion.of("1.2.3"))).toEqual(0);
        expect(SlsVersionMatcher.of("1.2.x").compare(SlsVersion.of("1.3.2"))).toBeLessThan(0);

        expect(SlsVersionMatcher.of("1.2.3").compare(SlsVersion.of("1.2.4"))).toBeLessThan(0);
        expect(SlsVersionMatcher.of("1.2.3").compare(SlsVersion.of("1.2.3-rc1"))).toBeGreaterThan(0);

        expect(SlsVersionMatcher.of("1.2.x").compare(SlsVersion.of("1.2.3-rc1"))).toEqual(0);
        expect(SlsVersionMatcher.of("1.x.x").compare(SlsVersion.of("2.0.0"))).toBeLessThan(0);
    });

    it("Compares matchers correctly", () => {
        expect(SlsVersionMatcher.of("x.x.x").compare(SlsVersionMatcher.of("1.x.x"))).toBeGreaterThan(0);
        expect(SlsVersionMatcher.of("1.x.x").compare(SlsVersionMatcher.of("1.2.x"))).toBeGreaterThan(0);
        expect(SlsVersionMatcher.of("1.2.3").compare(SlsVersionMatcher.of("1.2.1"))).toBeGreaterThan(0);
    });
});
