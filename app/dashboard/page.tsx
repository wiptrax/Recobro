"use client"
import { abi } from "@/artifacts/contracts/LostAndFound.sol/LostAndFound.json";
import { Top } from "@/components/top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LostAndFound } from "@/hooks/LostAndFound-hooks";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { wagmiClient } from "@/configs/wagmi.config";
import { getAddress } from "viem";


type IdType = {
  subOrgId: number;
};

export default function Home() {

  const [Id, setId] = useState<IdType>({
    subOrgId: 0
  });
  const { listComplaintsBase, listComplaintsPolygon  } = LostAndFound();

  const chainid = useChainId()
  const { address, isConnected } = useAccount({
    config: wagmiClient,
  });

  const handleSubmit = async() => {
    if (Id.subOrgId){
          if (chainid == 84532){
            const { data: post, isLoading: isPostLoadong } = listComplaintsBase(Number(Id.subOrgId));
            console.log(post)
          }else{
            const result = await refetch()
            // const { data: post, isLoading: isPostLoadong } = listComplaintsPolygon(Number(Id.subOrgId));
            console.log(result)
            console.log(post)
            if (isError)console.log("err")
          }
    }
}
 
const { post, isError, isLoading, refetch }: any = useReadContract({
  abi : abi,
  address: getAddress("0xE29108C44852905d8751D8f3135466D6d9ac4237"),
  functionName: "listComplaints",
  args: [Id.subOrgId],
})

  return (
    <>
    <Top />
    <div className="hidden space-y-6 p-10 pb-16 md:block max-md:block relative">
        <div className="space-y-0.5">
          <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground text-xl">
            File your complains and see other complains with transparency of blockchain.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-row item-center w-full justify-evenly">

                <Button variant={"outlineRed"}>File Lost Complian</Button>
                <Button variant={"outlineGreen"}>File Found Complian</Button>
            
        </div>

        <Input  
                type="number" 
                placeholder="SubOrg Id" 
                onChange={(e) => {
                    setId({ ...Id ,subOrgId: Number(e.target.value) });
                  }}
                value={Id.subOrgId}
        />
        <Button type="button" onClick={handleSubmit} className=" my-1">Create SubOrg</Button>
    </div>
    </>
  );
}
