# Testing Guide

This directory contains all the tests for the NYS Directory project. The tests are organized into the following categories:

## Directory Structure

```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
└── e2e/           # End-to-end tests
```

## Running Tests

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## Writing Tests

### Unit Tests
- Place unit tests in the `tests/unit` directory
- Name test files with `.test.js` or `.spec.js` extension
- Group related tests using `describe` blocks
- Use clear test descriptions

### Integration Tests
- Place integration tests in the `tests/integration` directory
- Focus on testing component interactions
- Test API endpoints and database operations

### E2E Tests
- Place E2E tests in the `tests/e2e` directory
- Use Cypress for browser testing
- Test complete user workflows

## Best Practices

1. Follow the AAA pattern:
   - Arrange
   - Act
   - Assert

2. Keep tests focused and atomic
3. Use meaningful test descriptions
4. Mock external dependencies
5. Clean up after tests
6. Maintain test independence 