import { SideNav } from "../../components/navbar";
import {
  Avatar,
  Card,
  rem,
  Space,
  Text,
  Input,
  Modal,
  Button,
  FileInput,
} from "@mantine/core";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "../../configs/url";
import { useNavigate } from "react-router-dom";

type ProfileData = {
  user: [
    {
      _id: string;
      username: string;
      email: string;
    },
  ];
};

export default function editProfile() {
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

  const [cookies, setCookie, removeCookie] = useCookies(["token", "profile"]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
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
      alert("update gagak!");
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
      <SideNav />

      <main className="mr-10 h-full pl-64 pt-10">
        <Text size="md" fw={500}>
          Informasi Akun
        </Text>
        <Space h="sm"></Space>
        <Card
          style={{ width: rem(600), height: rem(400) }}
          padding="lg"
          radius="md"
          withBorder
        >
          <Avatar
            radius="xl"
            size="xl"
            src={
              selectedImage == null
                ? profilePicture
                : URL.createObjectURL(selectedImage)
            }
          />
          <Space h="sm"></Space>
          <Space h="sm"></Space>
          <Text size="sm" fw={500}>
            Ganti Password
          </Text>
          <Space h="sm"></Space>
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
          {/* <div className="flex justify-end gap-4 pt-4">
            <FileInput
              value={photo}
              onChange={setPhoto}
              placeholder="Edit Foto"
              accept="image/png,image/jpeg"
              clearable
              clearButtonProps={{ "aria-label": "Remove photo" }}
              classNames={{ input: "border-[#4c62f0]" }}
            />
            <button
              type="button"
              className="rounded-sm bg-[#4c62f0] px-4 py-1 text-sm text-white"
            >
              Simpan
            </button>
          </div> */}
        </Card>
        <Space h="md"></Space>

        {/* Histori Post */}
      </main>
    </div>
  );
}
