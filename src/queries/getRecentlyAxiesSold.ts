import axios from "axios";
import { AXIE_INFINITY_MARKETPLACE_GRAPHQL_API_URL } from "../config";
import { Class, Part } from "./types";

type GetRecentlyAxiesSoldArgs = {
  from?: number;
  size?: number;
};

type TransferRecord = {
  txHash?: string;
  timestamp?: number;
  withPrice?: string;
  withPriceUsd?: string;
  from?: string;
  to?: string;
};

export type Axie = {
  id?: string;
  genes?: string;
  class?: Class;
  breedCount?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  stage?: 1 | 4;
  title: string;
  battleInfo?: {
    banned?: boolean;
  };
  parts: [Part, Part, Part, Part, Part, Part];
  transferHistory?: {
    results?: TransferRecord[];
  };
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
      title
      __typename
      battleInfo {
        banned
        __typename
      }
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
