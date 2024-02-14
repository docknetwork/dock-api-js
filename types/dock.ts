// docs: https://docs.api.dock.io/#tocS_DIDDoc

export type CreateRegistryResponse = {
  id: string;
  data: {
    id: string;
    policy: {
      type: string;
      policy: string[];
      addOnly: boolean;
    };
    type: string;
  };
};

export type JobStatus = "finalized" | "todo" | "in_progress";

export type Job = {
  id: string;
  status: JobStatus;
  result: {
    inBlock: string;
  };
};

export interface JobResult {
  id: string;
  status: JobStatus;
  result: {
    encodedTx: string;
    finishQueryData: any[];
    length: number;
    userData: string;
  };
}

export type Issuer = {
  name: string;
  image: string;
  did: string;
};

export type DidDock = `did:dock:${string}`;

type SubjectObject = { id: string } & Record<string, any>;
/**
 * This is a schema that represents a credential format expected by API caller when issuing a credential.
 *
 */
export type Credential = {
  id?: string;
  context?: Array<string | object>;
  type?: Array<string>;
  subject: SubjectObject | Array<SubjectObject>;
  schema?: string;
  issuer?: DidDock;
  issuanceDate?: string;
  expirationDate?: string;
  status?: object | string;
};
