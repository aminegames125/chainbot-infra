// commands/vault.js — /vault open | mint | repay | status
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { ethers } from 'ethers';
import {
  contract, signerFromWalletRow, safeEstimateGas,
  explorerTx, parseCoin, formatCoin, erc20
} from '@chainbot/shared';
import { getWallet, getTokenBySymbol } from '../lib/db.js';
import {
  success, error, warning, base,
  fmtCoin, fmtUSD, BRAND_COLOR, BRAND_FOOTER
} from '../lib/discord.js';

const MIN_RATIO = 150; // 150% minimum collateral ratio

export const data = new SlashCommandBuilder()
  .setName('vault')
  .setDescription('Manage your collateralized debt vault')
  .addSubcommand(sub =>
    sub.setName('open')
       .setDescription('Deposit COIN as collateral to open / top-up your vault')
       .addNumberOption(opt =>
         opt.setName('collateral_amount')
            .setDescription('COIN amount to deposit as collateral')
            .setMinValue(0.000001)
            .setRequired(true)
       )
  )
  .addSubcommand(sub =>
    sub.setName('mint')
       .setDescription('Mint stablecoins against your collateral')
       .addStringOption(opt =>
         opt.setName('stablecoin')
            .setDescription('Stablecoin symbol to mint (e.g. USDX)')
            .setRequired(true)
       )
       .addNumberOption(opt =>
         opt.setName('amount')
            .setDescription('Amount to mint')
            .setMinValue(0.000001)
            .setRequired(true)
       )
  )
  .addSubcommand(sub =>
    sub.setName('repay')
       .setDescription('Repay minted stablecoins to reduce your debt')
       .addNumberOption(opt =>
         opt.setName('amount')
            .setDescription('Amount of stablecoin to repay')
            .setMinValue(0.000001)
            .setRequired(true)
       )
  )
  .addSubcommand(sub =>
    sub.setName('status')
       .setDescription('View your current vault health and stats')
  );

export async function execute(interaction) {
  await interaction.deferReply();
  const sub = interaction.options.getSubcommand();

  const walletRow = await getWallet(interaction.user.id);
  if (!walletRow) return interaction.editReply({ embeds: [error("No wallet found. Use `/wallet create` first.")] });
  if (!walletRow.is_custodial && sub !== 'status') {
    return interaction.editReply({ embeds: [error('View-only wallets cannot interact with vaults.')] });
  }

  const vaultContract = sub === 'status'
    ? contract('VaultManager')
    : contract('VaultManager', signerFromWalletRow(walletRow));

  // ── OPEN / DEPOSIT ──────────────────────────────────────────────────────────
  if (sub === 'open') {
    const amount = interaction.options.getNumber('collateral_amount', true);
    const value  = parseCoin(amount, 18);
    try {
      const tx      = await safeEstimateGas(vaultContract.deposit(value, { value }));
      const receipt = await tx.wait(1);

      // Fetch updated status
      const status = await vaultContract.getVaultStatus(walletRow.address);
      const embed  = new EmbedBuilder()
        .setColor(BRAND_COLOR)
        .setTitle('🏦 Vault Opened / Topped Up')
        .addFields(
          { name: '💰 Deposited',        value: `${amount} COIN`,                                     inline: true },
          { name: '🔒 Total Collateral', value: `${formatCoin(status.collateral)} COIN`,               inline: true },
          { name: '📊 Ratio',            value: `${(Number(status.ratio) / 100).toFixed(2)}%`,         inline: true },
          { name: '🔗 Tx',               value: `[View](${explorerTx(receipt.hash)})`,                 inline: false },
        )
        .setFooter({ text: BRAND_FOOTER })
        .setTimestamp();
      return interaction.editReply({ embeds: [embed] });
    } catch (err) {
      return interaction.editReply({ embeds: [error(err.message ?? 'Failed to deposit collateral.')] });
    }
  }

  // ── MINT ────────────────────────────────────────────────────────────────────
  if (sub === 'mint') {
    const stablecoin = interaction.options.getString('stablecoin', true).toUpperCase();
    const amount     = interaction.options.getNumber('amount', true);

    // Resolve stablecoin address
    const stableRow = await getTokenBySymbol(stablecoin);
    const stableAddr = stableRow?.address ?? ethers.ZeroAddress;

    try {
      // Check current ratio before minting
      const currentStatus = await vaultContract.getVaultStatus(walletRow.address);
      if (Number(currentStatus.ratio) < MIN_RATIO * 100) {
        return interaction.editReply({
          embeds: [warning('Insufficient Collateral',
            `Your current collateral ratio is ${(Number(currentStatus.ratio) / 100).toFixed(2)}%. ` +
            `Minimum required: **${MIN_RATIO}%**. Deposit more COIN with \`/vault open\`.`
          )],
        });
      }

      const amountWei = parseCoin(amount, 18);
      const tx        = await safeEstimateGas(vaultContract.mint(stableAddr, amountWei));
      const receipt   = await tx.wait(1);
      const newStatus = await vaultContract.getVaultStatus(walletRow.address);

      const embed = new EmbedBuilder()
        .setColor(BRAND_COLOR)
        .setTitle('💵 Stablecoin Minted')
        .addFields(
          { name: '🪙 Minted',          value: `${amount} ${stablecoin}`,                         inline: true },
          { name: '📊 New Ratio',        value: `${(Number(newStatus.ratio) / 100).toFixed(2)}%`, inline: true },
          { name: '⚠️ Liq. Price',      value: `${formatCoin(newStatus.liquidationPrice)} COIN`,  inline: true },
          { name: '🔗 Tx',              value: `[View](${explorerTx(receipt.hash)})`,             inline: false },
        )
        .setFooter({ text: BRAND_FOOTER })
        .setTimestamp();
      return interaction.editReply({ embeds: [embed] });
    } catch (err) {
      return interaction.editReply({ embeds: [error(err.message ?? 'Failed to mint stablecoin.')] });
    }
  }

  // ── REPAY ───────────────────────────────────────────────────────────────────
  if (sub === 'repay') {
    const amount    = interaction.options.getNumber('amount', true);
    const amountWei = parseCoin(amount, 18);
    try {
      const tx        = await safeEstimateGas(vaultContract.repay(amountWei));
      const receipt   = await tx.wait(1);
      const newStatus = await vaultContract.getVaultStatus(walletRow.address);

      const embed = new EmbedBuilder()
        .setColor(BRAND_COLOR)
        .setTitle('✅ Debt Repaid')
        .addFields(
          { name: '💸 Repaid',      value: `${amount} stablecoin`,                              inline: true },
          { name: '📊 New Ratio',   value: `${(Number(newStatus.ratio) / 100).toFixed(2)}%`,    inline: true },
          { name: '🏦 Remaining',   value: `${formatCoin(newStatus.minted)} outstanding`,        inline: true },
          { name: '🔗 Tx',         value: `[View](${explorerTx(receipt.hash)})`,                inline: false },
        )
        .setFooter({ text: BRAND_FOOTER })
        .setTimestamp();
      return interaction.editReply({ embeds: [embed] });
    } catch (err) {
      return interaction.editReply({ embeds: [error(err.message ?? 'Failed to repay.')] });
    }
  }

  // ── STATUS ──────────────────────────────────────────────────────────────────
  if (sub === 'status') {
    try {
      const s = await vaultContract.getVaultStatus(walletRow.address);
      const ratio = Number(s.ratio) / 100;
      const ratioColor = ratio < MIN_RATIO ? 0xED4245 : ratio < 200 ? 0xFEE75C : BRAND_COLOR;

      const embed = new EmbedBuilder()
        .setColor(ratioColor)
        .setTitle('🏦 Vault Status')
        .setDescription(
          ratio < MIN_RATIO
            ? '⚠️ **Your vault is at risk of liquidation! Deposit more collateral immediately.**'
            : ratio < 200
            ? '⚠️ Your vault ratio is getting low. Consider adding more collateral.'
            : '✅ Vault is healthy.'
        )
        .addFields(
          { name: '🔒 Collateral',         value: `${formatCoin(s.collateral)} COIN`,        inline: true },
          { name: '💵 Stablecoins Minted', value: `${formatCoin(s.minted)}`,                  inline: true },
          { name: '📊 Ratio',              value: `**${ratio.toFixed(2)}%**`,                 inline: true },
          { name: '⚠️ Liquidation Price',  value: `${formatCoin(s.liquidationPrice)} COIN`,   inline: true },
          { name: '📉 Min Safe Ratio',     value: `${MIN_RATIO}%`,                            inline: true },
        )
        .setFooter({ text: BRAND_FOOTER })
        .setTimestamp();
      return interaction.editReply({ embeds: [embed] });
    } catch (err) {
      return interaction.editReply({ embeds: [error(`Failed to fetch vault status: ${err.message}`)] });
    }
  }
}
