
# slsversion
Typescript utilities for manipulating SLS versions.

## Overview
Comparison:
+ `eq(lhs, rhs)` — `lhs == rhs`  
+ `gt(lhs, rhs)` — `lhs > rhs`
+ `gte(lhs, rhs)` — `lhs >= rhs`
+ `lt(lhs, rhs)` — `lhs < rhs`
+ `lte(lhs, rhs)` — `lhs <= rhs`



Parsing:

+ `isValid()` — Determine if a version string is valid
+ `major()` — Extract the major version number from a version string
+ `minor()` — Extract the minor version number from a version string
+ `patch()` — Extract the patch version number from a version string
+ `rc()` — Extract the release candidate number from a version string
+ `snapshot()`— Extract the snapshot number from a version string
+ `isReleaseCandidate()` — Returns true of the version is a release candidate
+ `isSnapshot()` — Returns true if the version is a snapshot version

