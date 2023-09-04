import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Presets, Client } from 'userop';
import t_abi from '../erc20abi.json';
import n_abi from '../erc721abi.json';

const token_add = '0x39a5Af9B84c13C3a14E94354e2899201a45f51D2';
const nft_add = '0x18d0BEA129d017D024c26E4AF1a858E5572646a6';

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
      const destination_add = '0x29Ba2A9eC1E3e1D80AFd85830a741d8D53B0eeb6';
      // destination_add : 토큰 받을 주소
      const mint = {
        to: token_add, // 컨트렉트 주소
        value: ethers.constants.Zero,
        data: t_c.interface.encodeFunctionData('t_mint', [destination_add]), // 여기 들어감
      };

      console.log('set token mint');

      builder.executeBatch([mint]);
      // mint 에러남 , [mint] 에러남
      // [] {} 차이체크

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
      const destination_add = '0x97b54C834A814aaeEAa8C1DBeD2512a18138C8Ad';
      // destination_add : NFT 받을 주소
      const mint = {
        to: nft_add, // 컨트렉트 주소
        value: ethers.constants.Zero,
        data: n_c.interface.encodeFunctionData('mint', [destination_add]), // 여기 들어감
      };

      console.log('set nft mint');

      builder.executeBatch([mint]);
      // mint 에러남 , [mint] 에러남
      // [] {} 차이체크

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
