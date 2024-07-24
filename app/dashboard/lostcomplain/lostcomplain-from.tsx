"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {  LostAndFound } from "@/hooks/LostAndFound-hooks";
import { useChainId } from "wagmi";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/providers/uploadthing";

type ComplaintProp = {
  name : string;
  subOrgId : number;
  walletAddress : string;
  email : string;
  description : string;
  images : string[]
}


export function LostComplainForm() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState<ComplaintProp>({
        name : "",
        subOrgId : 0,
        walletAddress : "",
        email : "",
        description : "",
        images : [],
      });

      const { fileLostComplainbase, fileLostComplainPolygon, isConfirmed, isConfirming } = LostAndFound();
      const isLoading = isConfirming || isSubmitting;

      useEffect(() => {
        if (isConfirmed) {
          toast.dismiss("loading1");
          toast.success("Complaint filed!");
        }
      }, [isConfirmed]);
    
      const chainid = useChainId()
    
      const handleSubmit = () => {

        if (data.subOrgId && data.walletAddress && data.name && data.images && data.email && data.description) {
          setIsSubmitting(true);
                setData({
                  ...data,
                });
                if (chainid == 84532){
                  fileLostComplainbase({
                    name : data.name,
                    subOrgId : data.subOrgId,
                    walletAddress : data.walletAddress,
                    email : data.email,
                    description : data.description,
                    images : data.images,
                });
                }else{
                  fileLostComplainPolygon({
                    name : data.name,
                    subOrgId : data.subOrgId,
                    walletAddress : data.walletAddress,
                    email : data.email,
                    description : data.description,
                    images : data.images,
                });
                }
            setIsSubmitting(false);
        }
      };

  return (
    <div>
        <div className=" my-1">
              <Label>Title:</Label>
                <Input 
                type="text" 
                placeholder="title of complain" 
                onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                value={data.name}
                />
        </div>
        <div className=" my-1">
              <Label>SubOrg Id:</Label>
                <Input 
                type="number" 
                placeholder="SubOrg Id" 
                onChange={(e) => {
                    setData({ ...data, subOrgId: Number(e.target.value) });
                  }}
                value={data.subOrgId}
                />
        </div>
        <div className=" my-1">
              <Label>Wallet Address:</Label>
                <Input 
                type="text" 
                placeholder="0x..." 
                onChange={(e) => {
                    setData({ ...data, walletAddress: e.target.value });
                  }}
                value={data.walletAddress}
                />
        </div>
        <div className=" my-1">
              <Label>Email Address:</Label>
                <Input 
                type="text" 
                placeholder="abc@gmail.com" 
                onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                value={data.email}
                />
        </div>
        <div className=" my-1">
              <Label>Description:</Label>
                <Textarea 
                placeholder="More details here." 
                onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                value={data.description}
                />
        </div>
        <div className=" my-1">
              <Label>Images</Label>
              <div className=" max-w-40">
                <UploadDropzone
                    endpoint="imageUploader"
                    onDrop={(acceptedFiles) => {
                      // Do something with the accepted files
                      toast.loading(`${acceptedFiles.length} photo added`)
                      console.log("Accepted files: ", acceptedFiles);
                    }}
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      toast.success(`${res.length} photo uploaded`)

                      const regex = /"url":\s*"([^"]+)"/g;
                      const jsonString = JSON.stringify(data);
                      let urls = [];
                      let match;

                      while ((match = regex.exec(jsonString)) !== null) {
                          urls.push(match[1]);
                      }

                      setData({ ...data, images: urls});
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      toast.error("Photos not uploaded")
                    }}
                />
                </div>
        </div>

        <Button type="button" disabled={isLoading} onClick={handleSubmit} className=" my-1">Create SubOrg</Button>
    </div>
  )
}