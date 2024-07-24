import { abi } from "@/artifacts/contracts/LostAndFound.sol/LostAndFound.json";
import { wagmiClient } from "@/configs/wagmi.config";
import { useState } from "react";
import toast from "react-hot-toast";
import { getAddress } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";


   const chainPolygon =  "0xE29108C44852905d8751D8f3135466D6d9ac4237"
   const chainBase = "0x6391425E87f1297A67aC5ed3C75957207451BC3A"

 type Complaint = {
    name : string;
    subOrgId : number;
    walletAddress : string;
    email : string;
    description : string;
    images : string[];
}

type SubOrganization = {
    subOrgId : number;
    admins : string[];
    name : string;
}

export const LostAndFound = () => {
    const { address, isConnected } = useAccount({
        config: wagmiClient,
      });
    
    const { writeContract, data: hash } = useWriteContract({
        config: wagmiClient,
      });
    
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
          hash: hash!,
        });

    const [isSending, setIsSending] = useState(false);
    const [confirming, setConfirming] = useState(false);

    const createSubOrganizationPolygon = ({ subOrgId, admins, name }: SubOrganization) => {
        setIsSending(true);
        writeContract(
          {
            abi: abi,
            address: getAddress(chainPolygon!),
            functionName: "createSubOrganization",
            args: [subOrgId, admins, name],
          },
          {
            onSuccess: () => {
              toast.loading("Sub Org Created! Waiting for confirmation.", {
                id: "loading1",
              });
              setIsSending(false);
              if (setConfirming) {
                setConfirming(true);
              }
            },
            onError: () => {
              setIsSending(false);
              toast.error("Transaction Failed! Try Again.");
            },
          }
        );
      };
    const createSubOrganizationBase = ({ subOrgId, admins, name }: SubOrganization) => {
        setIsSending(true);
        writeContract(
          {
            abi: abi,
            address: getAddress(chainBase!),
            functionName: "createSubOrganization",
            args: [subOrgId, admins, name],
          },
          {
            onSuccess: () => {
              toast.loading("Sub Org Created! Waiting for confirmation.", {
                id: "loading1",
              });
              setIsSending(false);
              if (setConfirming) {
                setConfirming(true);
              }
            },
            onError: () => {
              setIsSending(false);
              toast.error("Transaction Failed! Try Again.");
            },
          }
        );
      };

      
    const updateSubOrganizationAdminsPolygon = ({ subOrgId, admins }: SubOrganization) => {
        setIsSending(true);
        writeContract(
          {
            abi: abi,
            address: getAddress(chainPolygon!),
            functionName: "updateSubOrganizationAdmins",
            args: [ subOrgId, admins ],
          },
          {
            onSuccess: () => {
              toast.loading("Sub Org Updated! Waiting for confirmation.", {
                id: "loading1",
              });
              setIsSending(false);
              if (setConfirming) {
                setConfirming(true);
              }
            },
            onError: () => {
              setIsSending(false);
              toast.error("Transaction Failed! Try Again.");
            },
          }
        );
      };

    const updateSubOrganizationAdminsBase = ({ subOrgId, admins  }: SubOrganization) => {
        setIsSending(true);
        writeContract(
          {
            abi: abi,
            address: getAddress(chainBase!),
            functionName: "updateSubOrganizationAdmins",
            args: [ subOrgId, admins ],
          },
          {
            onSuccess: () => {
              toast.loading("Sub Org Updated! Waiting for confirmation.", {
                id: "loading1",
              });
              setIsSending(false);
              if (setConfirming) {
                setConfirming(true);
              }
            },
            onError: () => {
              setIsSending(false);
              toast.error("Transaction Failed! Try Again.");
            },
          }
        );
      };


    const fileLostComplainPolygon = ({ name, subOrgId, walletAddress, email, description, images }: Complaint) => {
        setIsSending(true);
        writeContract(
          {
            abi: abi,
            address: getAddress(chainPolygon!),
            functionName: "fileLostComplaint",
            args: [ name, subOrgId, walletAddress, email, description, images],
          },
          {
            onSuccess: () => {
              toast.loading("Lost Complain Registered! Waiting for confirmation.", {
                id: "loading1",
              });
              setIsSending(false);
              if (setConfirming) {
                setConfirming(true);
              }
            },
            onError: (error) => {
              console.log(error)
              setIsSending(false);
              toast.error("Transaction Failed! Try Again.");
            },
          }
        );
      };
    const fileLostComplainbase = ({ name, subOrgId, walletAddress, email, description, images }: Complaint) => {
        setIsSending(true);
        writeContract(
          {
            abi: abi,
            address: getAddress(chainBase!),
            functionName: "fileLostComplaint",
            args: [ name, subOrgId, walletAddress, email, description, images],
          },
          {
            onSuccess: () => {
              toast.loading("Lost Complain Registered! Waiting for confirmation.", {
                id: "loading1",
              });
              setIsSending(false);
              if (setConfirming) {
                setConfirming(true);
              }
            },
            onError: () => {
              setIsSending(false);
              toast.error("Transaction Failed! Try Again.");
            },
          }
        );
      };


    const fileFoundComplaintPolygon = ({ name, subOrgId, walletAddress, email, description, images }: Complaint) => {
        setIsSending(true);
        writeContract(
          {
            abi: abi,
            address: getAddress(chainPolygon!),
            functionName: "fileFoundComplaint",
            args: [ name, subOrgId, walletAddress, email, description, images],
          },
          {
            onSuccess: () => {
              toast.loading("Found Complain Registered! Waiting for confirmation.", {
                id: "loading1",
              });
              setIsSending(false);
              if (setConfirming) {
                setConfirming(true);
              }
            },
            onError: () => {
              setIsSending(false);
              toast.error("Transaction Failed! Try Again.");
            },
          }
        );
      };
    const fileFoundComplaintBase = ({ name, subOrgId, walletAddress, email, description, images }: Complaint) => {
        setIsSending(true);
        writeContract(
          {
            abi: abi,
            address: getAddress(chainBase!),
            functionName: "fileFoundComplaint",
            args: [ name, subOrgId, walletAddress, email, description, images],
          },
          {
            onSuccess: () => {
              toast.loading("Found Complain Registered! Waiting for confirmation.", {
                id: "loading1",
              });
              setIsSending(false);
              if (setConfirming) {
                setConfirming(true);
              }
            },
            onError: () => {
              setIsSending(false);
              toast.error("Transaction Failed! Try Again.");
            },
          }
        );
      };


    const resolveComplaintPolygon = (complainId : number) => {
        setIsSending(true);
        writeContract(
          {
            abi: abi,
            address: getAddress(chainPolygon!),
            functionName: "resolveComplaint",
            args: [ complainId ],
          },
          {
            onSuccess: () => {
              toast.loading("Resolved Complain! Waiting for confirmation.", {
                id: "loading1",
              });
              setIsSending(false);
              if (setConfirming) {
                setConfirming(true);
              }
            },
            onError: () => {
              setIsSending(false);
              toast.error("Transaction Failed! Try Again.");
            },
          }
        );
      };
    const resolveComplaintBase = (complainId : number) => {
        setIsSending(true);
        writeContract(
          {
            abi: abi,
            address: getAddress(chainBase!),
            functionName: "resolveComplaint",
            args: [ complainId ],
          },
          {
            onSuccess: () => {
              toast.loading("Resolved Complain! Waiting for confirmation.", {
                id: "loading1",
              });
              setIsSending(false);
              if (setConfirming) {
                setConfirming(true);
              }
            },
            onError: () => {
              setIsSending(false);
              toast.error("Transaction Failed! Try Again.");
            },
          }
        );
      };


    const listComplaintsPolygon = ( subOrgId : number) => {

        const { data, isLoading , refetch } = useReadContract({
            abi: abi,
            address: getAddress(chainPolygon!),
            functionName: "listComplaints",
            args: [subOrgId],
            account: address && getAddress(address!),
          });
          return { data: data, isLoading , refetch };
      };
    const listComplaintsBase = ( subOrgId : number) => {

        const { data, isLoading , refetch } = useReadContract({
            abi: abi,
            address: getAddress(chainBase!),
            functionName: "listComplaints",
            args: [subOrgId],
            account: address && getAddress(address!),
          });
          return { data: data, isLoading , refetch };
      };


    const getAdminsPolygon = ( subOrgId : number) => {

        const { data, isLoading , refetch } = useReadContract({
            abi: abi,
            address: getAddress(chainPolygon!),
            functionName: "getAdmins",
            args: [subOrgId],
            account: address && getAddress(address!),
          });
          return { data: data, isLoading , refetch };

    };   
    const getAdminsBase = ( subOrgId : number) => {

        const { data, isLoading , refetch } = useReadContract({
            abi: abi,
            address: getAddress(chainBase!),
            functionName: "getAdmins",
            args: [subOrgId],
            account: address && getAddress(address!),
          });
          return { data: data, isLoading , refetch };

    };   



  return {
    isSending,
    confirming,
    isConfirming,
    isConfirmed,
    hash,
    createSubOrganizationPolygon,
    updateSubOrganizationAdminsPolygon,
    fileLostComplainPolygon,
    fileFoundComplaintPolygon,
    resolveComplaintPolygon,
    listComplaintsPolygon,
    getAdminsPolygon,
    createSubOrganizationBase,
    updateSubOrganizationAdminsBase,
    fileLostComplainbase,
    fileFoundComplaintBase,
    resolveComplaintBase,
    listComplaintsBase,
    getAdminsBase
  };
};