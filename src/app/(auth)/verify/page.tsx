
"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';

type VerificationStatus = 'verifying' | 'success' | 'error';

function VerificationComponent() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<VerificationStatus>('verifying');
    const [message, setMessage] = useState('We are verifying your email. Please wait...');

    useEffect(() => {
        let token = searchParams.get('token');

        if (token) {
            const eyIndex = token.indexOf('ey');
            if (eyIndex > 0) {
                token = token.substring(eyIndex);
            }
        }

        if (!token) {
            setStatus('error');
            setMessage('No verification token found. Please check the link and try again.');
            return;
        }

        const verifyToken = async () => {
            try {
                await api.get(`/auth/verify-email/${token}`);
                setStatus('success');
                setMessage('Your email has been successfully verified! You can now log in.');
            } catch (error: any) {
                setStatus('error');
                const errorMessage = error.response?.data?.message || 'Invalid or expired token. Please try signing up again.';
                setMessage(errorMessage);
            }
        };

        verifyToken();
    }, [searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-primary/5 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    {status === 'verifying' && <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />}
                    {status === 'success' && <CheckCircle className="mx-auto h-12 w-12 text-green-500" />}
                    {status === 'error' && <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />}
                    <CardTitle className="font-headline text-2xl mt-4">
                        {status === 'verifying' && 'Verifying Email'}
                        {status === 'success' && 'Verification Successful'}
                        {status === 'error' && 'Verification Failed'}
                    </CardTitle>
                    <CardDescription>{message}</CardDescription>
                </CardHeader>
                <CardContent>
                    {status !== 'verifying' && (
                        <Button asChild>
                            <Link href="/login">
                                Go to Login
                            </Link>
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationComponent />
    </Suspense>
  )
}
