import { WEI_ETH } from "../constants";
import AxieSettledAuction, {
  AxieSettledAuctionType,
} from "../models/AxieSettledAuction";
import { Axie, getRecentlyAxiesSold } from "../queries";

const SIZE = 100;

export const getRecentLiveAuctions = async () => {
  console.log("recent sales - START");

  try {
    // delete old sales
    const maxAgeInMilliseconds = 3 * 24 * 60 * 60 * 1000;
    const dateThreshold = new Date(new Date().valueOf() - maxAgeInMilliseconds);

    const deleted = await AxieSettledAuction.deleteMany({
      timestampInMilliseconds: { $lt: dateThreshold },
    });

    console.log("recent sales - DELETED:", deleted.deletedCount);

    // fetch new sales
    const response = await getRecentlyAxiesSold({
      from: 0,
      size: SIZE,
    });

    const recentSales = response.data.data.settledAuctions.axies.results;

    // filter out bad sales
    const filteredSales = recentSales.filter(filterAxieSale);

    const recentTransferRecords: AxieSettledAuctionType[] = filteredSales?.map(
      (axie) => {
        const partObj = axie.parts.reduce((acc, part) => {
          let key: string;
          if (part.type === "Eyes") key = "eyes";
          else if (part.type === "Ears") key = "ears";
          else if (part.type === "Back") key = "back";
          else if (part.type === "Horn") key = "horn";
          else if (part.type === "Mouth") key = "mouth";
          else if (part.type === "Tail") key = "tail";
          else throw new Error(`unknown part type: ${part.type}`);

          return {
            ...acc,
            [key]: part.id,
          };
        }, {}) as {
          eyes: string;
          ears: string;
          back: string;
          mouth: string;
          horn: string;
          tail: string;
        };

        return {
          txHash: axie.transferHistory?.results?.[0].txHash,
          timestampInMilliseconds: new Date(
            axie.transferHistory?.results?.[0].timestamp * 1000
          ),
          withPrice: axie.transferHistory?.results?.[0].withPrice,
          withPriceUsd: axie.transferHistory?.results?.[0].withPriceUsd,
          axieId: axie.id,
          class: axie.class,
          breedCount: axie.breedCount,
          parts: partObj,
        };
      }
    );

    const alreadyExistingHashes = (
      await AxieSettledAuction.find({
        txHash: { $in: recentTransferRecords.map((record) => record.txHash) },
      })
    ).map((x) => x.txHash);

    const notExistingSettledAuctions = recentTransferRecords.filter(
      (record) => !alreadyExistingHashes.includes(record.txHash)
    );

    const newRecords =
      await AxieSettledAuction.insertMany<AxieSettledAuctionType>(
        notExistingSettledAuctions
      );

    console.log("recent sales - INSERTED:", newRecords.length);
  } catch (err) {
    console.error(err);
  }
  console.log("recent sales - END");
};

const filterAxieSale = (axie: Axie) => {
  // adults only
  if (axie.stage !== 4) {
    return false;
  }

  // no origin axies
  if (Number(axie.id) < 10000) {
    return false;
  }

  // no special event axies
  if (
    axie.title === "Origin" ||
    axie.title === "MEO Corp" ||
    axie.title === "MEO Corp II"
  ) {
    return false;
  }

  // no special parts
  const hasSpecialPart = axie.parts?.some((part) => part.specialGenes);
  if (hasSpecialPart) {
    return false;
  }

  // no banned axies
  if (axie.battleInfo.banned) {
    return false;
  }

  // no price outliers above 1 eth
  if (Number(axie?.transferHistory?.results?.[0].withPrice) > 1 * WEI_ETH) {
    return false;
  }

  return true;
};
