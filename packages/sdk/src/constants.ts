export function loginMessageToSign(nonce: number | string) {
  return `Welcome to Sound!\n\nApprove this message to securely log in. \n\nnonce: ${nonce}`
}
