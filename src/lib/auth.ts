
'use client';

import api from './api';
import forge from 'node-forge';

let publicKeyPromise: Promise<string> | null = null;

export async function getPublicKey(): Promise<string> {
  if (publicKeyPromise) {
    return publicKeyPromise;
  }

  publicKeyPromise = new Promise(async (resolve, reject) => {
    try {
      const response = await api.get('/files/applicationpublickey', {
        responseType: 'text',
      });
      if (typeof response.data === 'string' && response.data.startsWith('-----BEGIN PUBLIC KEY-----')) {
        resolve(response.data);
      } else {
        reject(new Error('Invalid public key format received.'));
      }
    } catch (error) {
      console.error('Failed to fetch public key:', error);
      publicKeyPromise = null; // Reset promise on failure to allow retries
      reject(new Error('Could not retrieve public key for authentication.'));
    }
  });

  return publicKeyPromise;
}

export function encryptPayload(payload: object, publicKeyPem: string): string {
    try {
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const payloadString = JSON.stringify(payload);
        const encrypted = publicKey.encrypt(payloadString, 'RSAES-PKCS1-v1_5');
        return forge.util.encode64(encrypted);
    } catch (error) {
        console.error("Encryption failed:", error);
        throw new Error("Could not encrypt payload.");
    }
}
