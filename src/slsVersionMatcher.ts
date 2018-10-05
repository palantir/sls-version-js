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

import { eq, gt, ISlsVersion } from "./slsVersion";

export interface ISlsVersionMatcher {
    /** Major version matcher */
    major: number | undefined;

    /** Minor version number. */
    minor: number | undefined;

    /** Patch version number. */
    patch: number | undefined;
}

export class SlsVersionMatcher implements ISlsVersionMatcher {
    public static safeValueOf(versionMatcher: string): SlsVersionMatcher | null {
        try {
            return SlsVersionMatcher.parse(versionMatcher);
        } catch (error) {
            return null;
        }
    }

    public static parse(versionMatcher: string) {
        const match = versionMatcher.match(/^([0-9]+|x)\.([0-9]+|x)\.([0-9]+|x)$/);

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

        return new SlsVersionMatcher(slsVersionMatcher.major, slsVersionMatcher.minor, slsVersionMatcher.patch);
    }

    constructor(public major: number | undefined, public minor: number | undefined, public patch: number | undefined) {}

    public matches(version: ISlsVersion) {
        if (version.rc !== undefined) {
            return false;
        }

        return this.compare(version) === 0;
    }

    public compare(version: ISlsVersion) {
        // we can just compare these 2 as SLS versions
        if (this.major !== undefined && this.minor !== undefined && this.patch !== undefined) {
            const versionMatcherVersion: ISlsVersion = {
                hash: undefined,
                major: this.major,
                minor: this.minor,
                patch: this.patch,
                rc: undefined,
                snapshot: undefined,
                unorderable: false,
            };

            if (eq(version, versionMatcherVersion)) {
                return 0;
            } else if (gt(version, versionMatcherVersion)) {
                return 1;
            } else {
                return -1;
            }
        }

        if (this.major !== undefined) {
            const comparison = compareNumbers(version.major, this.major);
            if (comparison !== 0) {
                return comparison;
            }
        }

        if (this.minor !== undefined) {
            const comparison = compareNumbers(version.minor, this.minor);
            if (comparison !== 0) {
                return comparison;
            }
        }

        if (this.patch !== undefined) {
            const comparison = compareNumbers(version.patch, this.patch);
            if (comparison !== 0) {
                return comparison;
            }
        }

        return 0;
    }
}

function compareNumbers(lhs: number, rhs: number) {
    return lhs === rhs ? 0 : lhs < rhs ? -1 : 1;
}
