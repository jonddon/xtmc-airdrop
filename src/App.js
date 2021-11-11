import * as ethers from 'ethers'
import { useEthers } from '@usedapp/core'
import './App.css';
import xtmcClaimAbi from './abi/xtmcClaimAbi.json'
import { useState } from 'react';
//Get the deployed Contract Address on BSC
const xtmcClaimAddress = "0x62F610816e9A5EDfCE8c3376d3ec381842f6D44A"


function App() {

  const { activateBrowserWallet, account, deactivate, chainId
  } = useEthers()
  const [Errors, setErrors] = useState("");
  const [Success, setSuccess] = useState("")

  const claim = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(xtmcClaimAddress, xtmcClaimAbi, signer)
      try {
        const data = await contract.claim()
        if (data) {
          // console.log('data: ', data)
          setSuccess("Successfully Claimed your Airdrop")
        }

      } catch (errors) {
        setErrors(errors.data.message)
        // console.log("Error: ", errors.data.message)
      }
    }
    // console.log("claimed called");
  }

  return (
    <div className='container-fluid mt-2'>
      <div className="row">
        <div className="col-lg-9 col-sm-6 col-md-8">
          <h1 className='title'>
            XTMC SWAP
          </h1>
        </div>
        <div className="col-lg-3 col-sm-6 col-md-4">
          {!account && <button className='btn btn-custom' onClick={activateBrowserWallet}> Connect </button>}
          {account && <div>
            <span className='account'>{account.slice(0, 8)} </span>
            <button className='btn btn-custom' onClick={deactivate}> Disconnect </button>
          </div>}

        </div>
        <div className="col-lg-12">
          {chainId !== 56 && <div className="alert alert-danger text-center" role="alert">
            Please connect to Binance smart chain
          </div>}
          {Errors !== "" && <div className="alert alert-danger text-center" role="alert">
            {Errors}
          </div>}

          {Success !== "" && <div className="alert alert-danger text-center" role="alert">
            {Success}
          </div>}
        </div>
      </div>

      <div className="row full-height">
        <div className="col-lg-10 offset-lg-1 text-center">
          <h1 className='title py-4'>
            Claim Your Airdrop
          </h1>
          <button className='btn btn-custom px-4' onClick={claim} > Claim </button>
        </div>
      </div>

    </div>
  )
}

export default App;
