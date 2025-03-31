"use client";

import MemberCards from "@/components/members/MemberCards";
import CNLayout from "@/components/layout/cn-layout";
import { PaginationDemo } from "@/components/layout/PaginationDemo";
import MemberOptions from "@/components/members/MemberOptions";
import CNMemberOptions from "@/components/members/CNMemberOptions";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getUserAndInstructors, getUserById } from "@/redux/actions/GymActions";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface GymMember {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  gymRole: string;
  isInstructor: boolean;
  phoneNumber: string;
  country: string;
  emailNotifications: string;
  image: string;
}

const fakeMembers = [
  {
    id: "user1",
    email: "john.doe@example.com",
    name: "John Doe",
    createdAt: new Date('2025-03-16T10:00:00Z'),
    gymRole: "MEMBER",
    isInstructor: false,
    phoneNumber: "+1234567890",
    country: "us",
    emailNotifications: "everything",
    image: "https://avatars.githubusercontent.com/u/2012123?v=4"
  },
  {
    id: "user2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    createdAt: new Date('2025-03-15T10:00:00Z'),
    gymRole: "MEMBER",
    isInstructor: true,
    phoneNumber: "+9876543210",
    country: "uk",
    emailNotifications: "critical-only",
    image: "https://avatars.githubusercontent.com/u/2045347?v=4"
  },
  {
    id: "user3",
    email: "mike.johnson@example.com",
    name: "Mike Johnson",
    createdAt: new Date('2025-03-18T10:00:00Z'),
    gymRole: "TRAINER",
    isInstructor: true,
    phoneNumber: "+1122334455",
    country: "ca",
    emailNotifications: "everything",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4"
  },
  {
    id: "user4",
    email: "emma.wilson@example.com",
    name: "Emma Wilson",
    createdAt: new Date('2025-03-16T10:00:00Z'),
    gymRole: "MEMBER",
    isInstructor: false,
    phoneNumber: "+2233445566",
    country: "de",
    emailNotifications: "critical-and-classes",
    image: "https://avatars.githubusercontent.com/u/6543217?v=4"
  },
  {
    id: "user5",
    email: "daniel.brown@example.com",
    name: "Daniel Brown",
    createdAt: new Date('2025-03-15T10:00:00Z'),
    gymRole: "OWNER",
    isInstructor: true,
    phoneNumber: "+3344556677",
    country: "au",
    emailNotifications: "critical-only",
    image: "https://avatars.githubusercontent.com/u/8564347?v=4"
  },
  {
    id: "user6",
    email: "olivia.taylor@example.com",
    name: "Olivia Taylor",
    createdAt: new Date('2025-03-18T10:00:00Z'),
    gymRole: "MEMBER",
    isInstructor: false,
    phoneNumber: "+4455667788",
    country: "fa",
    emailNotifications: "critical-and-classes",
    image: "https://avatars.githubusercontent.com/u/2030567?v=4"
  },
  {
    id: "user7",
    email: "liam.martin@example.com",
    name: "Liam Martin",
    createdAt: new Date('2025-03-16T10:00:00Z'),
    gymRole: "TRAINER",
    isInstructor: true,
    phoneNumber: "+5566778899",
    country: "es",
    emailNotifications: "everything",
    image: "https://avatars.githubusercontent.com/u/2743547?v=4"
  },
  {
    id: "user8",
    email: "sophia.anderson@example.com",
    name: "Sophia Anderson",
    createdAt: new Date('2025-03-16T10:00:00Z'),
    gymRole: "MEMBER",
    isInstructor: false,
    phoneNumber: "+6677889900",
    country: "it",
    emailNotifications: "critical-and-classes",
    image: "https://avatars.githubusercontent.com/u/2022347?v=4"
  },
  {
    id: "user9",
    email: "noah.thomas@example.com",
    name: "Noah Thomas",
    createdAt: new Date('2025-03-15T10:00:00Z'),
    gymRole: "OWNER",
    isInstructor: true,
    phoneNumber: "+7788990011",
    country: "nl",
    emailNotifications: "everything",
image: "https://avatars.githubusercontent.com/u/2012347?v=4"
  }
]

export default function Members() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const userState = useSelector((state: RootState) => state.getUser);
  const alterMemberState = useSelector((state: RootState) => state.alterMember);
  const [userData, setUserData] = useState(() => ({
    goals: [],
    ownedGym: {
      id: "",
      name:"",
      classes: [],
      members: [] as GymMember[],
    },
  }));

  useEffect(() => {
    dispatch(getUserAndInstructors(id));
  }, [id, alterMemberState.success, alterMemberState.error]);

  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

  useEffect(() => {
    // if (userData.gym?.name) {
    //   setUserData((prevState) => ({
    //     ...prevState,
    //     gym: {
    //       ...prevState.gym,
    //       members: fakeMembers, // Set the members with fake data
    //     },
    //   }));
    // }
  }, [userData.ownedGym?.name]);

  return (
    <>
      <CNLayout user={userData} id={id} name={"Members"}>
        <div className="py-8 space-y-8">
          {/* <MemberOptions /> */}
          <CNMemberOptions />

          {userData.ownedGym?.members?.length > 0 ? (
            <MemberCards gymMembers={userData.ownedGym?.members} gymId={userData.ownedGym?.id} />
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-full">
                <p>No members found</p>
              </div>
            </>
          )}
          {userData.ownedGym?.members?.length > 10 ? <PaginationDemo /> : <></>}
        </div>
      </CNLayout>
    </>
  );
}
