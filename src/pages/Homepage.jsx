import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useStateContext } from '../context'
import DisplayCampaigns from '../components/DisplayCampaigns'

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const {address,contract,getCampaigns} = useStateContext()

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getCampaigns()
    console.log(data);
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if(contract){
      fetchCampaigns()
    }
  }, [address,contract])
  

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Homepage