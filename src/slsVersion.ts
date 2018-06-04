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

/** Parsed SLS version. */
export interface ISlsVersion {
    /** Major version number. */
    major: number;

    /** Minor version number. */
    minor: number;

    /** Patch version number. */
    patch: number;

    /** Release candidate version number. */
    rc: number | undefined;

    /** Snapshot number. */
    snapshot: number | undefined;

    /** Snapshot hash string. */
    hash: string | undefined;

    /** Unorderable */
    unorderable: boolean;
}

/** Parse an SLS version string. */
export function parse(version: string): ISlsVersion {
    // Parse the version string as an SLS version
    const match = version.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-rc([0-9]+))?(?:-([0-9]+)-g([a-f0-9]+))?(\.dirty)?$/);

    if (null == match) {
        throw new Error(`Invalid SLS version: "${version}"`);
    }

    const [, major, minor, patch, rc, snapshot, hash, dirty] = match;
    const parsedVersion = {
        hash,
        major: parseInt(major, undefined),
        minor: parseInt(minor, undefined),
        patch: parseInt(patch, undefined),
        rc: undefined !== rc ? parseInt(rc, undefined) : undefined,
        snapshot: undefined !== snapshot ? parseInt(snapshot, undefined) : undefined,
        unorderable: Boolean(dirty),
    };

    if (!isValid(parsedVersion)) {
        throw new Error(`Invalid SLS version: "${version}"`);
    }

    return parsedVersion;
}

/** Returns true if the parsed SLS version is valid. */
export function isValid(version: ISlsVersion) {
    return (
        null != version.major &&
        null != version.minor &&
        null != version.patch &&
        ((null == version.hash && null == version.snapshot) || (null !== version.hash && null != version.snapshot))
    );
}

/** Determine if a version is a release candidate. */
export function isReleaseCandidate(version: ISlsVersion): version is ISlsVersion & { rc: number } {
    return null != version.rc;
}

/** Determine if a version is a snapshot version. */
export function isSnapshot(version: ISlsVersion): version is ISlsVersion & { snapshot: number } {
    return null != version.snapshot;
}

/** Determine if a version is an RC but not a snapshot. */
export function isNormalReleaseCandidate(
    version: ISlsVersion,
): version is ISlsVersion & { rc: number; snapshot: undefined } {
    return isReleaseCandidate(version) && !isSnapshot(version);
}

/** Determine if a version is neither an RC or a snapshot. */
export function isNormalRelease(version: ISlsVersion): version is ISlsVersion & { rc: undefined; snapshot: undefined } {
    return !isReleaseCandidate(version) && !isSnapshot(version);
}

/** Determine if a version is a snapshot but not an RC. */
export function isNormalSnapshot(version: ISlsVersion): version is ISlsVersion & { rc: undefined; snapshot: number } {
    return !isReleaseCandidate(version) && isSnapshot(version);
}

/** Determine if a version is both a snapshot and an RC. */
export function isReleaseCandidateSnapshot(
    version: ISlsVersion,
): version is ISlsVersion & { rc: number; snapshot: number } {
    return isReleaseCandidate(version) && isSnapshot(version);
}

/** Returns true if `lhs > rhs`. */
export function gt(lhs: ISlsVersion, rhs: ISlsVersion) {
    if (lhs.unorderable || rhs.unorderable) {
        throw Error("Attempting to comparing unorderable versions");
    } else if (lhs.major !== rhs.major) {
        return lhs.major > rhs.major;
    } else if (lhs.minor !== rhs.minor) {
        return lhs.minor > rhs.minor;
    } else if (lhs.patch !== rhs.patch) {
        return lhs.patch > rhs.patch;
    } else if (isNormalSnapshot(lhs) && isNormalRelease(rhs)) {
        return true;
    } else if (isNormalRelease(lhs) && isNormalReleaseCandidate(rhs)) {
        return true;
    } else if (isNormalSnapshot(lhs) && isNormalSnapshot(rhs) && lhs.snapshot !== rhs.snapshot) {
        return lhs.snapshot > rhs.snapshot;
    } else if (isReleaseCandidate(lhs) && isReleaseCandidate(rhs) && lhs.rc !== rhs.rc) {
        return lhs.rc > rhs.rc;
    } else if (isReleaseCandidateSnapshot(lhs) && isNormalReleaseCandidate(rhs)) {
        return true;
    } else if (isReleaseCandidateSnapshot(lhs) && isReleaseCandidateSnapshot(rhs)) {
        return lhs.snapshot > rhs.snapshot;
    } else {
        return false;
    }
}

/** Return true if `lhs` = `rhs`. */
export function eq(lhs: ISlsVersion, rhs: ISlsVersion) {
    return !gt(lhs, rhs) && !gt(rhs, lhs);
}

/** Return true if `lhs >= rhs`. */
export function gte(lhs: ISlsVersion, rhs: ISlsVersion) {
    return gt(lhs, rhs) || eq(lhs, rhs);
}

/** Returns true if `lhs < rhs`. */
export function lt(lhs: ISlsVersion, rhs: ISlsVersion) {
    return gt(rhs, lhs) && !eq(lhs, rhs);
}

/** Returns true if `lhs <= rhs`. */
export function lte(lhs: ISlsVersion, rhs: ISlsVersion) {
    return gt(rhs, lhs) || eq(lhs, rhs);
}
