
"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import api from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';

type VerificationStatus = 'verifying' | 'success' | 'error';

export default function VerifyPage() {
    const pathname = usePathname();
    const [status, setStatus] = useState<VerificationStatus>('verifying');
    const [message, setMessage] = useState('We are verifying your email. Please wait...');

    useEffect(() => {
        const pathSegments = pathname.split('/');
        const token = pathSegments[pathSegments.length - 1];

        if (!token || token === 'verify') {
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
    }, [pathname]);

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
