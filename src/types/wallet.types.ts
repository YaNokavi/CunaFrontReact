export interface IWalletToken {
  name: string;
  symbol: string;
  iconUrl: string;
  amount: number;
  amountInUsd: number;
}

export interface IWalletInfo {
  address: string;
  tokens: IWalletToken[];
}
