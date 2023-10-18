import { setWalletPrivateKey, useWalletPrivateKey } from '@/context/wallet'
import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function WalletPrivateKeyInput() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const { privateKey, isHydrated } = useWalletPrivateKey()

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
          disabled={!isHydrated}
          value={privateKey}
          onChange={(e) => setWalletPrivateKey(e.target.value)}
          required
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-500 border-solid rounded-md p-2 border-co"
          placeholder={isHydrated ? 'Enter private key' : 'Loading...'}
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
            {isPasswordVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </svg>
        </div>
      </div>
    </div>
  )
}
