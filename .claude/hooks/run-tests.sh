#!/bin/bash
# Run the tests after every edit. If they fail, tell Claude.
cd "$CLAUDE_PROJECT_DIR" || exit 0
if ! OUTPUT=$(npm test 2>&1); then
  echo "Tests failed after this edit:" >&2
  echo "$OUTPUT" | tail -n 25 >&2
  exit 2
fi
exit 0