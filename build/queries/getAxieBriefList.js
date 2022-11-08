"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxieBriefList = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const getAxieBriefList = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.post(config_1.AXIE_INFINITY_MARKETPLACE_GRAPHQL_API_URL, {
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
});
exports.getAxieBriefList = getAxieBriefList;
