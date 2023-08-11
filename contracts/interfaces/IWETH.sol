// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IWETH {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function deposit() external payable;

    function withdraw(uint256) external;

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        address spender,
        uint256 amount
    ) external returns (bool);

    function allowance(address spender, uint256 amount) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approve(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
