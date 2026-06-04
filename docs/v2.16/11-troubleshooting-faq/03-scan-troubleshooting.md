# Scan Troubleshooting

Common issues with scans and their solutions.

| Problem | Likely cause | Fix |
|---|---|---|
| Scan shows 0 components | Scanner ran before dependencies were installed. | Run the scanner after `npm install` / `mvn compile`. |
| Wrong module | `--module` parameter mismatch. | Check the exact module name in ***TrustSource***. |
| Missing licenses | Package has no declared license. | Check the component in the Component Lake; add a manual license if needed. |
| Duplicate components | Multiple scans with different scanners. | Use one scanner per module, or merge results. |
