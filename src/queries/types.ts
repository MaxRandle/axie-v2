type Class =
  | "Beast"
  | "Aquatic"
  | "Plant"
  | "Bird"
  | "Bug"
  | "Reptile"
  | "Mech"
  | "Dawn"
  | "Dusk";

type Part = {
  id: string;
  class: Class;
  type?: "Eyes" | "Ears" | "Back" | "Mouth" | "Horn" | "Tail";
  specialGenes?: string | null;
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
  parts?: [Part, Part, Part, Part, Part, Part];
  transferHistory?: {
    results?: TransferRecord[];
  };
};
