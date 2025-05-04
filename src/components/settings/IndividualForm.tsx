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
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import DeleteDialog from "./DeleteDialog";

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
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <p className="text-sm text-gray-500">
            This information will be displayed publicly, so be careful what you
            share.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
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
              <Label htmlFor="first-name">Name</Label>
              <Input
                id="first-name"
                type="text"
                value={userData.name}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                name="name"
              />
            </div>

            {/* Gym */}
            <div className="sm:col-span-3 grid gap-2">
              <Label htmlFor="gym">Gym</Label>
              <Input
                id="gym"
                type="text"
                value={gymName}
                disabled
                name="gymName"
              />
            </div>

            {/* Country Dropdown  onValueChange={setCountry} defaultValue={country}*/}

            <div className="sm:col-span-3">
              <Label htmlFor="country">Country</Label>
              <Select
                value={userData.country}
                onValueChange={(value) => handleChange("country", value)}
              >
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
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="it">Italy</SelectItem>
                  <SelectItem value="nl">Netherlands</SelectItem>
                  <SelectItem value="se">Sweden</SelectItem>
                  <SelectItem value="no">Norway</SelectItem>
                  <SelectItem value="dk">Denmark</SelectItem>
                  <SelectItem value="fi">Finland</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="cn">China</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="br">Brazil</SelectItem>
                  <SelectItem value="za">South Africa</SelectItem>
                  <SelectItem value="nz">New Zealand</SelectItem>
                  <SelectItem value="ch">Switzerland</SelectItem>
                  <SelectItem value="ru">Russia</SelectItem>
                  <SelectItem value="kr">South Korea</SelectItem>
                  <SelectItem value="ar">Argentina</SelectItem>
                  <SelectItem value="sg">Singapore</SelectItem>
                  <SelectItem value="ae">United Arab Emirates</SelectItem>
                  <SelectItem value="sa">Saudi Arabia</SelectItem>
                  <SelectItem value="ie">Ireland</SelectItem>
                  <SelectItem value="pt">Portugal</SelectItem>
                  <SelectItem value="gr">Greece</SelectItem>
                  <SelectItem value="pl">Poland</SelectItem>
                  <SelectItem value="tr">Turkey</SelectItem>
                  <SelectItem value="hk">Hong Kong</SelectItem>
                  <SelectItem value="th">Thailand</SelectItem>
                  <SelectItem value="my">Malaysia</SelectItem>
                  <SelectItem value="id">Indonesia</SelectItem>
                  <SelectItem value="ph">Philippines</SelectItem>
                  <SelectItem value="eg">Egypt</SelectItem>
                  <SelectItem value="il">Israel</SelectItem>
                  <SelectItem value="cl">Chile</SelectItem>
                  <SelectItem value="co">Colombia</SelectItem>
                  <SelectItem value="pk">Pakistan</SelectItem>
                  <SelectItem value="vn">Vietnam</SelectItem>
                  <SelectItem value="cz">Czech Republic</SelectItem>
                  <SelectItem value="hu">Hungary</SelectItem>
                  <SelectItem value="at">Austria</SelectItem>
                  <SelectItem value="be">Belgium</SelectItem>
                  <SelectItem value="ro">Romania</SelectItem>
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
                onChange={(e) => handleChange(e.target.name, e.target.value)}
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
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
          <p className="mt-1 text-sm text-gray-400">
            We'll always let you know about important changes, but you pick what
            else you want to hear about.
          </p>

          <div className="mt-10 ">
            <Label className="text-white">By email</Label>
            <p className="mt-1 text-sm text-gray-400">
              These are delivered to your inbox. You can unsubscribe at any
              time.
            </p>
            <RadioGroup
              className="mt-6 space-y-3"
              defaultValue={userData.emailNotifications}
              onValueChange={(value) =>
                handleChange("emailNotifications", value)
              }
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
          {/* <div className="mt-10 ">
              <Label className="text-white">Push notifications</Label>
              <p className="mt-1 text-sm text-gray-400">
                These are delivered via SMS to your mobile phone.
              </p>
              <RadioGroup
                className="mt-6 space-y-3"
                defaultValue={userData.pushNotifications}
                onValueChange={(value) => handleChange("pushNotifications", value)}
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
            </div> */}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Deactivate account</h2>
          <p className="text-sm text-gray-500">
            Deactivating your account allows you to permanently remove your
            account, including all associated data, from the system. This action
            is irreversible and will delete personal information, bookings,
            payment information and any other related data.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              {/* <Label htmlFor="first-name">First Name</Label> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </DialogTrigger>
                <DeleteDialog />
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="mt-6 flex items-center justify-end gap-4">
        {/* <Button variant="outline">Cancel</Button> */}
        {/* className="bg-lime-500 hover:bg-lime-400 text-white" */}
        <Button onClick={onSaveClick}>Save</Button>
      </div>
    </form>
  );
}
