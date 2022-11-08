import axios from "axios";
import { AXIE_INFINITY_MARKETPLACE_GRAPHQL_API_URL } from "../config";
import { Axie } from "./types";

type GetRecentlyAxiesSoldArgs = {
  from?: number;
  size?: number;
};

type GetRecentlyAxiesSoldReturn = {
  data: {
    settledAuctions: {
      axies: {
        total: number;
        results: Axie[];
      };
    };
  };
};

export const getRecentlyAxiesSold = async (args: GetRecentlyAxiesSoldArgs) =>
  axios.post<GetRecentlyAxiesSoldReturn>(
    AXIE_INFINITY_MARKETPLACE_GRAPHQL_API_URL,
    {
      variables: args,
      query: `
    query GetRecentlyAxiesSold($from: Int, $size: Int) {
      settledAuctions {
        axies(from: $from, size: $size) {
          total
          results {
            ...AxieSettledBrief
            transferHistory {
              ...TransferHistoryInSettledAuction
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
    }
    
    fragment AxieSettledBrief on Axie {
      id
      class
      breedCount
      __typename
      parts {
        id
        class
        type
        specialGenes
      }
    }
    
    fragment TransferHistoryInSettledAuction on TransferRecords {
      total
      results {
        ...TransferRecordInSettledAuction
        __typename
      }
      __typename
    }
    
    fragment TransferRecordInSettledAuction on TransferRecord {
      from
      to
      txHash
      timestamp
      withPrice
      withPriceUsd
      __typename
    }
    `,
    }
  );
