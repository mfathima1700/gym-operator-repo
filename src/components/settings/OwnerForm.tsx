import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircle, ImageIcon, ChevronDown } from "lucide-react";

export default function OwnerForm({
  handleChange,
  ownerData,
  onSaveClick,
  gymData,
  handleGymChange,
}: {
  handleChange: any;
  ownerData: any;
  onSaveClick: any;
  gymData: any;
  handleGymChange: any;
}) {
  return (
    <form className="space-y-12">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Gym Information</h2>
          <p className="text-sm text-gray-500">
            This information will be displayed publicly, so be careful what you
            share.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Label htmlFor="gym-name">Gym Name</Label>
              <Input
                id="gym-name"
                placeholder="Enter gym name"
                className="mt-2"
                value={gymData.gymName}
                name="gymName"
                onChange={handleGymChange}
              />
            </div>
            <div className="col-span-full">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={3} className="mt-2"  value={gymData.description}
                name="description"
                onChange={handleGymChange} />
              <p className="text-sm text-gray-500">
                Write a few sentences about your gym.
              </p>
            </div>
            <div className="col-span-full flex items-center gap-4">
              <UserCircle className="size-12 text-gray-500" />
              <Button variant="outline">Change</Button>
            </div>
            <div className="col-span-full">
              <Label>Logo</Label>
              <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
                <ImageIcon className="size-12 text-gray-500" />
                <Label
                  htmlFor="file-upload"
                  className="mt-2 cursor-pointer text-sm font-semibold text-primary"
                >
                  Upload a file
                </Label>
                <input id="file-upload" type="file" className="hidden" />
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select country" />
                  <ChevronDown className="ml-auto size-5 text-gray-400" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="mx">Mexico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-full">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                className="mt-2"
                value={gymData.streetAddress}
                name="streetAddress"
                onChange={handleGymChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                className="mt-2"
                value={ownerData.firstName}
                name="firstName"
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                className="mt-2"
                value={ownerData.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                className="mt-2"
                value={ownerData.email}
                disabled={true}
                name="email"
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="mt-6">
            <Label className="font-semibold">By Email</Label>
            <div className="mt-2 flex items-center gap-3">
              <Checkbox id="offers" />
              <Label htmlFor="offers">Offers</Label>
            </div>
          </div>
          <div className="mt-6">
            <Label className="font-semibold">Push Notifications</Label>
            <p className="text-sm text-gray-500">
              These are delivered via SMS to your mobile phone.
            </p>
            <RadioGroup className="mt-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="everything"
                  id="push-everything"
                  defaultChecked
                />
                <Label htmlFor="push-everything">Everything</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="email" id="push-email" />
                <Label htmlFor="push-email">Same as email</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="nothing" id="push-nothing" />
                <Label htmlFor="push-nothing">No push notifications</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button type="button" onClick={onSaveClick}></Button>
      </div>
    </form>
  );
}
