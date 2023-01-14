# Import a GPG key

This action imports a GPG secret key and also corresponding public key if specified.

# Usage

```yaml
- uses: kei-g/github/import-gpg@main
  with:
    # The fingerprint of `secret-key`
    fingerprint: ''

    # The passphrase to decrypt `secret-key`
    passphrase: ''

    # The GPG public key corresponding to `secret-key`
    # This is optional.
    public-key: ''

    # The GPG secret key to sign.
    secret-key: ''
```

# Action Outputs

| Output Name | Description |
|-|-|
| **created-at** | Timestamp when the imported GPG key was created.<br />It will be formatted to 'YYYY/MM/dd HH:mm:ss ZZZ' style. |
| **email** | E-mail address of the imported GPG key. |
| **fingerprint** | Fingerprint of the imported GPG key. |
| **id** | ID of the imported GPG key. |
| **keygrip** | Keygrip of the imported GPG key. |
| **user** | User name of the imported GPG key. |

If the imported GPG key is a subkey, this action will output below additional information.

| Output Name | Description |
|-|-|
| **primary-id** | ID of primary key corresponds to the imported GPG key. |
| **primary-timestamp** | Timestamp when the primary GPG key was created.<br />This value is elapsed seconds from 1970/01/01 00:00:00 UTC. |

# License

The scripts and documentation in this repository are released under the [BSD-3-Clause License][license-url]

# Contributions

Contributions are welcome! See [Contributor's Guide](https://github.com/kei-g/github/blob/main/CONTRIBUTING.md)

# Code of Conduct

:clap: Be nice. See [our code of conduct](https://github.com/kei-g/github/blob/main/CODE_OF_CONDUCT.md)

[license-url]:https://github.com/kei-g/github/blob/main/LICENSE
