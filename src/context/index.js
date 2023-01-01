import React,{useContext,createContext} from 'react'
import {useAddress,useContract,useMetamask,useContractWrite} from "@thirdweb-dev/react"
import {ethers} from "ethers"

const StateContext = createContext()

export const StateProvider = ({children})=>{
    const {contract} = useContract("0x16146d8Dd240f35Fcc0600eE685F253DE34d56f2")
    const { mutateAsync: createCampaign } = useContractWrite(contract,'createCampaign')
    const address = useAddress()
    const connect = useMetamask()

    const publishCampaign =async(form) =>{
        try {
                const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
                ])
                console.log("contract call successful",data);
        } catch (error) {
            throw new Error("Error publishing campaign",error)
        }
    }

    const getCampaigns = async() =>{
        const camapigns = await contract.call('getCampaigns')
        console.log(camapigns);
        const parsedCampaigns = camapigns.map((campaign,i)=>{
            return(
                { owner:campaign.owner,
                 title: campaign.title,
                 description:campaign.description,
                 target:ethers.utils.formatEther(campaign.target.toString()),
                 deadline: campaign.deadline.toNumber(),
                 amountCollected : ethers.utils.formatEther(campaign.amountCollected.toString()),
                 image:campaign.image,
                 pid:i
                }
            )
        })
        return parsedCampaigns;
    }

    const getUserCampaigns = async() =>{
        const allCampaigns = await getCampaigns()
        const userCampaigns = allCampaigns.filter(campaign=>campaign.owner === address)
        return userCampaigns;
    }

    const donate = async(pid,amount) =>{
        const data = await contract.call('donateToCampaign',pid,{value:ethers.utils.parseEther(amount)})
        return data;
    }

    const getDonations = async(pid)=>{
        const donations = await contract.call('getDonations',pid)
        const numberOfDonations = donations[0].length;
        const parsedDonations = [];
        for(let i=0;i<numberOfDonations;i++){
            parsedDonations.push({
                donor:donations[0][i],
                donation:ethers.utils.formatEther(donations[1][i].toString())
            })
        }
        return parsedDonations;
    }

    return(
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign:publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () =>useContext(StateContext)