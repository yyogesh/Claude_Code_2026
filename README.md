# todo-api

A small Express API for managing todos.

## Pagination

`GET /todos` supports offset-based pagination:

| Query param | Default | Description |
| ----------- | ------- | ----------- |
| `limit`     | `20`    | Number of items to return. Must be a positive integer; values above `100` are capped at `100`. |
| `offset`    | `0`     | Number of matching items to skip. Must be a non-negative integer. |

The response body is a plain array. The `X-Total-Count` header gives the total number of matching items, across all pages. An invalid `limit` or `offset` returns `400` with an error message.

Pagination applies after the `state` filter, so `limit`, `offset` and `X-Total-Count` all refer to the filtered list:

```sh
curl -i "http://localhost:3000/todos?state=open&limit=10&offset=10"
```


Mac: brew install jq. Ubuntu: sudo apt-get install jq. Windows: winget install jqlang.jq

chmod +x .claude/hooks/*.sh


echo '{"tool_input":{"file_path":"package-lock.json"}}' | .claude/hooks/protect-files.sh; echo "exit $?"
