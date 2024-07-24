"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LostAndFound } from "@/hooks/LostAndFound-hooks";
import { useChainId } from "wagmi";
import { Label } from "@/components/ui/label";

export type subOrgType = {
    subOrgId: number;
    admins: string[];
    name: string;
  };

export function EditSubForm() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState<subOrgType>({
        subOrgId: 0,
        admins: [],
        name: "",
      });

      const { updateSubOrganizationAdminsBase, updateSubOrganizationAdminsPolygon, isConfirmed, isConfirming } = LostAndFound();
      const isLoading = isConfirming || isSubmitting;

      useEffect(() => {
        if (isConfirmed) {
          toast.dismiss("loading1");
          toast.success("Suborg Created!");
        }
      }, [isConfirmed]);
    
      const chainid = useChainId()
    
      const handleSubmit = () => {

        if (data.subOrgId && data.admins && data.name) {
          setIsSubmitting(true);
                setData({
                  ...data,
                });
                if (chainid == 84532){
                  updateSubOrganizationAdminsBase({
                    subOrgId: data.subOrgId,
                    admins: data.admins,
                    name : data.name,
                });
                }else{
                  updateSubOrganizationAdminsPolygon({
                    subOrgId: data.subOrgId,
                    admins: data.admins,
                    name : data.name,
                });
                }
            setIsSubmitting(false);
        }
      };

  return (
    <div>
        <div className=" my-1">
              <Label>Id</Label>
                <Input 
                type="number" 
                placeholder="SubOrg Id" 
                onChange={(e) => {
                    setData({ ...data, subOrgId: Number(e.target.value) });
                  }}
                value={data.subOrgId}
                />
              <p className="text-sm text-muted-foreground">
                This is the ID of Sub Organization
              </p>
        </div>

        <div className=" my-1">
              <Label>Admins Adresses</Label>
                <Input 
                type="text" 
                placeholder="0x..." 
                onChange={(e) => {
                    setData({ ...data, admins: e.target.value.split(",") });
                  }}
                value={data.admins}
                />
              <p className="text-sm text-muted-foreground">
                These will be the new adresses of admins
              </p>
        </div>

        <div className=" my-1">
              <Label>Name of sub Org</Label>
                <Input 
                type="text" 
                placeholder="SubOrg name" 
                onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                value={data.name}
                />
              <p className="text-sm text-muted-foreground">
                This is the Name of Sub Organization
              </p>
        </div>
    
        <Button type="button" disabled={isLoading} onClick={handleSubmit} className=" my-1">Create SubOrg</Button>
    </div>
  )
}