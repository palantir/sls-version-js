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

import * as sls from "./slsVersion";
import { SlsVersionMatcher } from "./slsVersionMatcher";

/**
 * Return true if `lhs > rhs`.
 *
 * TODO: add link to sls spec eventually
 * Rules for comparison are defined
 * [here]()
 *
 * @param lhs Left hand side version string
 * @param rhs Right hand side version string
 */
export function gt(lhs: string, rhs: string) {
    return sls.gt(sls.parse(lhs), sls.parse(rhs));
}

/**
 * Return true if `lhs` is "as big as" `rhs`.
 *
 * This is defined as neither `lhs > rhs` nor `rhs > lhs`.
 *
 * @param lhs Left hand side version string
 * @param rhs Right hand side version string
 */
export function eq(lhs: string, rhs: string) {
    return sls.eq(sls.parse(lhs), sls.parse(rhs));
}

/**
 * Determine if the left version is greater than or equal to the right version.
 *
 * `lhs >= rhs` is defined as `lhs > rhs || lhs == rhs`.
 *
 * @param lhs Left hand side version string
 * @param rhs Right hand side version string
 */
export function gte(lhs: string, rhs: string) {
    return sls.gte(sls.parse(lhs), sls.parse(rhs));
}

/**
 * Determine if `lhs < rhs`.
 *
 * `lhs < rhs` is defined as `rhs > lhs && lhs != rhs`.
 *
 * @param lhs Left hand side version string
 * @param rhs Right hand side version string
 */
export function lt(lhs: string, rhs: string) {
    return sls.lt(sls.parse(lhs), sls.parse(rhs));
}

/**
 * Determine if `lhs <= rhs`.
 *
 * @param lhs Left hand side version string
 * @param rhs Right hand side version string
 */
export function lte(lhs: string, rhs: string) {
    return sls.lte(sls.parse(lhs), sls.parse(rhs));
}

/**
 * Extract the major version number from an SLS version string.
 *
 * @param version Version string
 */
export function major(version: string) {
    return sls.parse(version).major;
}

/**
 * Extract the minor version number from an SLS version string.
 *
 * @param version Version string
 */
export function minor(version: string) {
    return sls.parse(version).minor;
}

/**
 * Extract the patch version number from an SLS version string.
 *
 * @param version Version string
 */
export function patch(version: string) {
    return sls.parse(version).patch;
}

/**
 * Extract the release candidate number from an SLS version string.
 *
 * @param version Version string
 */
export function rc(version: string) {
    return sls.parse(version).rc;
}

/**
 * Extract the snapshot number from an SLS version string.
 *
 * @param version Version string
 */
export function snapshot(version: string) {
    return sls.parse(version).snapshot;
}

/**
 * Determine if a vesion string is a valid SLS version.
 *
 * @param version Version string to check
 */
export function isValid(version: string) {
    try {
        sls.parse(version);
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * Determine if a version string is a release candidate.
 *
 * @param version Version string to check
 */
export function isReleaseCandidate(version: string) {
    return sls.isReleaseCandidate(sls.parse(version));
}

/**
 * Determine if a version is a snapshot version.
 *
 * @param version Version string to check
 */
export function isSnapshot(version: string) {
    return sls.isSnapshot(sls.parse(version));
}

/**
 * Determine if a version matcher string is a valid SLS version matcher
 *
 * @param versionMatcher Version matcher string to check
 */
export function safeValueOf(versionMatcher: string) {
    return SlsVersionMatcher.safeValueOf(versionMatcher);
}

/**
 * Determine if an SLS version matches a version matcher string
 *
 * @param version Version string to check
 * @param versionMatcher Version matcher string to check against
 */
export function matches(version: string, versionMatcher: string) {
    try {
        const slsVersion = sls.parse(version);
        const slsVersionMatcher = SlsVersionMatcher.parse(versionMatcher);
        return slsVersionMatcher.matches(slsVersion);
    } catch (error) {
        return false;
    }
}

/**
 * @return a positive number if version > versionMatcher, negative number if version < versionMatcher, 0 if they match
 * @param version
 * @param versionMatcher
 */
export function compareToMatcher(version: string, versionMatcher: string) {
    const slsVersion = sls.parse(version);
    const slsVersionMatcher = SlsVersionMatcher.parse(versionMatcher);
    return slsVersionMatcher.compare(slsVersion);
}
