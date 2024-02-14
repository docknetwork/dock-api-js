"use client";
import { Button } from "./ui/button";
import { registryFlow } from "@/workflows/registryFlow";

export const DIDActionButtons = () => {

  return (
    <Button type="submit" onClick={registryFlow}>
      Issue a revocable credential
    </Button>
  );
};
