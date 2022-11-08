import {
  getAxieBriefList,
  getAxieLatest,
  getRecentlyAxiesSold,
} from "./queries";

const getRecentTransferRecords = async () => {
  const recentAxieSales = await getRecentlyAxiesSold({
    from: 0,
    size: 100,
  });

  const recentTransferRecords =
    recentAxieSales.data.data.settledAuctions.axies.results?.map((axie) => ({
      txHash: axie.transferHistory?.results?.[0].txHash,
      timestamp: axie.transferHistory?.results?.[0].timestamp,
      withPrice: axie.transferHistory?.results?.[0].withPrice,
      withPriceUsd: axie.transferHistory?.results?.[0].withPriceUsd,
      parts: axie.parts,
      axieId: axie.id,
    }));

  return recentTransferRecords;
};

const main = async () => {
  const recentTransferRecords = await getRecentTransferRecords();

  console.log(recentTransferRecords[0].parts);
};

main();
