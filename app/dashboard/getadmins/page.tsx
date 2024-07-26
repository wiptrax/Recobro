"use client"

import { abi } from "@/artifacts/contracts/LostAndFound.sol/LostAndFound.json";
import { Top } from "@/components/top";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { chainBase, chainPolygon } from "@/hooks/LostAndFound-hooks";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { getAddress } from "viem";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type IdType = {
  subOrgId: number;
};

export default function Home() {

  const [Id, setId] = useState<IdType>({
    subOrgId: 0
  });

  const [contractAddress, setContractAddress] = useState(chainPolygon)

  const chainid = useChainId()

  const handleSubmit = async() => {

          if (chainid == 84532){
            setContractAddress(chainBase)
            const result = await refetch()
            console.log(result)
            console.log(data)
            if (isError)console.log("err")
          }else{
            setContractAddress(chainPolygon)
            const result = await refetch()
            console.log(result)
            console.log(data)
            if (isError)console.log("err")
          }
}
 
const { data, isError, isLoading, refetch }: any = useReadContract({
  abi : abi,
  address: getAddress(contractAddress!),
  functionName: "getAdmins",
  args: [Id.subOrgId],
})


  return (
    <>
    <Top />
    <div className="hidden space-y-6 py-5 px-10 pb-16 md:block max-md:block relative">
        <div className="space-y-0.5">
          <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground text-xl">
            File your complains and see other complains with transparency of blockchain.
          </p>
        </div>
        <Separator className="my-6" />
    <div className=" text-xl font-medium">Get Admins</div>
    <Separator />
        <Label>Enter Sub Oraginzation ID</Label>
        <Input  
                type="number" 
                placeholder="SubOrg Id" 
                onChange={(e) => {
                    setId({ ...Id ,subOrgId: Number(e.target.value) });
                  }}
                value={Id.subOrgId}
        />
        <Button type="button" onClick={handleSubmit} className=" my-1">Get Admins</Button>
    </div>

    {data && 
        <ol className="px-10">
              {data.map((data : any) => (
                <li
                key={data}
                className="justify-start font-extrabold text-xl"
                >
                {data}
                </li>
                ))}
        </ol>}
    </>
  );
}
