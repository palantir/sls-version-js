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

import { compareNullable } from "./comparison";
import { ISlsVersion, SlsVersion } from "./slsVersion";

export interface ISlsVersionMatcher {
    /** Major version matcher */
    major: number | undefined;

    /** Minor version number. */
    minor: number | undefined;

    /** Patch version number. */
    patch: number | undefined;
}

export class SlsVersionMatcher implements ISlsVersionMatcher {
    private static MATCHER = /^([0-9]+|x)\.([0-9]+|x)\.([0-9]+|x)$/;
    private static ABSENT_IS_GREATER = (t?: number) => (t == null ? Number.MAX_SAFE_INTEGER : t);

    public static safeValueOf(versionMatcher: string): SlsVersionMatcher | null {
        try {
            return SlsVersionMatcher.of(versionMatcher);
        } catch (error) {
            return null;
        }
    }

    public static of(versionMatcher: string) {
        const match = versionMatcher.match(this.MATCHER);

        if (match == null) {
            throw new Error(`Invalid SLS version match: "${versionMatcher}"`);
        }

        const [, majorMatcher, minorMatcher, patchMatcher] = match;
        const slsVersionMatcher: ISlsVersionMatcher = {
            major: undefined,
            minor: undefined,
            patch: undefined,
        };

        if (majorMatcher !== undefined && majorMatcher !== "x") {
            slsVersionMatcher.major = parseInt(majorMatcher, 10);
        }

        if (minorMatcher !== undefined && minorMatcher !== "x") {
            slsVersionMatcher.minor = parseInt(minorMatcher, 10);
        }

        if (patchMatcher !== undefined && patchMatcher !== "x") {
            slsVersionMatcher.patch = parseInt(patchMatcher, 10);
        }

        if (
            slsVersionMatcher.patch !== undefined &&
            (slsVersionMatcher.minor === undefined || slsVersionMatcher.major === undefined)
        ) {
            // String contains a pattern where major or minor version is underspecified.
            // Example: x.x.2, 1.x.3, x.2.3
            throw new Error(
                "Not a valid matcher, a patch version is specified, yet a major or minor is not specified.",
            );
        }

        if (slsVersionMatcher.minor !== undefined && slsVersionMatcher.major === undefined) {
            // String contains a pattern where major version is underspecified. Example: x.2.x
            throw new Error("Not a valid matcher, a minor version is specified, yet a major version is not specified.");
        }

        return new SlsVersionMatcher(
            versionMatcher,
            slsVersionMatcher.major,
            slsVersionMatcher.minor,
            slsVersionMatcher.patch,
        );
    }

    private constructor(
        private value: string,
        public major: number | undefined,
        public minor: number | undefined,
        public patch: number | undefined,
    ) {}

    public matches(version: ISlsVersion) {
        if (version.rc != null || version.snapshot != null) {
            return false;
        }

        return this.compare(version) === 0;
    }

    public compare(version: ISlsVersion | ISlsVersionMatcher): -1 | 0 | 1 {
        if (isSlsVersion(version)) {
            return this.compareSlsVersion(version);
        }

        let comparison: -1 | 0 | 1;
        comparison = compareNullable(this.major, version.major, SlsVersionMatcher.ABSENT_IS_GREATER);
        if (comparison !== 0) {
            return comparison;
        }

        comparison = compareNullable(this.minor, version.minor, SlsVersionMatcher.ABSENT_IS_GREATER);
        if (comparison !== 0) {
            return comparison;
        }

        comparison = compareNullable(this.patch, version.patch, SlsVersionMatcher.ABSENT_IS_GREATER);
        if (comparison !== 0) {
            return comparison;
        }

        return 0;
    }

    private compareSlsVersion(version: ISlsVersion): -1 | 0 | 1 {
        if (this.major !== undefined && this.minor !== undefined && this.patch !== undefined) {
            return SlsVersion.of(this.value).compare(version);
        }

        if (this.major !== undefined) {
            const comparison = compareNumbers(this.major, version.major);
            if (comparison !== 0) {
                return comparison;
            }
        }

        if (this.minor !== undefined) {
            const comparison = compareNumbers(this.minor, version.minor);
            if (comparison !== 0) {
                return comparison;
            }
        }
        if (this.patch !== undefined) {
            const comparison = compareNumbers(this.patch, version.patch);
            if (comparison !== 0) {
                return comparison;
            }
        }
        return 0;
    }

    public toString(): string {
        return this.value;
    }
}

function isSlsVersion(version: ISlsVersion | ISlsVersionMatcher): version is ISlsVersion {
    return (version as any).orderable != null;
}

function compareNumbers(lhs: number, rhs: number) {
    return lhs === rhs ? 0 : lhs < rhs ? -1 : 1;
}
