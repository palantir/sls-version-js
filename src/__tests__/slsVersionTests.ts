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

const orderableVersions = [
    "0.1.0",
    "1.0.0-rc1",
    "1.0.0-rc2",
    "1.0.0-rc2-4-gaaaaaaa",
    "1.0.0-rc2-5-gccccccc",
    "1.0.0",
    "1.1.0",
    "2.0.0",
    "2.0.0-3-gaaaaaaa",
    "2.0.0-4-gbbbbbbb",
    "2.1.0-rc1",
    "2.1.0",
];

const invalidVersions = ["", "1.0", "1.z.9", "1.0.0.1", "1.0.0-FOO"];

describe("SLS version", () => {
    it("creates valid versions", () => {
        orderableVersions.forEach(SlsVersion.of);
    });

    it("fails to create invalid versions", () => {
        invalidVersions.forEach(version => {
            expect(() => SlsVersion.of(version)).toThrowError(`Invalid SLS version: "${version}"`);
        });
    });

    it("parses structure correctly", () => {
        expect(SlsVersion.of("1.2.3")).toEqual({ major: 1, minor: 2, patch: 3, value: "1.2.3", orderable: true });
        expect(SlsVersion.of("1.2.3-rc4")).toEqual({
            major: 1,
            minor: 2,
            patch: 3,
            rc: 4,
            value: "1.2.3-rc4",
            orderable: true,
        });
        expect(SlsVersion.of("1.2.3-rc2-1-gabc")).toEqual({
            major: 1,
            minor: 2,
            patch: 3,
            rc: 2,
            snapshot: 1,
            value: "1.2.3-rc2-1-gabc",
            orderable: true,
        });
        expect(SlsVersion.of("1.2.3-4-gabc")).toEqual({
            major: 1,
            minor: 2,
            patch: 3,
            snapshot: 4,
            value: "1.2.3-4-gabc",
            orderable: true,
        });
    });

    it("compares equally to itself", () => {
        orderableVersions.forEach(version => {
            expect(SlsVersion.of(version).compare(SlsVersion.of(version))).toEqual(0);
        });
    });

    it("orders versions correctly", () => {
        for (let i = 0; i < orderableVersions.length - 1; i++) {
            const left = orderableVersions[i];
            const right = orderableVersions[i + 1];
            expect(SlsVersion.of(left).compare(SlsVersion.of(right))).toEqual(-1);
            expect(SlsVersion.of(right).compare(SlsVersion.of(left))).toEqual(1);
        }
    });
});
