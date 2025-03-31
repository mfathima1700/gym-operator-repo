import {
  convertToInstructor,
  convertToMember,
} from "@/redux/actions/GymActions";
import { AppDispatch } from "@/redux/store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import {Button} from "@/components/ui/button";
import { useDispatch } from "react-redux";
import React from "react";

interface userData {
  id: string;
  name: string;
  // dob: Date;
  phoneNumber?: string;
  country?: string;
  image?: any;
  emailNotifications?: string;
  isInstructor: boolean;
  createdAt: Date;
}

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function MemberCards({
  gymMembers,
  gymId,
}: {
  gymMembers: userData[];
  gymId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();

  function handleClick(
    e: React.MouseEvent,
    memberId: string,
    isInstructor: boolean
  ) {
    e.preventDefault();
    if (isInstructor) {
      dispatch(convertToMember(memberId, gymId));
    } else {
      dispatch(convertToInstructor(memberId, gymId));
    }
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
       {gymMembers.map((member) => (
        <li
          key={member.id}
          className="overflow-hidden rounded-xl border border-gray-800"
        >
          <div className="flex items-center gap-x-4 border-b border-gray-800   p-6">
            <img
              alt={member.name}
              src={member.image ? member.image: "https://avatars.githubusercontent.com/u/2015447?v=4"}
              className="size-12 flex-none rounded-full bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div className="text-sm/6 font-medium text-white">
              {member.name}
            </div>
          </div>
          <dl className="-my-3 divide-y divide-gray-800 px-6 py-4 text-sm/6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-white">Role</dt>
              <dd className="text-gray-400">
                {member.isInstructor ? "Instructor" : "Member"}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-white">Joined </dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-400">
                  {member.createdAt.toLocaleDateString()}
                </div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-white"></dt>
              <dd className="flex items-start gap-x-2">
                <Button
                  className="items-end"
                  onClick={(e: React.MouseEvent) => {
                    handleClick(
                      e,
                      member.id,
                      member.isInstructor ? true : false
                    );
                  }}
                >
                  {`Convert to ${member.isInstructor ? "Member" : "Instructor"}`}
                </Button>
              </dd>
            </div>
          </dl>
        </li>
      ))} 
    </ul>
  );
}
