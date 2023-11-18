import { SideNav } from "../../components/navbar";
import {
  Avatar,
  Card,
  Table,
  rem,
  Space,
  Text,
  Menu,
  Image,
  Input,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { TopHeader } from "../../components/header";
// import { useEffect } from "react";

import { statusTranslate } from "../../utils/statusUtilss";
import { useState } from "react";

type UserComplaints = {
  complaints: {
    _id: string;
    username: string;
    title: string;
    description: string;
    status: "pending" | "in progress" | "resolved";
    totalUpvotes: number;
    downvote: number;
    createdAt: string;
  }[];
};

export default function Profile() {
  const [cookies] = useCookies(["token", "profile"]);
  const navigate = useNavigate();

  const [profilePicture] = useState(cookies?.profile?.urlUser);

  // const [profile, setProfile] = useState(["profile"]);

  const userComplaints = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        "https://lpm-api.glitch.me/api/history",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      return response.data as UserComplaints;
    },
  });

  // useEffect(() => {
  //   if (cookies.profile == undefined) {
  //     navigate("/login");
  //   }
  // }, [cookies.profile, navigate]);

  const navigateToEdit = () => {
    navigate("/profile/edit");
  };

  if (cookies.profile == undefined) {
    navigate("/login");
    return <div className="text-center">Rerouting...</div>;
  }
  return (
    <div className="h-full bg-[#f4f5f9] ">
      <TopHeader />
      <SideNav />

      <main className="mr-10 h-full pb-8 pl-64 ">
        <Text className="mt-12" size="md" fw={500}>
          Informasi Akun
        </Text>
        <Space h="sm"></Space>
        <Card
          style={{ width: rem(600), height: rem(400) }}
          padding="lg"
          radius="md"
          withBorder
        >
          <Avatar radius="xl" size="xl" src={profilePicture} />
          <Space h="sm"></Space>
          <Text size="sm" fw={500}>
            Username
          </Text>
          <Input component="button" pointer>
            <Input.Placeholder>
              <div>{cookies.profile.username}</div>
            </Input.Placeholder>
          </Input>
          <Space h="sm"></Space>
          <Text size="sm" fw={500}>
            Email
          </Text>
          <Input component="button" pointer>
            <Input.Placeholder>
              <div>{cookies.profile.email}</div>
            </Input.Placeholder>
          </Input>
          <Space h="sm"></Space>
          <div className="flex justify-end pt-4">
            <button
              type="button"
              className=" rounded-lg bg-[#4c62f0] px-4 py-2 text-white"
              onClick={navigateToEdit}
            >
              Edit Profil
            </button>
          </div>
        </Card>
        <Space h="md"></Space>

        {/* Histori Post */}
        <Text size="md" fw={500}>
          Histori Post
        </Text>
        <Space h="sm"></Space>
        <Card
          style={{ width: rem(600), height: rem(500) }}
          padding="lg"
          radius="md"
          withBorder
        >
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Post</Table.Th>
                <Table.Th>Tanggal</Table.Th>
                <Table.Th>Upvotes</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            {userComplaints.isSuccess &&
              userComplaints.data.complaints.map((complaint) => {
                return (
                  <Table.Tr key={complaint?._id}>
                    <Table.Td>{complaint?.title}</Table.Td>
                    <Table.Td>
                      {dayjs(complaint?.createdAt)?.format("DD MMM YYYY")}
                    </Table.Td>
                    <Table.Td>
                      <p className="text-center">{complaint?.totalUpvotes}</p>
                    </Table.Td>
                    <Table.Td>
                      <Menu
                        withArrow
                        position="bottom-end"
                        classNames={{
                          arrow: "border border-blue-400",
                          item: "hover:bg-gray-200",
                        }}
                      >
                        <Menu.Target>
                          <div className="flex cursor-pointer flex-row items-center gap-2">
                            <p className="pointer-events-none">
                              {statusTranslate[complaint?.status]}
                            </p>
                            <Image
                              src="./arrow-down.svg"
                              alt="home"
                              h={15}
                              w={15}
                            />
                          </div>
                        </Menu.Target>
                        <Menu.Dropdown
                          classNames={{ dropdown: "border border-blue-400" }}
                        >
                          <Menu.Item>Tuntas</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
          </Table>
        </Card>
      </main>
    </div>
  );
}
