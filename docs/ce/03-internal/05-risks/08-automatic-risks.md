# Automatic Risks

> [!NOTE]
> **Switching SARIF risks on:** Account admin, Manager or Compliance manager, with write access to the project's quality settings.

***TrustSource CE*** can keep the risk register in step with your findings so nobody has to copy them over. Three sources create risks for you:

| Source | How it starts | Origin |
|---|---|---|
| SARIF test imports | Automatically, once switched on for the project | **CWE** |
| A license set by hand | Automatically, every time | **LIC** (Unmatched License) |
| Vulnerability report | By hand, with **Treatments → Add risks** | **CVE** |

In addition, **Create risk** on a SARIF finding opens a pre-filled risk form.

## SARIF weaknesses (CWE)

### Switch it on

Open the project settings, tab **Quality**, panel **Risk register**, and switch on **Enable risk creation from SARIF weaknesses (CWE)**. The switch is off by default. Switching it off stops new risks; risks already created stay in the register.

### What happens on import

Each SARIF document imported for a module of the project creates or updates **one risk per tool and weakness (CWE)**, with the origin **CWE**, the state `identified`, the CWE in the risk's [Threat model](10-threat-model-fields.md) tab and a name such as *[CWE-89] Weakness reported by Semgrep*.

- Only future imports are processed. To see risks appear for an existing test, import it again on the module's **Quality** tab.
- Importing the same file again changes nothing.
- A hand-created risk is never adopted.
- Your changes to name, origin, CWEs, state and every other field are kept. Imports refresh only the evidence on the **Occurrences** tab.
- Creating a risk and updating its occurrences are written to the [audit log](../../06-administration/07-audit-logs.md).

### In the risk editor

A SARIF risk shows an **Auto-created** strip with the CWE (linked to the [Vulnerability Lake](../../05-knowledge/04-vulnerability-lake.md)), the tool and a count line, for example *12 findings · 4 files · 2 rules · 5 occurrences*.

The **Occurrences (n)** tab lists the source references with **Level** (violation, warning, note), **Rule**, **File** and **Findings**. A risk stores at most 1,000 occurrences; above that the tab says *Showing n of m occurrences* and points you to the test on the module's **Quality** tab.

When a later import of the same tool no longer reports the weakness, the risk stays open. It shows *0 of n occurrences still active - ready to close?* and a **Review state** button; nothing is changed for you. Set the state to `closed` or `out-of-scope` if you agree.

While a SARIF risk is in state `accepted`, `transferred`, `out-of-scope` or `closed`, imports do not refresh it, and the strip says so.

### Limits

One import tracks at most 8 tools, 200 weaknesses per tool and 400 risks in total. Weaknesses beyond these limits are not tracked as risks, and the app does not report which ones were left out.

## Unmatched licenses (LIC)

When a Compliance manager or Manager sets the license of a component by hand because the scan could not match it (see [Manual License Resolution](../02-modules/06-manual-license-resolution.md)), TrustSource CE files a risk for that component in the module, named *[component] License set manually to license*, with the origin **Unmatched License (LIC)** and the state `identified`. The resolution dialog links to it.

If the license is set again later, the same risk is updated; its name follows the new license as long as nobody has renamed it. Risks in state `accepted`, `transferred`, `out-of-scope` or `closed` are left alone.

## Vulnerabilities (CVE)

In the [Vulnerability report](../04a-vulnerability-report.md), **Treatments → Add risks** (Manager or Company security manager) asks for an impact description and creates one risk per vulnerability and module, named after the vulnerability id, with the origin **Vulnerability (CVE)** and the state `identified`. These risks are not updated afterwards.

## Create a risk from a single SARIF finding

On a test page, **Create risk** next to a finding opens the **Risk capture** form pre-filled with a name, a description and the finding's CWEs. It needs the Compliance manager or Manager role.

## Related

- [SW Quality Scans](../../02-inbound/04-sw-quality-scans.md) - importing SARIF
- [SARIF weaknesses](../../02-inbound/04a-sarif-weaknesses.md) - how findings map to CWEs
- [Project Quality settings](../01-projects/settings/04-quality.md) - where the switch lives
