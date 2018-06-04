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

import {
    eq,
    gt,
    gte,
    isReleaseCandidate,
    isSnapshot,
    isValid,
    lt,
    lte,
    major,
    minor,
    patch,
    rc,
    snapshot,
} from "../public";

const v0 = "0.1.0";
const v1 = "1.0.0-rc1";
const v2 = "1.0.0-rc2";
const v3 = "1.0.0-rc2-4-gaaaaaaa";
const v4 = "1.0.0-rc2-5-gccccccc";
const v5 = "2.0.0";
const v6 = "2.0.0-3-gaaaaaaa";
const v7 = "2.0.0-4-gbbbbbbb";
const v8 = "2.1.0-rc1";
const v9 = "2.1.0";
const v10 = "2.1.0-4-gcccccc.dirty";

describe("SLS version comparison", () => {
    it("supports gt()", () => {
        expect(gt(v0, v0)).toBe(false);
        expect(gt(v0, v1)).toBe(false);
        expect(gt(v0, v2)).toBe(false);
        expect(gt(v0, v3)).toBe(false);
        expect(gt(v0, v4)).toBe(false);
        expect(gt(v0, v5)).toBe(false);
        expect(gt(v0, v6)).toBe(false);
        expect(gt(v0, v7)).toBe(false);
        expect(gt(v0, v8)).toBe(false);
        expect(gt(v0, v9)).toBe(false);

        expect(gt(v1, v0)).toBe(true);
        expect(gt(v1, v1)).toBe(false);
        expect(gt(v1, v2)).toBe(false);
        expect(gt(v1, v3)).toBe(false);
        expect(gt(v1, v4)).toBe(false);
        expect(gt(v1, v5)).toBe(false);
        expect(gt(v1, v6)).toBe(false);
        expect(gt(v1, v7)).toBe(false);
        expect(gt(v1, v8)).toBe(false);
        expect(gt(v1, v9)).toBe(false);

        expect(gt(v2, v0)).toBe(true);
        expect(gt(v2, v1)).toBe(true);
        expect(gt(v2, v2)).toBe(false);
        expect(gt(v2, v3)).toBe(false);
        expect(gt(v2, v4)).toBe(false);
        expect(gt(v2, v5)).toBe(false);
        expect(gt(v2, v6)).toBe(false);
        expect(gt(v2, v7)).toBe(false);
        expect(gt(v2, v8)).toBe(false);
        expect(gt(v2, v9)).toBe(false);

        expect(gt(v3, v0)).toBe(true);
        expect(gt(v3, v1)).toBe(true);
        expect(gt(v3, v2)).toBe(true);
        expect(gt(v3, v3)).toBe(false);
        expect(gt(v3, v4)).toBe(false);
        expect(gt(v3, v5)).toBe(false);
        expect(gt(v3, v6)).toBe(false);
        expect(gt(v3, v7)).toBe(false);
        expect(gt(v3, v8)).toBe(false);
        expect(gt(v3, v9)).toBe(false);

        expect(gt(v4, v0)).toBe(true);
        expect(gt(v4, v1)).toBe(true);
        expect(gt(v4, v2)).toBe(true);
        expect(gt(v4, v3)).toBe(true);
        expect(gt(v4, v4)).toBe(false);
        expect(gt(v4, v5)).toBe(false);
        expect(gt(v4, v6)).toBe(false);
        expect(gt(v4, v7)).toBe(false);
        expect(gt(v4, v8)).toBe(false);
        expect(gt(v4, v9)).toBe(false);

        expect(gt(v5, v0)).toBe(true);
        expect(gt(v5, v1)).toBe(true);
        expect(gt(v5, v2)).toBe(true);
        expect(gt(v5, v3)).toBe(true);
        expect(gt(v5, v4)).toBe(true);
        expect(gt(v5, v5)).toBe(false);
        expect(gt(v5, v6)).toBe(false);
        expect(gt(v5, v7)).toBe(false);
        expect(gt(v5, v8)).toBe(false);
        expect(gt(v5, v9)).toBe(false);

        expect(gt(v6, v0)).toBe(true);
        expect(gt(v6, v1)).toBe(true);
        expect(gt(v6, v2)).toBe(true);
        expect(gt(v6, v3)).toBe(true);
        expect(gt(v6, v4)).toBe(true);
        expect(gt(v6, v5)).toBe(true);
        expect(gt(v6, v6)).toBe(false);
        expect(gt(v6, v7)).toBe(false);
        expect(gt(v6, v8)).toBe(false);
        expect(gt(v6, v9)).toBe(false);

        expect(gt(v7, v0)).toBe(true);
        expect(gt(v7, v1)).toBe(true);
        expect(gt(v7, v2)).toBe(true);
        expect(gt(v7, v3)).toBe(true);
        expect(gt(v7, v4)).toBe(true);
        expect(gt(v7, v5)).toBe(true);
        expect(gt(v7, v6)).toBe(true);
        expect(gt(v7, v7)).toBe(false);
        expect(gt(v7, v8)).toBe(false);
        expect(gt(v7, v9)).toBe(false);

        expect(gt(v8, v0)).toBe(true);
        expect(gt(v8, v1)).toBe(true);
        expect(gt(v8, v2)).toBe(true);
        expect(gt(v8, v3)).toBe(true);
        expect(gt(v8, v4)).toBe(true);
        expect(gt(v8, v5)).toBe(true);
        expect(gt(v8, v6)).toBe(true);
        expect(gt(v8, v7)).toBe(true);
        expect(gt(v8, v8)).toBe(false);
        expect(gt(v8, v9)).toBe(false);

        expect(gt(v9, v0)).toBe(true);
        expect(gt(v9, v1)).toBe(true);
        expect(gt(v9, v2)).toBe(true);
        expect(gt(v9, v3)).toBe(true);
        expect(gt(v9, v4)).toBe(true);
        expect(gt(v9, v5)).toBe(true);
        expect(gt(v9, v6)).toBe(true);
        expect(gt(v9, v7)).toBe(true);
        expect(gt(v9, v8)).toBe(true);
        expect(gt(v9, v9)).toBe(false);
    });

    it("supports gte()", () => {
        expect(gte(v0, v0)).toBe(true);
        expect(gte(v0, v1)).toBe(false);
        expect(gte(v0, v2)).toBe(false);
        expect(gte(v0, v3)).toBe(false);
        expect(gte(v0, v4)).toBe(false);
        expect(gte(v0, v5)).toBe(false);
        expect(gte(v0, v6)).toBe(false);
        expect(gte(v0, v7)).toBe(false);
        expect(gte(v0, v8)).toBe(false);
        expect(gte(v0, v9)).toBe(false);

        expect(gte(v1, v0)).toBe(true);
        expect(gte(v1, v1)).toBe(true);
        expect(gte(v1, v2)).toBe(false);
        expect(gte(v1, v3)).toBe(false);
        expect(gte(v1, v4)).toBe(false);
        expect(gte(v1, v5)).toBe(false);
        expect(gte(v1, v6)).toBe(false);
        expect(gte(v1, v7)).toBe(false);
        expect(gte(v1, v8)).toBe(false);
        expect(gte(v1, v9)).toBe(false);

        expect(gte(v2, v0)).toBe(true);
        expect(gte(v2, v1)).toBe(true);
        expect(gte(v2, v2)).toBe(true);
        expect(gte(v2, v3)).toBe(false);
        expect(gte(v2, v4)).toBe(false);
        expect(gte(v2, v5)).toBe(false);
        expect(gte(v2, v6)).toBe(false);
        expect(gte(v2, v7)).toBe(false);
        expect(gte(v2, v8)).toBe(false);
        expect(gte(v2, v9)).toBe(false);

        expect(gte(v3, v0)).toBe(true);
        expect(gte(v3, v1)).toBe(true);
        expect(gte(v3, v2)).toBe(true);
        expect(gte(v3, v3)).toBe(true);
        expect(gte(v3, v4)).toBe(false);
        expect(gte(v3, v5)).toBe(false);
        expect(gte(v3, v6)).toBe(false);
        expect(gte(v3, v7)).toBe(false);
        expect(gte(v3, v8)).toBe(false);
        expect(gte(v3, v9)).toBe(false);

        expect(gte(v4, v0)).toBe(true);
        expect(gte(v4, v1)).toBe(true);
        expect(gte(v4, v2)).toBe(true);
        expect(gte(v4, v3)).toBe(true);
        expect(gte(v4, v4)).toBe(true);
        expect(gte(v4, v5)).toBe(false);
        expect(gte(v4, v6)).toBe(false);
        expect(gte(v4, v7)).toBe(false);
        expect(gte(v4, v8)).toBe(false);
        expect(gte(v4, v9)).toBe(false);

        expect(gte(v5, v0)).toBe(true);
        expect(gte(v5, v1)).toBe(true);
        expect(gte(v5, v2)).toBe(true);
        expect(gte(v5, v3)).toBe(true);
        expect(gte(v5, v4)).toBe(true);
        expect(gte(v5, v5)).toBe(true);
        expect(gte(v5, v6)).toBe(false);
        expect(gte(v5, v7)).toBe(false);
        expect(gte(v5, v8)).toBe(false);
        expect(gte(v5, v9)).toBe(false);

        expect(gte(v6, v0)).toBe(true);
        expect(gte(v6, v1)).toBe(true);
        expect(gte(v6, v2)).toBe(true);
        expect(gte(v6, v3)).toBe(true);
        expect(gte(v6, v4)).toBe(true);
        expect(gte(v6, v5)).toBe(true);
        expect(gte(v6, v6)).toBe(true);
        expect(gte(v6, v7)).toBe(false);
        expect(gte(v6, v8)).toBe(false);
        expect(gte(v6, v9)).toBe(false);

        expect(gte(v7, v0)).toBe(true);
        expect(gte(v7, v1)).toBe(true);
        expect(gte(v7, v2)).toBe(true);
        expect(gte(v7, v3)).toBe(true);
        expect(gte(v7, v4)).toBe(true);
        expect(gte(v7, v5)).toBe(true);
        expect(gte(v7, v6)).toBe(true);
        expect(gte(v7, v7)).toBe(true);
        expect(gte(v7, v8)).toBe(false);
        expect(gte(v7, v9)).toBe(false);

        expect(gte(v8, v0)).toBe(true);
        expect(gte(v8, v1)).toBe(true);
        expect(gte(v8, v2)).toBe(true);
        expect(gte(v8, v3)).toBe(true);
        expect(gte(v8, v4)).toBe(true);
        expect(gte(v8, v5)).toBe(true);
        expect(gte(v8, v6)).toBe(true);
        expect(gte(v8, v7)).toBe(true);
        expect(gte(v8, v8)).toBe(true);
        expect(gte(v8, v9)).toBe(false);

        expect(gte(v9, v0)).toBe(true);
        expect(gte(v9, v1)).toBe(true);
        expect(gte(v9, v2)).toBe(true);
        expect(gte(v9, v3)).toBe(true);
        expect(gte(v9, v4)).toBe(true);
        expect(gte(v9, v5)).toBe(true);
        expect(gte(v9, v6)).toBe(true);
        expect(gte(v9, v7)).toBe(true);
        expect(gte(v9, v8)).toBe(true);
        expect(gte(v9, v9)).toBe(true);
    });

    it("supports lt()", () => {
        expect(lt(v0, v0)).toBe(false);
        expect(lt(v0, v1)).toBe(true);
        expect(lt(v0, v2)).toBe(true);
        expect(lt(v0, v3)).toBe(true);
        expect(lt(v0, v4)).toBe(true);
        expect(lt(v0, v5)).toBe(true);
        expect(lt(v0, v6)).toBe(true);
        expect(lt(v0, v7)).toBe(true);
        expect(lt(v0, v8)).toBe(true);
        expect(lt(v0, v9)).toBe(true);

        expect(lt(v1, v0)).toBe(false);
        expect(lt(v1, v1)).toBe(false);
        expect(lt(v1, v2)).toBe(true);
        expect(lt(v1, v3)).toBe(true);
        expect(lt(v1, v4)).toBe(true);
        expect(lt(v1, v5)).toBe(true);
        expect(lt(v1, v6)).toBe(true);
        expect(lt(v1, v7)).toBe(true);
        expect(lt(v1, v8)).toBe(true);
        expect(lt(v1, v9)).toBe(true);

        expect(lt(v2, v0)).toBe(false);
        expect(lt(v2, v1)).toBe(false);
        expect(lt(v2, v2)).toBe(false);
        expect(lt(v2, v3)).toBe(true);
        expect(lt(v2, v4)).toBe(true);
        expect(lt(v2, v5)).toBe(true);
        expect(lt(v2, v6)).toBe(true);
        expect(lt(v2, v7)).toBe(true);
        expect(lt(v2, v8)).toBe(true);
        expect(lt(v2, v9)).toBe(true);

        expect(lt(v3, v0)).toBe(false);
        expect(lt(v3, v1)).toBe(false);
        expect(lt(v3, v2)).toBe(false);
        expect(lt(v3, v3)).toBe(false);
        expect(lt(v3, v4)).toBe(true);
        expect(lt(v3, v5)).toBe(true);
        expect(lt(v3, v6)).toBe(true);
        expect(lt(v3, v7)).toBe(true);
        expect(lt(v3, v8)).toBe(true);
        expect(lt(v3, v9)).toBe(true);

        expect(lt(v4, v0)).toBe(false);
        expect(lt(v4, v1)).toBe(false);
        expect(lt(v4, v2)).toBe(false);
        expect(lt(v4, v3)).toBe(false);
        expect(lt(v4, v4)).toBe(false);
        expect(lt(v4, v5)).toBe(true);
        expect(lt(v4, v6)).toBe(true);
        expect(lt(v4, v7)).toBe(true);
        expect(lt(v4, v8)).toBe(true);
        expect(lt(v4, v9)).toBe(true);

        expect(lt(v5, v0)).toBe(false);
        expect(lt(v5, v1)).toBe(false);
        expect(lt(v5, v2)).toBe(false);
        expect(lt(v5, v3)).toBe(false);
        expect(lt(v5, v4)).toBe(false);
        expect(lt(v5, v5)).toBe(false);
        expect(lt(v5, v6)).toBe(true);
        expect(lt(v5, v7)).toBe(true);
        expect(lt(v5, v8)).toBe(true);
        expect(lt(v5, v9)).toBe(true);

        expect(lt(v6, v0)).toBe(false);
        expect(lt(v6, v1)).toBe(false);
        expect(lt(v6, v2)).toBe(false);
        expect(lt(v6, v3)).toBe(false);
        expect(lt(v6, v4)).toBe(false);
        expect(lt(v6, v5)).toBe(false);
        expect(lt(v6, v6)).toBe(false);
        expect(lt(v6, v7)).toBe(true);
        expect(lt(v6, v8)).toBe(true);
        expect(lt(v6, v9)).toBe(true);

        expect(lt(v7, v0)).toBe(false);
        expect(lt(v7, v1)).toBe(false);
        expect(lt(v7, v2)).toBe(false);
        expect(lt(v7, v3)).toBe(false);
        expect(lt(v7, v4)).toBe(false);
        expect(lt(v7, v5)).toBe(false);
        expect(lt(v7, v6)).toBe(false);
        expect(lt(v7, v7)).toBe(false);
        expect(lt(v7, v8)).toBe(true);
        expect(lt(v7, v9)).toBe(true);

        expect(lt(v8, v0)).toBe(false);
        expect(lt(v8, v1)).toBe(false);
        expect(lt(v8, v2)).toBe(false);
        expect(lt(v8, v3)).toBe(false);
        expect(lt(v8, v4)).toBe(false);
        expect(lt(v8, v5)).toBe(false);
        expect(lt(v8, v6)).toBe(false);
        expect(lt(v8, v7)).toBe(false);
        expect(lt(v8, v8)).toBe(false);
        expect(lt(v8, v9)).toBe(true);

        expect(lt(v9, v0)).toBe(false);
        expect(lt(v9, v1)).toBe(false);
        expect(lt(v9, v2)).toBe(false);
        expect(lt(v9, v3)).toBe(false);
        expect(lt(v9, v4)).toBe(false);
        expect(lt(v9, v5)).toBe(false);
        expect(lt(v9, v6)).toBe(false);
        expect(lt(v9, v7)).toBe(false);
        expect(lt(v9, v8)).toBe(false);
        expect(lt(v9, v9)).toBe(false);
    });

    it("supports lte()", () => {
        expect(lte(v0, v0)).toBe(true);
        expect(lte(v0, v1)).toBe(true);
        expect(lte(v0, v2)).toBe(true);
        expect(lte(v0, v3)).toBe(true);
        expect(lte(v0, v4)).toBe(true);
        expect(lte(v0, v5)).toBe(true);
        expect(lte(v0, v6)).toBe(true);
        expect(lte(v0, v7)).toBe(true);
        expect(lte(v0, v8)).toBe(true);
        expect(lte(v0, v9)).toBe(true);

        expect(lte(v1, v0)).toBe(false);
        expect(lte(v1, v1)).toBe(true);
        expect(lte(v1, v2)).toBe(true);
        expect(lte(v1, v3)).toBe(true);
        expect(lte(v1, v4)).toBe(true);
        expect(lte(v1, v5)).toBe(true);
        expect(lte(v1, v6)).toBe(true);
        expect(lte(v1, v7)).toBe(true);
        expect(lte(v1, v8)).toBe(true);
        expect(lte(v1, v9)).toBe(true);

        expect(lte(v2, v0)).toBe(false);
        expect(lte(v2, v1)).toBe(false);
        expect(lte(v2, v2)).toBe(true);
        expect(lte(v2, v3)).toBe(true);
        expect(lte(v2, v4)).toBe(true);
        expect(lte(v2, v5)).toBe(true);
        expect(lte(v2, v6)).toBe(true);
        expect(lte(v2, v7)).toBe(true);
        expect(lte(v2, v8)).toBe(true);
        expect(lte(v2, v9)).toBe(true);

        expect(lte(v3, v0)).toBe(false);
        expect(lte(v3, v1)).toBe(false);
        expect(lte(v3, v2)).toBe(false);
        expect(lte(v3, v3)).toBe(true);
        expect(lte(v3, v4)).toBe(true);
        expect(lte(v3, v5)).toBe(true);
        expect(lte(v3, v6)).toBe(true);
        expect(lte(v3, v7)).toBe(true);
        expect(lte(v3, v8)).toBe(true);
        expect(lte(v3, v9)).toBe(true);

        expect(lte(v4, v0)).toBe(false);
        expect(lte(v4, v1)).toBe(false);
        expect(lte(v4, v2)).toBe(false);
        expect(lte(v4, v3)).toBe(false);
        expect(lte(v4, v4)).toBe(true);
        expect(lte(v4, v5)).toBe(true);
        expect(lte(v4, v6)).toBe(true);
        expect(lte(v4, v7)).toBe(true);
        expect(lte(v4, v8)).toBe(true);
        expect(lte(v4, v9)).toBe(true);

        expect(lte(v5, v0)).toBe(false);
        expect(lte(v5, v1)).toBe(false);
        expect(lte(v5, v2)).toBe(false);
        expect(lte(v5, v3)).toBe(false);
        expect(lte(v5, v4)).toBe(false);
        expect(lte(v5, v5)).toBe(true);
        expect(lte(v5, v6)).toBe(true);
        expect(lte(v5, v7)).toBe(true);
        expect(lte(v5, v8)).toBe(true);
        expect(lte(v5, v9)).toBe(true);

        expect(lte(v6, v0)).toBe(false);
        expect(lte(v6, v1)).toBe(false);
        expect(lte(v6, v2)).toBe(false);
        expect(lte(v6, v3)).toBe(false);
        expect(lte(v6, v4)).toBe(false);
        expect(lte(v6, v5)).toBe(false);
        expect(lte(v6, v6)).toBe(true);
        expect(lte(v6, v7)).toBe(true);
        expect(lte(v6, v8)).toBe(true);
        expect(lte(v6, v9)).toBe(true);

        expect(lte(v7, v0)).toBe(false);
        expect(lte(v7, v1)).toBe(false);
        expect(lte(v7, v2)).toBe(false);
        expect(lte(v7, v3)).toBe(false);
        expect(lte(v7, v4)).toBe(false);
        expect(lte(v7, v5)).toBe(false);
        expect(lte(v7, v6)).toBe(false);
        expect(lte(v7, v7)).toBe(true);
        expect(lte(v7, v8)).toBe(true);
        expect(lte(v7, v9)).toBe(true);

        expect(lte(v8, v0)).toBe(false);
        expect(lte(v8, v1)).toBe(false);
        expect(lte(v8, v2)).toBe(false);
        expect(lte(v8, v3)).toBe(false);
        expect(lte(v8, v4)).toBe(false);
        expect(lte(v8, v5)).toBe(false);
        expect(lte(v8, v6)).toBe(false);
        expect(lte(v8, v7)).toBe(false);
        expect(lte(v8, v8)).toBe(true);
        expect(lte(v8, v9)).toBe(true);

        expect(lte(v9, v0)).toBe(false);
        expect(lte(v9, v1)).toBe(false);
        expect(lte(v9, v2)).toBe(false);
        expect(lte(v9, v3)).toBe(false);
        expect(lte(v9, v4)).toBe(false);
        expect(lte(v9, v5)).toBe(false);
        expect(lte(v9, v6)).toBe(false);
        expect(lte(v9, v7)).toBe(false);
        expect(lte(v9, v8)).toBe(false);
        expect(lte(v9, v9)).toBe(true);
    });

    it("supports eq()", () => {
        expect(eq("1.2.0", "1.2.0")).toBe(true);
        expect(eq("2.0.0-rc1", "2.0.0-rc1")).toBe(true);
        expect(eq("2.0.0-rc1-3-gaaaaaaa", "2.0.0-rc1-3-gbbbbbbb")).toBe(true);
        expect(eq("2.0.0-5-gbbbbbbb", "2.0.0-5-gaaaaaaa1")).toBe(true);
    });

    it("supports unorderable versions", () => {
        expect(() => lt(v9, v10)).toThrow("Attempting to comparing unorderable versions");
        expect(() => gt(v10, v8)).toThrow("Attempting to comparing unorderable versions");
    });
});

describe("SLS version parsing", () => {
    it("supports isValid()", () => {
        expect(isValid(v0)).toBe(true);
        expect(isValid(v1)).toBe(true);
        expect(isValid(v2)).toBe(true);
        expect(isValid(v3)).toBe(true);
        expect(isValid(v4)).toBe(true);
        expect(isValid(v5)).toBe(true);
        expect(isValid(v6)).toBe(true);
        expect(isValid(v7)).toBe(true);
        expect(isValid(v8)).toBe(true);
        expect(isValid(v9)).toBe(true);
        expect(isValid(v10)).toBe(true);

        expect(isValid("foo")).toBe(false);
        expect(isValid("bar")).toBe(false);
        expect(isValid("1")).toBe(false);
        expect(isValid("1.0")).toBe(false);
        expect(isValid("1.0.0-rc1-1-gzzzzzz")).toBe(false);
        expect(isValid("1.0.0-rc1-1-aaaaaa")).toBe(false);
    });

    it("supports isReleaseCandidate()", () => {
        expect(isReleaseCandidate(v0)).toBe(false);
        expect(isReleaseCandidate(v1)).toBe(true);
        expect(isReleaseCandidate(v2)).toBe(true);
        expect(isReleaseCandidate(v3)).toBe(true);
        expect(isReleaseCandidate(v4)).toBe(true);
        expect(isReleaseCandidate(v5)).toBe(false);
        expect(isReleaseCandidate(v6)).toBe(false);
        expect(isReleaseCandidate(v7)).toBe(false);
        expect(isReleaseCandidate(v8)).toBe(true);
        expect(isReleaseCandidate(v9)).toBe(false);
    });

    it("supports isSnapshot()", () => {
        expect(isSnapshot(v0)).toBe(false);
        expect(isSnapshot(v1)).toBe(false);
        expect(isSnapshot(v2)).toBe(false);
        expect(isSnapshot(v3)).toBe(true);
        expect(isSnapshot(v4)).toBe(true);
        expect(isSnapshot(v5)).toBe(false);
        expect(isSnapshot(v6)).toBe(true);
        expect(isSnapshot(v7)).toBe(true);
        expect(isSnapshot(v8)).toBe(false);
        expect(isSnapshot(v9)).toBe(false);
    });

    it("supports major()", () => {
        expect(major(v0)).toBe(0);
        expect(major(v1)).toBe(1);
        expect(major(v2)).toBe(1);
        expect(major(v3)).toBe(1);
        expect(major(v4)).toBe(1);
        expect(major(v5)).toBe(2);
        expect(major(v6)).toBe(2);
        expect(major(v7)).toBe(2);
        expect(major(v8)).toBe(2);
        expect(major(v9)).toBe(2);
    });

    it("supports minor()", () => {
        expect(minor(v0)).toBe(1);
        expect(minor(v1)).toBe(0);
        expect(minor(v2)).toBe(0);
        expect(minor(v3)).toBe(0);
        expect(minor(v4)).toBe(0);
        expect(minor(v5)).toBe(0);
        expect(minor(v6)).toBe(0);
        expect(minor(v7)).toBe(0);
        expect(minor(v8)).toBe(1);
        expect(minor(v9)).toBe(1);
    });

    it("supports patch()", () => {
        expect(patch(v0)).toBe(0);
        expect(patch(v1)).toBe(0);
        expect(patch(v2)).toBe(0);
        expect(patch(v3)).toBe(0);
        expect(patch(v4)).toBe(0);
        expect(patch(v5)).toBe(0);
        expect(patch(v6)).toBe(0);
        expect(patch(v7)).toBe(0);
        expect(patch(v8)).toBe(0);
        expect(patch(v9)).toBe(0);

        expect(patch("1.2.3")).toBe(3);
        expect(patch("2.3.4-rc1")).toBe(4);
    });

    it("supports rc()", () => {
        expect(rc(v0)).toBe(undefined);
        expect(rc(v1)).toBe(1);
        expect(rc(v2)).toBe(2);
        expect(rc(v3)).toBe(2);
        expect(rc(v4)).toBe(2);
        expect(rc(v5)).toBe(undefined);
        expect(rc(v6)).toBe(undefined);
        expect(rc(v7)).toBe(undefined);
        expect(rc(v8)).toBe(1);
        expect(rc(v9)).toBe(undefined);

        expect(rc("1.2.3")).toBe(undefined);
        expect(rc("1.2.3-rc4")).toBe(4);
    });

    it("supports snapshot()", () => {
        expect(snapshot(v0)).toBe(undefined);
        expect(snapshot(v1)).toBe(undefined);
        expect(snapshot(v2)).toBe(undefined);
        expect(snapshot(v3)).toBe(4);
        expect(snapshot(v4)).toBe(5);
        expect(snapshot(v5)).toBe(undefined);
        expect(snapshot(v6)).toBe(3);
        expect(snapshot(v7)).toBe(4);
        expect(snapshot(v8)).toBe(undefined);
        expect(snapshot(v9)).toBe(undefined);
    });
});
