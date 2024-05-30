# Create a release on GitHub

This action creates a release on GitHub according to the tag in your repository.

# Prerequisites

This action must be use from events whose `github.ref` matches below regular expression,

```regex
^refs/tags/v[0-9]+(\.[0-9]+)*(\-[0-9A-Za-z]+)*$
```

# Usage

```yaml
- uses: kei-g/github/create-release@main
  with:
    # File list formatted as below,
    # `FilePath` as `MIME-Type`
    #
    # Any spaces are available for `FilePath`
    # `MIME-Type` can be omitted, then 'application/octet-stream' will be used instead.
    assets: |
      example.txt as text/plain
      friends.json as application/json
      group as unknown/type as application/octet-stream

    # The text which describes the release.
    #
    # Default: The message body of the current tag
    body: ''

    # `true` to create a draft (unpublished) release.
    # `false` to create a published one.
    #
    # Default: `false`
    draft: false

    # The token which will be used to create a release, typically the $GITHUB_TOKEN.
    #
    # Default: ${{ github.token }}
    github-token: ${{ secrets.GITHUB_TOKEN }}

    # `true` to identify the release as a prerelease.
    # `false` to identify the release as a full release.
    #
    # Default: `false`
    prerelease: false

    # The reference of a git commitish to be associated with the release.
    #
    # Default: ${{ github.ref }}
    ref: ''

    # The name of the release.
    #
    # Default: To be generated from the current tag
    release_name: ''

    # The remote name to be used internally.
    #
    # Default: 'origin'
    remote_name: 'origin'

    # The name of the tag for this release.
    #
    # Default: The current tag name
    tag_name: ''
```

# Action Outputs

| Output Name | Description |
|-|-|
| **response** | The response from GitHub REST API. |

# License

The scripts and documentation in this project are released under the [BSD-3-Clause License](https://github.com/kei-g/github/blob/main/LICENSE)

# Contributions

Contributions are welcome! See [Contributor's Guide](https://github.com/kei-g/github/blob/main/CONTRIBUTING.md)

# Code of Conduct

:clap: Be nice. See [our code of conduct](https://github.com/kei-g/github/blob/main/CODE_OF_CONDUCT.md)
