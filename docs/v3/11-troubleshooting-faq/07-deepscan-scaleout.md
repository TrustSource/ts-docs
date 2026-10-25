# DeepScan Scaleout troubleshooting

The connection test in **Administration → Settings → DeepScan Scaleout** checks the access role in your AWS account. Each check that fails or warns names one of these codes.

| Code | Likely cause | Fix |
|---|---|---|
| `ASSUME_ROLE` | AWS gives the same answer for three causes: the role `EACG-OS-Creator` does not exist in the account, its trust policy does not name the TrustSource principal, or it expects another ExternalId. | Check the role in IAM, or deploy the template again. After you regenerate the ExternalId, install the role again. |
| `ACCOUNT_MATCH` | The role belongs to another account than the one saved in TrustSource. | Check the AWS account ID and install the role in that account. |
| `POLICY_VERSION` | The roles carry an older `eacg:policy-version` tag than TrustSource requires. | Download the files again and update the stack `EACG-OS-Access`, or run `./client-iam.sh add` again. |
| `REGION` | The region is not enabled in the account, a service control policy (SCP) blocks it, or it offers fewer than two availability zones. | Enable the region or ask your AWS administrator. |
| `CFN_ACCESS` | The role cannot read the stack `EACG-OutScaler`. | Check that `EACG-OS-Creator` has all its permissions and that no permissions boundary or SCP limits them. |
| `FARGATE_QUOTA` (warning) | The Fargate vCPU quota is lower than the scale-out may use. | Lower the maximum number of tasks or request a higher quota in **Service Quotas**. |
| `CONFIG` (warning) | The resource configuration needs attention. | Read the message and adjust the values in **Scale-out resources**. |
| Test could not be executed | TrustSource could not run the test, for example because of a timeout. Nothing was checked. | Try again in a few minutes. If it keeps failing, see [Contact support](06-contact-support.md). |

## AWS Organizations

If your account belongs to an AWS Organization, service control policies can block the region, the creation of IAM roles, or roles assumed from outside the organization. Ask your AWS administrator to allow them for the scale-out account.

## Related

- [Install the access role](../06-administration/02d-deepscan-scaleout-access-role.md)
- [DeepScan Scaleout](../06-administration/02c-deepscan-scaleout.md)
