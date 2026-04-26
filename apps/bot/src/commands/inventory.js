// commands/inventory.js — /inventory  (ERC-721 tokens + badges for a user)
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { ethers } from 'ethers';
import { contract } from '@chainbot/shared';
import { getWallet } from '../lib/db.js';
import { error, base, BRAND_COLOR, BRAND_FOOTER } from '../lib/discord.js';

export const data = new SlashCommandBuilder()
  .setName('inventory')
  .setDescription("View a user's NFT collection and badges")
  .addUserOption(opt =>
    opt.setName('user')
       .setDescription('User to check (defaults to you)')
       .setRequired(false)
  );

export async function execute(interaction) {
  await interaction.deferReply();

  const targetUser = interaction.options.getUser('user') ?? interaction.user;
  const walletRow  = await getWallet(targetUser.id);

  if (!walletRow) {
    const isOwn = targetUser.id === interaction.user.id;
    return interaction.editReply({
      embeds: [error(
        isOwn
          ? "You don't have a wallet yet. Use `/wallet create` first."
          : `${targetUser.displayName} doesn't have a wallet linked.`
      )],
    });
  }

  try {
    const nft      = contract('NFTCollection');
    const balance  = await nft.balanceOf(walletRow.address);
    const count    = Number(balance);

    if (count === 0) {
      const embed = new EmbedBuilder()
        .setColor(BRAND_COLOR)
        .setTitle(`🎒 ${targetUser.displayName}'s Inventory`)
        .setDescription('No NFTs or badges yet. Visit `/shop` to get started!')
        .setThumbnail(targetUser.displayAvatarURL())
        .setFooter({ text: BRAND_FOOTER })
        .setTimestamp();
      return interaction.editReply({ embeds: [embed] });
    }

    // Fetch up to 25 token IDs
    const limit   = Math.min(count, 25);
    const tokenIds = await Promise.all(
      Array.from({ length: limit }, (_, i) => nft.tokenOfOwnerByIndex(walletRow.address, i))
    );

    const names = await Promise.all(
      tokenIds.map(id => nft.getItemName(id).catch(() => `Token #${id}`))
    );

    const lines = tokenIds.map((id, i) =>
      `🃏 **#${Number(id)}** — ${names[i]}`
    );

    if (count > 25) {
      lines.push(`\n*...and ${count - 25} more items (showing first 25)*`);
    }

    const embed = new EmbedBuilder()
      .setColor(BRAND_COLOR)
      .setTitle(`🎒 ${targetUser.displayName}'s Inventory`)
      .setDescription(lines.join('\n'))
      .setThumbnail(targetUser.displayAvatarURL())
      .addFields(
        { name: '🏦 Total NFTs', value: `${count}`, inline: true },
        { name: '📬 Wallet',    value: `\`${walletRow.address}\``, inline: false },
      )
      .setFooter({ text: BRAND_FOOTER })
      .setTimestamp();

    return interaction.editReply({ embeds: [embed] });
  } catch (err) {
    return interaction.editReply({ embeds: [error(`Failed to fetch inventory: ${err.message}`)] });
  }
}
