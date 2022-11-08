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

type GetAxieLatestArgs = {
  auctionType?: AuctionType;
  criteria?: AxieSearchCriteria;
  from?: number;
  sort?: SortBy;
  size?: number;
  owner?: string;
};

export const getAxieLatest = async (args: GetAxieLatestArgs) =>
  axios.post<Axie[]>(AXIE_INFINITY_MARKETPLACE_GRAPHQL_API_URL, {
    variables: args,
    query: `
    query GetAxieLatest(
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
          ...AxieRowData
          __typename
        }
        __typename
      }
    }
    
    fragment AxieRowData on Axie {
      id
      image
      class
      name
      genes
      owner
      class
      stage
      title
      breedCount
      level
      parts {
        ...AxiePart
        __typename
      }
      stats {
        ...AxieStats
        __typename
      }
      auction {
        ...AxieAuction
        __typename
      }
      __typename
    }
    
    fragment AxiePart on AxiePart {
      id
      name
      class
      type
      specialGenes
      stage
      abilities {
        ...AxieCardAbility
        __typename
      }
      __typename
    }
    
    fragment AxieCardAbility on AxieCardAbility {
      id
      name
      attack
      defense
      energy
      description
      backgroundUrl
      effectIconUrl
      __typename
    }
    
    fragment AxieStats on AxieStats {
      hp
      speed
      skill
      morale
      __typename
    }
    
    fragment AxieAuction on Auction {
      startingPrice
      endingPrice
      startingTimestamp
      endingTimestamp
      duration
      timeLeft
      currentPrice
      currentPriceUSD
      suggestedPrice
      seller
      listingIndex
      state
      __typename
    }
    `,
  });
