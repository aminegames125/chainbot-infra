/**
 * export-abis.js
 * Reads deployments.json and writes one <ContractName>.json per contract
 * to the abis/ directory at the project root.
 *
 * Usage: node scripts/export-abis.js
 */

const fs   = require("fs");
const path = require("path");

const deploymentsPath = path.join(__dirname, "..", "deployments.json");
const abisDir         = path.join(__dirname, "..", "abis");

if (!fs.existsSync(deploymentsPath)) {
  console.error("❌ deployments.json not found — run deploy first.");
  process.exit(1);
}

const deployments = JSON.parse(fs.readFileSync(deploymentsPath, "utf-8"));

if (!fs.existsSync(abisDir)) {
  fs.mkdirSync(abisDir, { recursive: true });
}

let exported = 0;
for (const [label, info] of Object.entries(deployments)) {
  if (!info.abi) {
    // Fall back to reading from Hardhat artifacts
    const artifactPath = path.join(
      __dirname, "..", "artifacts", "src", `${info.contractName}.sol`, `${info.contractName}.json`
    );
    if (fs.existsSync(artifactPath)) {
      const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
      info.abi = artifact.abi;
    } else {
      console.warn(`⚠  No ABI found for ${label} (${info.contractName}) — skipping`);
      continue;
    }
  }

  const out = {
    contractName: info.contractName,
    label,
    address: info.address,
    deployedAt: info.deployedAt,
    abi: info.abi,
  };

  const outFile = path.join(abisDir, `${label}.json`);
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
  console.log(`✅ Exported ${label.padEnd(26)} → abis/${label}.json`);
  exported++;
}

// Also write a combined index file
const index = {};
for (const [label, info] of Object.entries(deployments)) {
  index[label] = { address: info.address, contractName: info.contractName };
}
fs.writeFileSync(path.join(abisDir, "index.json"), JSON.stringify(index, null, 2));
console.log(`\n✅ abis/index.json written (${exported} contracts exported)`);
