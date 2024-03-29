# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0](https://github.com/jadebuckwalter/course-connect/releases/tag/v1.1.0) - tagged 2022-08-18
- Use course IDs (instead of course names) in the `connect` table to accommodate for year-to-year changes in course names ([#49](https://github.com/jadebuckwalter/course-connect/issues/49))
- Add an administrator portal that gives admin view access to the database ([#47](https://github.com/jadebuckwalter/course-connect/issues/47), [#50](https://github.com/jadebuckwalter/course-connect/pull/50))
- Provide access to forms from the resources page and remove form login pages ([#51](https://github.com/jadebuckwalter/course-connect/issues/51))
- Provide an alternate way of filling the database with test data ([#54](https://github.com/jadebuckwalter/course-connect/issues/54))
- Automate display of the version number from `package.json` ([#52](https://github.com/jadebuckwalter/course-connect/issues/52))
- Update `courses.tsv` to reflect the 2022-23 CRLS Course Catalog
- Move common functions into `home.js`
- Create `MAINTENANCE.md` to provide instructions on releasing a new version

## [1.0.4](https://github.com/jadebuckwalter/course-connect/releases/tag/v1.0.4) - tagged 2022-03-25
- Detect previous versions of the database and automatically migrate to the current version ([#45](https://github.com/jadebuckwalter/course-connect/issues/45), [#48](https://github.com/jadebuckwalter/course-connect/pull/48))
- Add a page for mentors to enter new courses that they have taken ([#10](https://github.com/jadebuckwalter/course-connect/issues/10))
- Add a brief description of the Peer Mentor Support Group (PMSG) to the mentor form
- Properly display a message to indicate when no mentors have taken a class ([#46](https://github.com/jadebuckwalter/course-connect/issues/46))

## [1.0.3](https://github.com/jadebuckwalter/course-connect/releases/tag/v1.0.3) - tagged 2022-02-01
- Add support for indicating PMSG (Peer Mentor Support Group) mentors ([#44](https://github.com/jadebuckwalter/course-connect/pull/44))
- Search by subject area in addition to individual classes ([#4](https://github.com/jadebuckwalter/course-connect/issues/4))
- Search on both original and abbreviated search terms ([#25](https://github.com/jadebuckwalter/course-connect/issues/25))
- Make abbreviations case-insensitive ([#40](https://github.com/jadebuckwalter/course-connect/issues/40))
- Redirect to the login page after submitting the mentor form ([#39](https://github.com/jadebuckwalter/course-connect/issues/39))
- Increase width of tables on larger screen sizes ([#43](https://github.com/jadebuckwalter/course-connect/issues/43))
- Update SQL setup scripts ([#41](https://github.com/jadebuckwalter/course-connect/pull/41), [#42](https://github.com/jadebuckwalter/course-connect/pull/42))

## [1.0.2](https://github.com/jadebuckwalter/course-connect/releases/tag/v1.0.2) - tagged 2021-11-15
- Update the mentor form to check for CPSD email addresses, add terms and conditions, and format names correctly
- Add course selection resources to the "Resources" page

## [1.0.1](https://github.com/jadebuckwalter/course-connect/releases/tag/v1.0.1) - tagged 2021-10-16
- Update `README.md` to include features and instructions for locally running CRLS Course Connect
- Make minor changes to the login page
- Add a file with sample authentication codes for testing purposes

## 1.0.0 - production 2021-10-13
- First version to go on the production server
