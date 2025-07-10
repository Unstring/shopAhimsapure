"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Circle, Package, Truck } from 'lucide-react';

interface TrackingStatus {
  status: 'Order Placed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  location: string;
  timestamp: string;
}

const mockTrackingData: { [key: string]: TrackingStatus[] } = {
  "12345": [
    { status: 'Delivered', location: 'Bengaluru, IN', timestamp: 'June 25, 2024, 2:30 PM' },
    { status: 'Out for Delivery', location: 'Bengaluru, IN', timestamp: 'June 25, 2024, 9:00 AM' },
    { status: 'Shipped', location: 'Farm Hub, KA', timestamp: 'June 24, 2024, 6:00 PM' },
    { status: 'Order Placed', location: 'Online Store', timestamp: 'June 24, 2024, 11:00 AM' },
  ],
  "67890": [
     { status: 'Out for Delivery', location: 'Mumbai, MH', timestamp: 'June 26, 2024, 9:15 AM' },
     { status: 'Shipped', location: 'Farm Hub, MH', timestamp: 'June 25, 2024, 8:00 PM' },
     { status: 'Order Placed', location: 'Online Store', timestamp: 'June 25, 2024, 1:00 PM' },
  ]
};

const statusIcons = {
    'Order Placed': Package,
    'Shipped': Truck,
    'Out for Delivery': Truck,
    'Delivered': CheckCircle,
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [trackingHistory, setTrackingHistory] = useState<TrackingStatus[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (mockTrackingData[orderId]) {
      setTrackingHistory(mockTrackingData[orderId]);
      setError(null);
    } else {
      setTrackingHistory(null);
      setError('Order not found. Please check the ID and try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Track Your Order</CardTitle>
          <CardDescription>Enter your order ID to see its current status.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrackOrder} className="flex gap-4">
            <Input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g., 12345)"
              className="flex-grow"
            />
            <Button type="submit">Track</Button>
          </form>

          {error && <p className="mt-4 text-center text-destructive">{error}</p>}
          
          {trackingHistory && (
            <div className="mt-8">
              <h3 className="font-headline text-xl mb-4">Order Status: {trackingHistory[0].status}</h3>
              <div className="relative pl-8">
                <div className="absolute left-3.5 top-0 h-full w-0.5 bg-border"></div>
                {trackingHistory.map((item, index) => {
                    const Icon = statusIcons[item.status] || Circle;
                    const isCurrent = index === 0;
                    return (
                        <div key={index} className="relative mb-8 flex items-start">
                            <div className={`absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full ${isCurrent ? 'bg-primary' : 'bg-muted'}`}>
                                <Icon className={`h-4 w-4 ${isCurrent ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                            </div>
                            <div className="ml-4">
                                <p className={`font-semibold ${isCurrent ? 'text-primary' : ''}`}>{item.status}</p>
                                <p className="text-sm text-muted-foreground">{item.location}</p>
                                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                            </div>
                        </div>
                    );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
