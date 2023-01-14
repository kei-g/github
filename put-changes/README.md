# Put changes with a signature of the github-actions[bot]

This action gets the [`github-action[bot]`][github-action-bot-url] to commit changes in a single file,
to sign it, and to push it to GitHub.

# Usage

```yaml
- uses: kei-g/github/put-changes@main
  with:
    # Path to the target file from the repository root.
    file: ''

    # $GITHUB_TOKEN must be passed.
    github-token: ''

    # Commit message.
    message: ''

    # Target branch name.
    target-branch: ''
```

# License

The scripts and documentation in this repository are released under the [BSD-3-Clause License][license-url]

# Contributions

Contributions are welcome! See [Contributor's Guide](https://github.com/kei-g/github/blob/main/CONTRIBUTING.md)

# Code of Conduct

:clap: Be nice. See [our code of conduct](https://github.com/kei-g/github/blob/main/CODE_OF_CONDUCT.md)

[github-action-bot-url]:https://github.com/apps/github-actions
[license-url]:https://github.com/kei-g/github/blob/main/LICENSE
