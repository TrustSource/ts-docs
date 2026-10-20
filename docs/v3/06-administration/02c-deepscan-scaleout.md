# DeepScan Scaleout

> [!NOTE]
> **Required role:** `account_admin`
> **Available for:** enterprise accounts

**DeepScan Scaleout** runs ***TrustSource*** DeepScan in a private network in your own AWS account. Your source code is cloned and scanned there and never leaves your account; only the results are reported back. Open it from **Administration → Settings → DeepScan Scaleout**.

> [!CAUTION]
> The scale-out resources run in your AWS account, and AWS bills them to that account.

## How it works

TrustSource manages the scale-out environment for you. You install an access role in your AWS account once. TrustSource then uses that role to create, update and remove a CloudFormation stack named `EACG-OutScaler` with a private network, a job queue and the scan workers.

## The page

The header shows the status of the scale-out and the **Use for DeepScans** switch.

| Status | Meaning |
|---|---|
| **Not configured** | No AWS account is saved yet. |
| **Access not verified** | The account is saved, but the connection test has not passed yet. |
| **Ready** | The access role works. You can configure and deploy the environment. |
| **Deploying**, **Updating**, **Removing** | TrustSource is changing the environment in your account. |
| **Active** | The environment runs in your account. |
| **Failed** | The last change of the environment failed. |

**Use for DeepScans** sends the DeepScans of your company to the scale-out instead of the shared TrustSource DeepScan. You can switch it on once the access is verified and the environment is active.

The page has two sections:

1. **AWS access**: your AWS account ID, the ExternalId and the files that install the access role. See [Install the access role](02d-deepscan-scaleout-access-role.md).
2. **Scale-out resources**: region, network and the size of the scan workers. This section opens after a successful connection test.

## Change the account or the ExternalId

While an environment exists or **Use for DeepScans** is on, you cannot change the AWS account or regenerate the ExternalId. Switch the routing off and remove the environment first.

## Related

- [Install the access role](02d-deepscan-scaleout-access-role.md)
- [DeepScan Scaleout troubleshooting](../11-troubleshooting-faq/07-deepscan-scaleout.md)
- [Settings](02-settings.md)
