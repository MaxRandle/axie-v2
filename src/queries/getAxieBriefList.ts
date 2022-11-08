import axios from "axios";
import { AXIE_INFINITY_MARKETPLACE_GRAPHQL_API_URL } from "../config";
import { Axie } from "./types";

type AuctionType = "All" | "Sale" | "NotForSale";
type SortBy = "PriceAsc" | "PriceDesc" | "IdAsc" | "IdDesc" | "Latest";

type AxieSearchCriteria = {
  stages?: 1 | 4;
  breedCount?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  numMystic?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

type getAxieBriefListArgs = {
  auctionType?: AuctionType;
  sort?: SortBy;
  from?: number;
  size?: number;
  criteria?: AxieSearchCriteria;
  owner?: string;
};

export const getAxieBriefList = async (args: getAxieBriefListArgs) =>
  axios.post<Axie[]>(AXIE_INFINITY_MARKETPLACE_GRAPHQL_API_URL, {
    variables: args,
    query: `
    query GetAxieBriefList(
      $auctionType: AuctionType
      $criteria: AxieSearchCriteria
      $from: Int
      $sort: SortBy
      $size: Int
      $owner: String
    ) {
      axies(
        auctionType: $auctionType
        criteria: $criteria
        from: $from
        sort: $sort
        size: $size
        owner: $owner
      ) {
        total
        results {
          ...AxieBrief
          __typename
        }
        __typename
      }
    }
    
    fragment AxieBrief on Axie {
      id
      name
      stage
      class
      breedCount
      image
      title
      battleInfo {
        banned
        __typename
      }
      auction {
        currentPrice
        currentPriceUSD
        __typename
      }
      parts {
        id
        name
        class
        type
        specialGenes
        __typename
      }
      __typename
    }
    `,
  });
