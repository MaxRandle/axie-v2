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
exports.getAxieDetail = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const getAxieDetail = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.post(config_1.AXIE_INFINITY_MARKETPLACE_GRAPHQL_API_URL, {
        variables: args,
        query: `
    query GetAxieDetail($axieId: ID!) {
      axie(axieId: $axieId) {
        ...AxieDetail
        __typename
      }
    }
    
    fragment AxieDetail on Axie {
      id
      image
      class
      chain
      name
      genes
      owner
      birthDate
      bodyShape
      class
      sireId
      sireClass
      matronId
      matronClass
      stage
      title
      breedCount
      level
      figure {
        atlas
        model
        image
        __typename
      }
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
      ownerProfile {
        name
        __typename
      }
      battleInfo {
        ...AxieBattleInfo
        __typename
      }
      children {
        id
        name
        class
        image
        title
        stage
        __typename
      }
      __typename
    }
    
    fragment AxieBattleInfo on AxieBattleInfo {
      banned
      banUntil
      level
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
});
exports.getAxieDetail = getAxieDetail;
