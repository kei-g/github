# Resolve distro name

This action resolves distro name and release version from codename for debian like distributions.

# Usage

```yaml
- uses: kei-g/github/debian/resolve-distro@main
  with:
    # Release codename like noble, trixie, and so on.
    codename: noble
    # Trim version suffix, or not.
    trim-version-suffix: true
```

# Action Outputs

| Output Name | Description |
|-|-|
| **long_name** | The long name of release version, like `debian-13` or `ubuntu-24.04`. |
| **name** | The name of distribution, `debian` or `ubuntu`. |
| **version** | The release version. |

# License

The scripts and documentation in this project are released under the [BSD-3-Clause License](https://github.com/kei-g/github/blob/main/LICENSE)

# Contributions

Contributions are welcome! See [Contributor's Guide](https://github.com/kei-g/github/blob/main/CONTRIBUTING.md)

# Code of Conduct

:clap: Be nice. See [our code of conduct](https://github.com/kei-g/github/blob/main/CODE_OF_CONDUCT.md)
