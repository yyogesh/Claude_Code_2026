---
description: Run tests, fix failures, re-run until green
argument-hint: [test file or folder]
---
Run `npm test -- $ARGUMENTS`.
If tests fail, find the cause and fix the code.
Do not change a test unless the test itself is wrong. If so, tell me why.
Run the tests again. Stop after 3 tries and tell me what is still failing.
At the end, list each file you changed in one line.