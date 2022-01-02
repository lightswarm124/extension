import { FiatCurrency, FungibleAsset } from "../assets"

export const USD: FiatCurrency = {
  name: "United States Dollar",
  symbol: "USD",
  decimals: 10,
}

export const EUR: FiatCurrency = {
  name: "euro",
  symbol: "EUR",
  decimals: 10,
}

export const CNY: FiatCurrency = {
  name: "renminbi",
  symbol: "CNY",
  decimals: 10,
}

export const FIAT_CURRENCIES = [USD, EUR, CNY]

export const ETH: FungibleAsset = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
  metadata: {
    coinGeckoID: "ethereum",
    tokenLists: [],
    websiteURL: "https://ethereum.org",
  },
}

export const BTC: FungibleAsset = {
  name: "Bitcoin",
  symbol: "BTC",
  decimals: 8,
  metadata: {
    coinGeckoID: "bitcoin",
    tokenLists: [],
    websiteURL: "https://bitcoin.org",
  },
}

export const BCH: FungibleAsset = {
  name: "Bitcoin Cash",
  symbol: "BCH",
  decimals: 8,
  metadata: {
    coinGeckoID: "bitcoin-cash",
    tokenLists: [],
    websiteURL: "https://bitcoincash.org/",
  },
}

export const BASE_ASSETS = [ETH, BTC, BCH]

export const BASE_ASSETS_BY_SYMBOL = BASE_ASSETS.reduce<{
  [assetSymbol: string]: FungibleAsset
}>((acc, asset) => {
  const newAcc = {
    ...acc,
  }
  newAcc[asset.symbol] = asset
  return newAcc
}, {})
