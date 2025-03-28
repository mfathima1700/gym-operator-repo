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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "../ui/dialog";
import DeleteDialog from "./DeleteDialog";

export default function OwnerForm({
  handleChange,
  ownerData,
  onSaveClick,
  gymData,
  handleGymChange,
  setGymData,
}: {
  handleChange: any;
  ownerData: any;
  onSaveClick: any;
  gymData: any;
  handleGymChange: any;
  setGymData: any;
}) {
  function generateGymCode(e: React.MouseEvent): void {
    e.preventDefault();
    const num = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    setGymData((prevState: any) => ({ ...prevState, gymCode: num }));
  }
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const previewUrl = URL.createObjectURL(file);

    // Convert to Buffer (binary data)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    setGymData((prevState: any) => ({ ...prevState, logo: buffer }));
  };

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
                onChange={(e) => handleGymChange(e.target.name, e.target.value)}
              />
            </div>

            <div className="col-span-full">
              <Label htmlFor="first-name">Gym Code</Label>
              <div className="flex items-center gap-4 mt-2">
                <Input
                  id="first-name"
                  className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px]" // Makes input take available space
                  value={gymData.gymCode}
                  placeholder="0000000000000"
                  name="gymCode"
                  readOnly={true}
                />
                <Button variant="outline" onClick={(e) => generateGymCode(e)}>
                  Regenerate
                </Button>
              </div>
            </div>

            <div className="col-span-full">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                className="mt-2"
                value={gymData.description}
                name="description"
                onChange={(e) => handleGymChange(e.target.name, e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-2">
                Write a few sentences about your gym.
              </p>
            </div>

            <div className="col-span-full">
              <Label>Logo</Label>
              <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-800 p-6 rounded-lg">
                {gymData.logo ? (
                  <>
                    <img
                      src={gymData.logo}
                      alt="Logo Preview"
                      className="h-20 w-20 object-cover rounded-full mb-2"
                    />
                  </>
                ) : (
                  <>
                    <ImageIcon className="size-12 text-gray-500" />
                    <Label
                      htmlFor="file-upload"
                      className="mt-2 cursor-pointer text-sm font-semibold text-primary hover:underline"
                    >
                      Upload a file
                    </Label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="country">Country</Label>
              <Select
                value={gymData.country}
                onValueChange={(value) => handleGymChange("country", value)}
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
            <div className="sm:col-span-3">
              <Label htmlFor="first-name">City</Label>
              <Input
                id="first-name"
                className="mt-2"
                value={ownerData.city}
                name="city"
                onChange={(e) => handleGymChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="address">State / Province / Region</Label>
              <Input
                id="address"
                className="mt-2"
                value={gymData.state}
                name="state"
                onChange={(e) => handleGymChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                className="mt-2"
                value={gymData.streetAddress}
                name="streetAddress"
                onChange={(e) => handleGymChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="first-name">Postcode</Label>
              <Input
                id="first-name"
                className="mt-2"
                value={ownerData.postcode}
                name="postcode"
                onChange={(e) => handleGymChange(e.target.name, e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                className="mt-2"
                value={ownerData.email}
                disabled={true}
                name="email"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                className="mt-2"
                value={ownerData.name}
                name="name"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="last-name">Phone Number</Label>
              <Input
                id="last-name"
                className="mt-2"
                value={ownerData.phoneNumber}
                name="phoneNumber"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>

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

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Notifications</h2>
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
              defaultValue={ownerData.emailNotifications}
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
              defaultValue={ownerData.pushNotifications}
              onValueChange={(value) =>
                handleChange("pushNotifications", value)
              }
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
            Deactivating your account will permanently remove your gym owner
            profile and all associated data from the system. This action is
            irreversible and will delete your personal information, gym details,
            memberships, bookings, payment records, and any other related data.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
            <div className="sm:col-span-3 ">
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

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        {/* className="bg-lime-500 hover:bg-lime-400 text-white" */}
        <Button type="button" onClick={onSaveClick}>
          Save
        </Button>
      </div>
    </form>
  );
}
