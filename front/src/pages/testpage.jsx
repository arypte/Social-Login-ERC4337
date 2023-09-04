import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Presets, Client } from 'userop';
import t_abi from '../erc20abi.json';
import n_abi from '../erc721abi.json';

const token_add = '';
const nft_add = '';

const TestPage = () => {
  const signingKey = process.env.REACT_APP_SIGNING_KEY;
  const rpcUrl = process.env.REACT_APP_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_RPC_URL
  );
  const t_c = new ethers.Contract(token_add, t_abi, provider);
  const n_c = new ethers.Contract(nft_add, n_abi, provider);
  const [signer, setSigner] = useState();
  const [builder, setBuilder] = useState();

  const connect = async () => {
    const t_signer = new ethers.Wallet(signingKey);
    setSigner(t_signer);

    const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
      process.env.REACT_APP_PAYMASTER_URL,
      {
        type: 'payg',
      }
    );

    const t_builder = await Presets.Builder.Kernel.init(t_signer, rpcUrl, {
      paymasterMiddleware: paymasterMiddleware,
    });
    setBuilder(t_builder);
  };

  const t_mint = async () => {
    try {
      const destination_add = '';
      
      const mint = {
        to: token_add, // 컨트렉트 주소
        value: ethers.constants.Zero,
        data: t_c.interface.encodeFunctionData('t_mint', [destination_add]),
      };

      console.log('set token mint');

      builder.executeBatch([mint]);

      console.log('set builder');

      // Send the user operation
      const client = await Client.init(rpcUrl);
      const res = await client.sendUserOperation(builder, {
        onBuild: (op) => console.log('Signed UserOperation :', op),
      });
      console.log(`UserOPHash: ${res.userOpHash}`);
      console.log('Waiting for transaction...');
      const ev = await res.wait();
      console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
    } catch (error) {
      console.log(error);
    }
  };

  const n_mint = async () => {
    try {
      const destination_add = '';
      
      const mint = {
        to: nft_add, 
        value: ethers.constants.Zero,
        data: n_c.interface.encodeFunctionData('mint', [destination_add]), 
      };

      console.log('set nft mint');

      builder.executeBatch([mint]);

      console.log('set builder');

      const client = await Client.init(rpcUrl);
      const res = await client.sendUserOperation(builder, {
        onBuild: (op) => console.log('Signed UserOperation :', op),
      });
      console.log(`UserOPHash: ${res.userOpHash}`);
      console.log('Waiting for transaction...');
      const ev = await res.wait();
      console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connect();
    console.log('ok');
    // console.log( process.env.)
    console.log( process.env.REACT_APP_SIGNING_KEY ) ;
    console.log( process.env.REACT_APP_RPC_URL ) ;
    console.log( process.env.REACT_APP_PAYMASTER_URL ) ;
  }, []);

  return (
    <div className="w-[640px] min-h-screen flex flex-col justify-center items-center">
      <button onClick={t_mint}> T_Mint_No_Gas </button>
      <button onClick={n_mint}> N_Mint_No_Gas </button>
    </div>
  );
};

export default TestPage;
