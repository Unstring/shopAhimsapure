
"use client"

import { PageHeader } from "../_components/page-header";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
    return (
        <>
            <PageHeader>Settings</PageHeader>
            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Store Details</CardTitle>
                        <CardDescription>Manage your store's public information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="store-name">Store Name</Label>
                            <Input id="store-name" defaultValue="AhimsaPure" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="store-email">Contact Email</Label>
                            <Input id="store-email" type="email" defaultValue="contact@ahimsapure.com" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Payments</CardTitle>
                        <CardDescription>Enable or disable payment methods.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <Label htmlFor="payment-card">Credit/Debit Card</Label>
                            <Switch id="payment-card" defaultChecked />
                        </div>
                         <div className="flex items-center justify-between rounded-lg border p-4">
                            <Label htmlFor="payment-netbanking">Net Banking</Label>
                            <Switch id="payment-netbanking" defaultChecked />
                        </div>
                         <div className="flex items-center justify-between rounded-lg border p-4">
                            <Label htmlFor="payment-upi">UPI</Label>
                            <Switch id="payment-upi" defaultChecked />
                        </div>
                    </CardContent>
                     <CardFooter className="border-t px-6 py-4">
                        <Button>Save</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Shipping</CardTitle>
                        <CardDescription>Manage shipping rates and zones.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="shipping-rate">Standard Rate</Label>
                            <Input id="shipping-rate" type="number" defaultValue="50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="free-shipping-threshold">Free Shipping Threshold</Label>
                            <Input id="free-shipping-threshold" type="number" defaultValue="500" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save</Button>
                    </CardFooter>
                </Card>

            </div>
        </>
    )
}
