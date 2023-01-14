# Checkout a repository with digest

This action checkouts an arbitrary repository calculates the digest of specified files except under '.git' directory in the repository.

To be a bit more precise about the structure on computing a hash, firstly specified files are sorted by their relative paths from the repository root in ascending order.
And then, during the process for each file, its file mode and relative path are joined by a whitespace to a line as a header.
The content for each file is preceded by its header, and they are separated by a linefeed, '\n'.
If some linefeeds are included in a relative path, the header is not composed of a single line.

# Usage

```yaml
- uses: kei-g/github/checkout@main
  with:
    # Hash algorithm applied to calculate the digest.
    #
    # Default: 'sha256'
    algorithm:

    # Style for output.
    #
    # Default: 'hex'
    encoding:

    # Number of commits to fetch. 0 indicates all history for all branches and tags.
    #
    # Default: 1
    fetch-depth: ''

    # Paths to be excluded to calculate the digest.
    # `paths-ignore` priors to `paths-to-hash` invariably.
    #
    # '.git/**' is always excluded.
    paths-ignore: |
      '.git/**'

    # Paths to be explicitly included to calculate the digest.
    # `paths-ignore` priors to `paths-to-hash` invariably.
    #
    # '.git/**' is always excluded.
    paths-to-hash: |
      'example'

    # Whether to configure the token or SSH key with the local git config
    #
    # Default: true
    persist-credentials: ''

    # The branch, tag or SHA to checkout.
    # When checking out the repository that triggered a workflow,
    # this defaults to the reference or SHA for that event.
    # Otherwise, uses the default branch.
    ref: ''

    # Repository name with owner. For example, kei-g/github
    #
    # Default: ${{ github.repository }}
    repository: ''

    # SSH key used to fetch the repository.
    # The SSH key is configured with the local git config,
    # which enables your scripts to run authenticated git commands.
    # The post-job step removes the SSH key.
    #
    # We recommend using a service account with the least permissions necessary.
    #
    # [Learn more about creating and using encrypted secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)
    ssh-key: ''

    # Known hosts in addition to the user and global host key database.
    # The public SSH keys for a host may be obtained using the utility `ssh-keyscan`.
    # For example, `ssh-keyscan github.com`.
    # The public key for github.com is always implicitly added.
    ssh-known-hosts: ''

    # Whether to perform strict host key checking.
    # When true, adds the options `StrictHostKeyChecking=yes` and `CheckHostIP=no` to the SSH command line.
    # Use the input `ssh-known-hosts` to configure additional hosts.
    #
    # Default: true
    ssh-strict: ''

    # Whether to checkout submodules: `true` to checkout submodules or `recursive` to recursively checkout submodules.
    #
    # When the `ssh-key` input is not provided, SSH URLs beginning with `git@github.com:` are converted to HTTPS.
    #
    # Default: false
    submodules: ''

    # Personal access token (PAT) used to fetch the repository.
    # The PAT is configured with the local git config,
    # which enables your scripts to run authenticated git commands.
    # The post-job step removes the PAT.
    #
    # We recommend using a service account with the least permissions necessary.
    # Also when generating a new PAT, select the least scopes necessary.
    #
    # [Learn more about creating and using encrypted secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)
    #
    # Default: ${{ github.token }}
    token: ''
```

# Action Outputs

| Output Name | Description |
|-|-|
| **digest** | Calculated digest. |

# License

The scripts and documentation in this repository are released under the [BSD-3-Clause License][license-url]

# Contributions

Contributions are welcome! See [Contributor's Guide](https://github.com/kei-g/github/blob/main/CONTRIBUTING.md)

# Code of Conduct

:clap: Be nice. See [our code of conduct](https://github.com/kei-g/github/blob/main/CODE_OF_CONDUCT.md)

[license-url]:https://github.com/kei-g/github/blob/main/LICENSE
