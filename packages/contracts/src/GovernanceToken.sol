// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title GovernanceToken — ERC-20Votes token for ChainBot on-chain governance
contract GovernanceToken is ERC20, ERC20Permit, ERC20Votes, Ownable {
    event GovernanceMinted(address indexed to, uint256 amount, uint256 timestamp);

    constructor(address initialOwner)
        ERC20("ChainBot Governance", "CBGOV")
        ERC20Permit("ChainBot Governance")
        Ownable(initialOwner)
    {}

    /// @notice Owner mints governance tokens to participants
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit GovernanceMinted(to, amount, block.timestamp);
    }

    // ── Required Overrides ────────────────────────────────────────────────────

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
