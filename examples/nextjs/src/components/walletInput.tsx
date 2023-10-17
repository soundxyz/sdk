import { setWalletPrivateKey, useWalletPrivateKey } from '@/context/wallet'
import React, { useState } from 'react'

export function WalletPrivateKeyInput() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const privateKey = useWalletPrivateKey()

  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor="privateKey" className="block text-sm font-medium text-gray-700">
        Wallet Private Key
      </label>
      <div className="relative rounded-md shadow-sm w-[300px]">
        <input
          id="privateKey"
          name="privateKey"
          type={isPasswordVisible ? 'text' : 'password'}
          value={privateKey}
          onChange={(e) => setWalletPrivateKey(e.target.value)}
          required
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-500 border-solid rounded-md p-2 border-co"
          placeholder="Enter private key text-black"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 hover:text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            {isPasswordVisible ? (
              // Eye Slash Icon
              <path
                fillRule="evenodd"
                d="M2.003 5.884l1.215 1.215a8 8 0 0111.348 11.348l1.215 1.215a1 1 0 101.414-1.414l-15-15a1 1 0 00-1.414 1.414l.622.622A10 10 0 000 10c1.528 2.977 4.356 5.328 7.535 6.292a2 2 0 11-1.23 1.074A9.997 9.997 0 012.003 5.884zM4.566 4.292a2 2 0 012.977-2.977l1.263 1.263a4 4 0 015.096 5.096l1.263 1.263a2 2 0 11-2.977 2.977l-7.72-7.72zM7 10a3 3 0 00-.072.876l.895.895a3 3 0 00.072-1.77l-.895-.896z"
                clipRule="evenodd"
              />
            ) : (
              // Eye Icon
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 016.154 13.881l-1.581-1.582a5 5 0 00-6.987-6.987L2.119 4.267A8 8 0 0110 2zm0 3a3 3 0 012.083 5.122l-4.201 4.201A3 3 0 0110 5zm0 11a8 8 0 01-5.546-2.148l1.49-1.49a5 5 0 007.11-7.11l1.548-1.548A8 8 0 0110 16z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}
