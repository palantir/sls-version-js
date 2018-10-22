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

    /** orderable */
    orderable: boolean;
}

export class SlsVersion implements ISlsVersion {
    private static MATCHER = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-rc([0-9]+))?(?:-([0-9]+)-g([a-f0-9]+))?(\.dirty)?$/;

    public static safeValueOf(version: string): SlsVersion | null {
        try {
            return SlsVersion.of(version);
        } catch (e) {
            return null;
        }
    }

    public static of(version: string): SlsVersion {
        // Parse the version string as an SLS version
        const match = version.match(SlsVersion.MATCHER);

        if (null == match) {
            throw new Error(`Invalid SLS version: "${version}"`);
        }

        const [, major, minor, patch, rc, snapshot, hash, dirty] = match;
        const majorVersion = parseInt(major, undefined);
        const minorVersion = parseInt(minor, undefined);
        const patchVersion = parseInt(patch, undefined);
        const rcNumber = rc != null ? parseInt(rc, undefined) : undefined;
        const snapshotNumber = snapshot != null ? parseInt(snapshot, undefined) : undefined;

        if (
            major == null ||
            minor == null ||
            patch == null ||
            (hash != null && snapshot == null) ||
            (hash == null && snapshot != null)
        ) {
            throw new Error(`Invalid SLS version: "${version}"`);
        }

        return new SlsVersion(
            version,
            majorVersion,
            minorVersion,
            patchVersion,
            rcNumber,
            snapshotNumber,
            !Boolean(dirty),
        );
    }

    public static isValid(version: string): boolean {
        try {
            SlsVersion.of(version);
            return true;
        } catch (e) {
            return false;
        }
    }

    private constructor(
        private readonly value: string,
        public readonly major: number,
        public readonly minor: number,
        public readonly patch: number,
        public readonly rc: number | undefined,
        public readonly snapshot: number | undefined,
        public readonly orderable: boolean,
    ) {}

    public compare(other: ISlsVersion): -1 | 0 | 1 {
        if (!this.orderable || !other.orderable) {
            throw Error("Attempting to comparing unorderable versions");
        } else if (this.major !== other.major) {
            return this.major > other.major ? 1 : -1;
        } else if (this.minor !== other.minor) {
            return this.minor > other.minor ? 1 : -1;
        } else if (this.patch !== other.patch) {
            return this.patch > other.patch ? 1 : -1;
        }

        const compareRc = compareNullable(this.rc, other.rc, 1);
        if (compareRc !== 0) {
            return compareRc;
        }

        const compareSnapshot = compareNullable(this.snapshot, other.snapshot, -1);
        if (
            compareSnapshot !== 0 ||
            (this.snapshot == null && other.snapshot == null) ||
            (this.snapshot != null && other.snapshot != null)
        ) {
            return compareSnapshot;
        }

        if (this.snapshot != null) {
            return 1;
        } else if (other.snapshot != null) {
            return -1;
        }

        return 0;
    }

    public toString(): string {
        return this.value;
    }
}

function compareNullable(a: number | undefined, b: number | undefined, defaultValue: -1 | 1): -1 | 0 | 1 {
    if (a === b) {
        return 0;
    } else if (a == null || b == null) {
        if (a == null) {
            return defaultValue;
        }
        return -defaultValue as -1 | 0 | 1;
    }
    return a > b ? 1 : -1;
}
