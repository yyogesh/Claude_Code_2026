#!/bin/bash
# Block edits to files Claude must never change.
FILE_PATH=$(jq -r '.tool_input.file_path // empty')

for pattern in ".env" "package-lock.json"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH is protected. Do not edit it. Ask the user." >&2
    exit 2
  fi
done
exit 0