"use client";

import CNLayout from "@/components/layout/cn-layout";
import { getUserById } from "@/redux/actions/GymActions";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { sendCancelEmail } from "@/redux/actions/EmailActions";

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function OwnerDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const userState = useSelector((state: RootState) => state.getUser);
  const [userData, setUserData] = useState(() => ({
    gym: {
      id: "",
    },
  }));

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id]); // Only runs when `id` changes

  // Update state when user data is available
  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setUserData(userState.user);
    }
  }, [userState.user, userState.success, userState.error]);

  function onSendEmailClick(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(sendCancelEmail("test@test.com", {}));
  }

  return (
    <>
      <CNLayout user={userData} id={id}>
        <div>


          <Button  onClick={onSendEmailClick}>
            Send Email
          </Button>
        </div>
      </CNLayout>
    </>
  );
}
