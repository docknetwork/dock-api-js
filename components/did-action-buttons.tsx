"use client";
import { Button } from "./ui/button";
import { registryFlow } from "@/workflows/registryFlow";

export const DIDActionButtons = ({ id }: any) => {
  console.log(id);

  return (
    <Button type="submit" onClick={registryFlow}>
      Issue a revocable credential
    </Button>
  );
};
