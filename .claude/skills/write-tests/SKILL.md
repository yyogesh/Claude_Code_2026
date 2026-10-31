---
name: write-tests
description: Writes unit tests the way this team does. Use when the user asks for tests, test coverage, or to test a function or route.
argument-hint: [file to test]
disable-model-invocation: true
---
# Writing tests

If a file was given, test this file: $ARGUMENTS

1. Read examples/good-test.js first and copy its style.
2. Put the test in tests/<name>.test.js.
3. One describe block per function. Test names start with "should".
4. Cover: happy path, empty input, wrong type, one edge case.
5. Do not change the code under test. If you find a bug, tell me.
6. Run `npm test` and fix the tests until they pass.