import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Divider,
  Stack,
} from "@mantine/core";

import { useCookies } from "react-cookie";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { SERVER_URL } from "../../configs/url";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export default function ChangePassword(props: PaperProps) {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const changePasswordFetch = useMutation({
    mutationFn: async (reqBody: object) => {
      const response = await axios.post(
        `${SERVER_URL}/api/update-password`,
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      return response.data;
    },
    onError: () => {
      notifications.show({
        title: "Gagal",
        message: "Password gagal diubah, coba lagi",
        color: "red",
      });
    },
    onSuccess() {
      notifications.show({
        title: "Berhasil",
        message: "Password berhasil diubah",
        color: "white",
        icon: <img src="/success.gif" alt="success" />,
      });
      navigate("/profile");
    },
  });

  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      newPassword: (val) =>
        val.length <= 6 ? "Password minimal 6 karakter" : null,
      confirmPassword: (val, otherVal) =>
        val !== otherVal.newPassword ? "Passwords tidak sama" : null,
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-[#f4f5f9]">
      <Paper mx="auto" w="25rem" radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Ganti Password
        </Text>

        <Divider labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit((value) => {
            changePasswordFetch.mutate(value);
          })}
        >
          <Stack>
            <PasswordInput
              required
              label="Password Lama"
              placeholder="Masukan kata sandi lama anda"
              radius="md"
              {...form.getInputProps("oldPassword")}
            />

            <PasswordInput
              required
              label="Password baru"
              placeholder="Masukan kata sandi baru anda"
              radius="md"
              {...form.getInputProps("newPassword")}
            />

            <PasswordInput
              required
              label="Konfirmasi Password Baru"
              placeholder="Ulangi kata sandi baru anda"
              radius="md"
              {...form.getInputProps("confirmPassword")}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <button
              type="submit"
              className="rounded-md bg-[#4c62f0] p-1 px-2 text-sm text-white"
            >
              Ubah
            </button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
