# PR Comment GitHub Action

This simple GitHub Action posts and maintains a single bot comment on a PR.

## Usage

Just add the following step to one of your workflows:

```yaml
- uses: 7Factor/action-pr-comment@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    comment-identifier: some-unique-identifier
    comment-body: |
      This is a comment that will be posted on the PR.
```

The `comment-identifier` is a string that will allow this action to find the existing comment and update it when the
workflow is run again. If you change the `comment-identifier`, a new comment will be posted.
