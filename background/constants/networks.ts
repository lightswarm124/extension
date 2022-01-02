import { BTCNetwork, EVMNetwork } from "../networks"
import { BTC, ETH, BCH } from "./currencies"

// TODO integrate this with /api/networks

export const ETHEREUM: EVMNetwork = {
  name: "Ethereum",
  baseAsset: ETH,
  chainID: "1",
  family: "EVM",
}

export const ROPSTEN: EVMNetwork = {
  name: "Ropsten",
  baseAsset: ETH,
  chainID: "3",
  family: "EVM",
}

export const RINKEBY: EVMNetwork = {
  name: "Rinkeby",
  baseAsset: ETH,
  chainID: "4",
  family: "EVM",
}

export const GOERLI: EVMNetwork = {
  name: "Goerli",
  baseAsset: ETH,
  chainID: "5",
  family: "EVM",
}

export const KOVAN: EVMNetwork = {
  name: "Kovan",
  baseAsset: ETH,
  chainID: "42",
  family: "EVM",
}

export const BITCOIN: BTCNetwork = {
  name: "Bitcoin",
  baseAsset: BTC,
  family: "BTC",
}

export const BITCOINCASH: BTCNetwork = {
  name: "Bitcoin Cash",
  baseAsset: BCH,
  family: "BTC",
}

export const NETWORKS = [ETHEREUM, BITCOIN]
