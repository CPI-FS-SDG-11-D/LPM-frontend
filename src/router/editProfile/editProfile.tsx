import { Avatar, Card, rem, Space, Text } from "@mantine/core";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "../../configs/url";
import { useNavigate, Link } from "react-router-dom";
import { TopHeader } from "../../components/header";

type ProfileData = {
  user: [
    {
      _id: string;
      username: string;
      email: string;
    },
  ];
};

export default function EditProfile() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageReset = () => {
    setSelectedImage(null);
  };

  const handleSubmit = () => {
    updatePicture.mutate();
  };

  const [cookies, setCookie] = useCookies(["token", "profile"]);
  const [photo] = useState<File | null>(null);
  const [, setPhotoUrl] = useState<string | null>(null);
  const profilePicture = cookies.profile.urlUser;
  const getProfileInfo = useQuery({
    queryKey: ["profileInfo"],
    queryFn: async () => {
      const response = await axios.get(`${SERVER_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      return response.data as ProfileData;
    },
    enabled: false,
  });
  const navigate = useNavigate();

  if (getProfileInfo.isSuccess) {
    setCookie("profile", JSON.stringify(getProfileInfo.data.user[0]), {
      maxAge: 60 * 60 * 23,
    });
    navigate("/profile");
  }

  const updatePicture = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("image", selectedImage as Blob);
      await axios.post(`${SERVER_URL}/api/upload-user`, formData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
    },
    onSuccess: () => {
      alert("update berhasil!");
      getProfileInfo.refetch();
    },
    onError: () => {
      alert("update gagal!");
    },
  });

  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(photo);
    } else {
      setPhotoUrl(null);
    }
    return () => {
      setPhotoUrl(null);
    };
  }, [photo]);

  return (
    <div className="h-screen bg-[#f4f5f9]">
      <TopHeader />
      {/* <SideNav /> */}

      <main className="mr-10 h-full pl-64 pt-10">
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
          {/* <Text size="sm" fw={500}>
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
          </Input> */}
          <Space h="sm"></Space>
          <Text size="md" fw={500}>
            Ubah Foto Profil
          </Text>
          <Space h="sm" />
          <div>
            {selectedImage ? (
              <div>
                {/* <img src={URL.createObjectURL(selectedImage)} alt="Selected" /> */}
                <button
                  type="button"
                  className=" rounded-lg bg-[#4c62f0] px-4 py-2 text-white"
                  onClick={handleImageReset}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className=" rounded-lg bg-[#4c62f0] px-4 py-2 text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div>
                {/* <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                /> */}
                <input
                  type="file"
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:rounded-full file:border-0
                    file:bg-violet-50 file:px-4
                    file:py-2 file:text-sm
                    file:font-semibold file:text-violet-700
                    hover:file:bg-violet-100"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
          <Space h="sm" />
          <Link to="/change-password">
            <Text td="underline" size="sm" fw={500} pt={"lg"}>
              Ubah Password
            </Text>
          </Link>
        </Card>

        {/* Histori Post */}
      </main>
    </div>
  );
}
