# Install the DeepScan Scaleout access role

> [!NOTE]
> **Required role:** `account_admin`

***TrustSource*** reaches your AWS account through two IAM roles that you install once:

- **EACG-OS-Creator**: only TrustSource can assume it, and only with your **ExternalId**. It can create, update and delete the stack `EACG-OutScaler` and read what the connection test needs.
- **EACG-OS-CloudFormation**: CloudFormation uses it to create the resources of the stack. Its permissions are limited to resources named `EACG-OutScaler` or `EACG-OS` and to the region.

Neither role can read or change your other resources. The roles themselves cost nothing.

## Before you start

- An AWS account for the scale-out. We recommend a separate account.
- An IAM user or SSO role in that account that may create IAM roles and CloudFormation stacks.
- In **DeepScan Scaleout → AWS access**, enter the 12-digit **AWS account ID** and select **Save**. The page shows the **ExternalId** and the files to download. The section also shows this guide with your values filled in.

## Option A: CloudFormation (recommended)

1. Sign in to the AWS console with your account and switch to the scale-out region (default `eu-central-1`).
2. Select **Launch in AWS console**. Or go to **CloudFormation → Create stack → With new resources → Upload a template file** and choose the downloaded `eacg-scaleout-access-v<version>.yaml`.
3. Enter the stack name `EACG-OS-Access`. Check that the parameter **ExternalId** shows the value from TrustSource.
4. Select **I acknowledge that AWS CloudFormation might create IAM resources with custom names** and create the stack.
5. Wait for `CREATE_COMPLETE`, then run the connection test in TrustSource.

## Option B: AWS CLI

You need the AWS CLI v2 and credentials for the account.

1. Select **Download CLI bundle**.
2. Check the account: `aws sts get-caller-identity --query Account --output text` must print your account ID.
3. Unzip the bundle: `unzip eacg-scaleout-cli-v<version>.zip -d eacg-scaleout && cd eacg-scaleout`
4. Run `./client-iam.sh add --external-id <ExternalId> --region <region>` and confirm with `y`. TrustSource shows this command with your values and a copy button.
5. Run the connection test in TrustSource.

## Option C: Manual setup (JSON)

1. Download the four JSON files.
2. In **IAM → Roles → Create role**, choose **Custom trust policy** and paste the EACG-OS-Creator trust policy.
3. Skip the permissions, name the role exactly `EACG-OS-Creator`, add the tag `eacg:policy-version` with the policy version TrustSource shows, and create the role.
4. Open the role, select **Add permissions → Create inline policy**, switch to **JSON**, paste the EACG-OS-Creator permissions and save the policy as `EACG-OS-Creator`.
5. Repeat steps 2 to 4 for `EACG-OS-CloudFormation`.
6. Run the connection test in TrustSource.

## Remove everything

First switch **Use for DeepScans** off and remove the scale-out environment in TrustSource. Then delete the stack `EACG-OS-Access`, or run `./client-iam.sh remove`.

> [!WARNING]
> When you select **Regenerate** for the ExternalId, the installed role stops working until you install it again with the new value.

## Related

- [DeepScan Scaleout](02c-deepscan-scaleout.md)
- [DeepScan Scaleout troubleshooting](../11-troubleshooting-faq/07-deepscan-scaleout.md)
