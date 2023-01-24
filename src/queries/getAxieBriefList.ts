import axios from "axios";
import { AXIE_INFINITY_MARKETPLACE_GRAPHQL_API_URL } from "../config";
import { Class, Part } from "./types";

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

type Axie = {
  id?: string;
  genes?: string;
  class?: Class;
  breedCount?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  stage?: 1 | 4;
  title: string;
  parts?: [Part, Part, Part, Part, Part, Part];
  auction: {
    startingPrice?: string;
    endingPrice?: string;
    startingTimestamp?: number;
    endingTimestamp?: number;
  };
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
        startingPrice
        endingPrice
        startingTimestamp
        endingTimestamp
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
