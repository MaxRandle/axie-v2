// ----------------------------------------------------------------------------
// API TYPES
// ----------------------------------------------------------------------------

export type Class =
  | "Beast"
  | "Aquatic"
  | "Plant"
  | "Bird"
  | "Bug"
  | "Reptile"
  | "Mech"
  | "Dawn"
  | "Dusk";

export type Part = {
  id: string;
  class: Class;
  type: "Eyes" | "Ears" | "Back" | "Mouth" | "Horn" | "Tail";
  specialGenes: string | null;
};

// ----------------------------------------------------------------------------
// DATABASE TYPES
// ----------------------------------------------------------------------------

// type DbPart = {
//   id: string;
//   class: Class;
// };

// export type AxieSettledAuction = {
//   txHash: string;
//   timestamp: number;
//   withPrice: string;
//   withPriceUsd: string;
//   axieId: string;
//   breedCount?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
//   class?: Class;
//   parts: {
//     eyes: DbPart;
//     ears: DbPart;
//     back: DbPart;
//     mouth: DbPart;
//     horn: DbPart;
//     tail: DbPart;
//   };
// };
