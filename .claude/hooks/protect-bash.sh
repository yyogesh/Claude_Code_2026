#!/bin/bash
# Block shell commands that mention files Claude must never change.
CMD=$(jq -r '.tool_input.command // empty')

for pattern in ".env" "package-lock.json"; do
  if [[ "$CMD" == *"$pattern"* ]]; then
    echo "Blocked: this command touches protected file $pattern. Do not edit it. Ask the user." >&2
    exit 2
  fi
done
exit 0
