import BlocknativeSdk from "bnc-sdk"

import { EthereumTransactionData } from "./types"

export const BlocknativeNetworkIds = {
  ethereum: {
    mainnet: 1,
  },
}

// TODO Improve code to clearly discriminate between Bitcoin and
// TODO Ethereum---either top-level or inside the instance.

/**
 * The Blocknative class wraps access to the Blocknative API for the Tally
 * extension backend. It exposes Tally-specific functionality, and manages
 * connection and disconnection from Blocknative based on registered needs and
 * feedback from the Blocknative system to minimize usage when possible.
 */
export default class Blocknative {
  private blocknative: BlocknativeSdk

  static connect(apiKey: string, networkId: number): Blocknative {
    const connection = new this(apiKey, networkId)

    return connection
  }

  private constructor(apiKey: string, networkId: number) {
    // TODO Handle lazy connection, disconnects, resubscribing, rate limits,
    // TODO etc.
    this.blocknative = new BlocknativeSdk({
      dappId: apiKey,
      networkId,
    })
  }

  watchBalanceUpdatesFor(
    accountAddress: string,
    handler: (
      transactionData: EthereumTransactionData,
      balanceDelta: bigint
    ) => void
  ): void {
    // TODO Centralize handling of txConfirmed.
    this.blocknative
      .account(accountAddress)
      .emitter.on("txConfirmed", (transactionData) => {
        if (
          "system" in transactionData &&
          transactionData.system === "ethereum" // not Bitcoin or a log
        ) {
          const transaction = transactionData as EthereumTransactionData

          const balanceDelta = transaction.netBalanceChanges
            ?.filter(({ address }) => address.toLowerCase() === accountAddress)
            .flatMap(({ balanceChanges }) => balanceChanges)
            .filter(({ asset: { type: assetType } }) => assetType === "ether")
            .reduce(
              (ethBalanceChangeDelta, { delta }) =>
                ethBalanceChangeDelta + BigInt(delta),
              0n
            )

          if (balanceDelta) {
            // Only if there is a balance delta to report.
            handler(transaction, balanceDelta)
          }
        }
      })
  }

  unwatchBalanceUpdatesFor(accountAddress: string): void {
    // TODO After centralizing handling, handle overall unsubscribing through
    // that mechanism.
    this.blocknative.account(accountAddress).emitter.off("txConfirmed")
    this.blocknative.unsubscribe(accountAddress)
  }
}