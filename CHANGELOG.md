# Changelog

## [0.0.4]

### Fixed
- Added missing return statement in Proxy setter.

## [0.0.3]

### Fixed
- Fixed typos and removed dead code.

## [0.0.2]

### Added
- Rollup configuration to bundle the library for production.
- Improved modularity with a `dist` folder for distribution.
- Support for tree-shaking with ES modules.

### Changed
- Replaced `eval`-based expression evaluation with a safer approach for evaluating and updating state.

### Fixed
- Fixed minor bugs related to state binding in some edge cases.

## [0.0.1]

### Added
- Initial release with core features including:
  - Reactive state with automatic DOM updates.
  - DOM data binding using `@data` attributes.
  - Event handling with `@click`, `@input`, and similar event attributes.