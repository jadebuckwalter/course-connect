# Maintenance

This file outlines the steps involved in tagging a new release of CRLS Course Connect.

## Update the changelog

Add a new section to `CHANGELOG.md` outlining the changes and features made in this release, and link to the relevant issues and pull requests.

## Increment the version number

Increment the version number in `package.json`, and run `npm install` to update `package-lock.json`. This will ensure that the correct version number is displayed on the home page.

## Tag the release

Navigate to "releases", and draft a new release. Create a new tag with "v" followed by the version number. This is the final step of releasing a new version.
