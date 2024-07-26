"use client"
import { abi } from "@/artifacts/contracts/LostAndFound.sol/LostAndFound.json";
import { Top } from "@/components/top";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { chainBase, chainPolygon, LostAndFound } from "@/hooks/LostAndFound-hooks";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { wagmiClient } from "@/configs/wagmi.config";
import { getAddress } from "viem";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";



export default function Home() {

  const [ complaintId, setComplainId] = useState<number>(1);
  const [isState, setIsState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resolveComplaintBase, resolveComplaintPolygon, isConfirmed, isConfirming } = LostAndFound();
  const isLoadings = isConfirming || isSubmitting;

  const [contractAddress, setContractAddress] = useState(chainPolygon)

  const chainid = useChainId()
  const { isConnected } = useAccount({
    config: wagmiClient,
  });

  const [complain , setComplain] = useState([{
    complaintNumber: 0,
    name : "",
    subOrgId : 0,
    walletAddress : "",
    email : "",
    description : "",
    images : [],
    isLost: true,
    isResolved: false,
    resolvedBy: ""
  }])

  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss("loading1");
      toast.success("Complaint filed!");
    }
  }, [isConfirmed]);

  const handleState = ( e : number) => {
    setComplainId(e);
    setIsState(true);
        handleResolve()

  }

  const handleResolve = () => {

        if(isState){
            if (chainid == 84532){
              resolveComplaintBase(complaintId);
            }else{
                resolveComplaintPolygon(complaintId);
            }
        setIsSubmitting(false);
        setIsState(false);
        }
  };

useEffect(() => {

  const handleSubmit = async() => {
    if (chainid == 84532){
      setContractAddress(chainBase)
      const result = await refetch()
      const tempdata = await result.data
      setComplain(tempdata)
      console.log(tempdata)
      if (isError)console.log("err")
    }else{
      setContractAddress(chainPolygon)
      const result = await refetch()
      const tempdata = await result.data
      setComplain(tempdata)
      console.log(tempdata)
      if (isError)console.log("err")
    }
}
  handleSubmit()

},[isConnected]) 

const { isError, isLoading, refetch }: any = useReadContract({
  abi : abi,
  address: getAddress(contractAddress!),
  functionName: "listAllComplaints",
  })

  return (
    <>
    <Top />
    <div className="hidden space-y-6 py-5 px-10 pb-16 w-[100vw] md:block max-md:block relative">
        <div className="space-y-0.5">
          <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground text-xl">
            File your complains and see other complains with transparency of blockchain.
          </p>
        </div>
        <Separator className="my-6" />

        {isLoading ? <Spinner /> :<div className="flex flex-wrap gap-5 md:justify-center">
          {complain.map((complain, index) => <Card key={index} className={complain.isLost ? "relative w-[600px] min-w-[450px] bg-red-100" : "relative w-[600px] min-w-[450px] bg-green-100"}>
            <CardHeader className="flex flex-row justify-around">
              <CardTitle className=" flex items-center"><b>Complaint No :</b> {Number(complain.complaintNumber)}</CardTitle>
              {complain.isResolved ? <Image src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/768px-Eo_circle_green_checkmark.svg.png?20200417132424"} alt="tick" width={40} height={40} /> : ""}
            </CardHeader>
            <CardContent>
            <Carousel className="w-4/5 mx-10 flex">
                <CarouselContent className="flex items-center">
                  {complain.images.map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image src={complain.images[index]} width={300} height={200} alt="" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <br />
              <h1 className=" flex"><b>Title : </b>{complain.name}</h1>
              <h1 className=" flex"><b>SubOrg ID :</b>{Number(complain.subOrgId)} </h1>
              <p className=" flex break-all"><b className=" flex-shrink-0">Wallet address :</b> {complain.walletAddress}</p>
              <h1 className=" flex"><b>Email :</b>{complain.email}</h1>
              <p className=" flex "><b className=" flex-shrink-0">Description :</b> {complain.description}</p>

            </CardContent>
            <CardFooter className="flex justify-between gap-5">
              <div>
                <h1 className=" flex"><b>Type :</b> {complain.isLost ? "Lost" : "Found"}</h1>
                <p className="flex break-all">{complain.isResolved ? <><b className=" flex-shrink-0">resolve by :</b>{complain.resolvedBy}</> : "" }</p>
              </div>
              <Button type="button" disabled={isLoadings || complain.isResolved} onClick={() =>  {handleState(Number(complain.complaintNumber)) } } className=" my-1">{complain.isResolved ? "Resolved already" : "Resolve Complain"}</Button>
            </CardFooter>
          </Card>)}
        </div>}

    </div>
    </>
  );
}
