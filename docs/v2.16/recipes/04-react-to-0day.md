# Recipe: React to a 0-Day Vulnerability

A critical CVE has been published. Find out if you are affected and respond.

## Steps

1. Search the [Vulnerability Lake](../05-knowledge/02-vulnerability-lake.md) for the CVE.
2. Check the **impact** — which of your modules use the affected component.
3. For each affected module: assess whether the vulnerability is exploitable in your context.
4. If affected: update the component, re-scan, and re-approve if needed.
5. If not affected: document the assessment (mute the CVE with a reason).
6. For released products: create a [CSAF advisory](../04-outbound/04-csaf.md) if required.
