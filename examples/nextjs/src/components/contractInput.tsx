import { setContractAddress, useContractAddress } from '@/context/contractAddress'

export function ContractAddressInput() {
  const {
    input: { contractAddress, isHydrated },
  } = useContractAddress()
  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor="privateKey" className="block text-sm font-medium text-gray-700">
        Edition Contract Address
      </label>
      <div className="relative rounded-md shadow-sm w-[300px]">
        <input
          id="contractAddress"
          name="contractAddress"
          type={'text'}
          disabled={!isHydrated}
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          required
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-500 border-solid rounded-md p-2 border-co"
          placeholder={isHydrated ? 'Enter edition contract address' : 'Loading...'}
        />
      </div>
    </div>
  )
}
