import { getBitcoinNetwork } from "../../../lib/utils"
import {
  BCHBlock,
  // Vin,
  // Vout,
  BCHTransaction,
} from "../../../networks"

export function blockFromBCHBlock(bchResult: BCHBlock): BCHBlock {
  return {
    hash: bchResult.hash,
    previousblockhack: bchResult.previousblockhack,
    difficulty: bchResult.difficulty,
    height: bchResult.height,
    time: bchResult.time,
    network: getBitcoinNetwork(),
  }
}

export function transactionFromBCHTransaction(
  transaction: BCHTransaction
): BCHTransaction {
  return {
    blockhash: transaction.blockhash,
    blocktime: transaction.blocktime,
    confirmations: transaction.confirmations,
    hash: transaction.hash,
    vin: transaction.vin,
    vout: transaction.vout,
    network: getBitcoinNetwork(),
  }
}
