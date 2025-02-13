import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckboxWithText } from "@/components/ui/checkbox-with-text";

export default function IndividualForm({
  handleChange,
  userData,
  onSaveClick,
  gymName,
}: {
  handleChange: any;
  userData: any;
  onSaveClick: any;
  gymName: any;
}) {
  return (
    <form className="space-y-12">
      {/* Profile Section */}
      <div className="border-b border-white/10 pb-12">
        <h2 className="text-lg font-semibold text-white">Profile</h2>
        <p className="mt-1 text-sm text-gray-400">
          This information will be shared with the owner of your gym and their staff.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Email */}
          <div className="sm:col-span-4 grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="janesmith@example.com"
              value={userData.email}
              disabled={true}
              name="email"
            />
          </div>

          {/* First Name */}
          <div className="sm:col-span-3 grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              type="text"
              value={userData.firstName}
              onChange={handleChange}
              name="firstName"
            />
          </div>

          {/* Last Name */}
          <div className="sm:col-span-3 grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              type="text"
              value={userData.lastName}
              onChange={handleChange}
              name="lastName"
            />
          </div>

          {/* Gym */}
          <div className="sm:col-span-3 grid gap-2">
            <Label htmlFor="gym">Gym</Label>
            <Input id="gym" type="text" value={gymName} disabled name="gymName" />
          </div>

          {/* Country Dropdown  onValueChange={setCountry} defaultValue={country}*/}
          
          <div className="sm:col-span-3">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select country" />
                 
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="mx">Mexico</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="fa">France</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

          {/* Phone Number */}
          <div className="sm:col-span-3 grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Profile Photo */}
          <div className="col-span-full grid gap-2">
            <Label htmlFor="photo">Photo</Label>
            <div className="mt-2 flex items-center gap-x-3">
              <Avatar>
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="border-b border-white/10 pb-12">
        <h2 className="text-lg font-semibold text-white">Notifications</h2>
        <p className="mt-1 text-sm text-gray-400">
          We'll always let you know about important changes, but you pick what
          else you want to hear about.
        </p>

        {/* Email Notifications */}
        {/*<div className="mt-10">
          <Label className="text-white">By email</Label>
          <div className="mt-4 items-top flex space-x-2">
            <Checkbox
              id="email-offers"
              checked={userData.emailOffers}
              onCheckedChange={handleChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="email-offers"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Offers
              </label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>*/}

        <div className="mt-10 ">
          <Label className="text-white">By email</Label>
          <p className="mt-1 text-sm text-gray-400">
            These are delivered to your inbox. You can unsubscribe at any time.
          </p>
          <RadioGroup
            className="mt-6 space-y-3"
            defaultValue={userData.emailNotifications}
            onValueChange={handleChange}
          >
            <div className="flex items-center gap-x-3">
              <RadioGroupItem value="everything" id="email-everything" />
              <Label htmlFor="email-everything">Everything</Label>
            </div>
            <div className="flex items-center gap-x-3">
              <RadioGroupItem value="critical-and-classes" id="push-email" />
              <Label htmlFor="push-email">
                Upcoming Classes and Critical Updates
              </Label>
            </div>
            <div className="flex items-center gap-x-3">
              <RadioGroupItem value="critical-only" id="push-nothing" />
              <Label htmlFor="push-nothing">Critical Updates only</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Push Notifications */}
        <div className="mt-10 ">
          <Label className="text-white">Push notifications</Label>
          <p className="mt-1 text-sm text-gray-400">
            These are delivered via SMS to your mobile phone.
          </p>
          <RadioGroup
            className="mt-6 space-y-3"
            defaultValue={userData.pushNotifications}
            onValueChange={handleChange}
          >
            <div className="flex items-center gap-x-3">
              <RadioGroupItem value="everything" id="push-everything" />
              <Label htmlFor="push-everything">Everything</Label>
            </div>
            <div className="flex items-center gap-x-3">
              <RadioGroupItem value="same-as-email" id="push-email" />
              <Label htmlFor="push-email">
                Upcoming Classes and Critical Updates
              </Label>
            </div>
            <div className="flex items-center gap-x-3">
              <RadioGroupItem value="no-push" id="push-nothing" />
              <Label htmlFor="push-nothing">Critical Updates only</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button variant="outline">Cancel</Button>
        {/* className="bg-lime-500 hover:bg-lime-400 text-white" */}
        <Button onClick={onSaveClick} >
          Save
        </Button>
      </div>
    </form>
  );
}
