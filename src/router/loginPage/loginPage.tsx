import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Divider,
  Stack,
} from "@mantine/core";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

// import { useEffect } from "react";

type ProfileData = {
  user: [
    {
      _id: string;
      username: string;
      email: string;
    },
  ];
};

export default function LoginPage(props: PaperProps) {
  const [cookies, setCookie] = useCookies(["token", "profile"]);

  const navigate = useNavigate();

  const getProfileInfo = useQuery({
    queryKey: ["profileInfo"],
    queryFn: async () => {
      const response = await axios.get(
        "https://lpm-api.glitch.me/api/profile",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      return response.data as ProfileData;
    },

    enabled: !!cookies.token,
  });

  const getAccessToken = useMutation({
    mutationFn: async (reqBody: object) => {
      const response = await axios.post(
        "https://lpm-api.glitch.me/api/login",
        reqBody,
      );
      return response.data;
    },
    onError: () => alert("Akun tidak tersedia"),
    onSuccess: async (data) => {
      console.log(!!data);
      setCookie("token", data.token, { maxAge: 60 * 60 * 24 });

      // await getProfileInfo.refetch();
    },
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  if (getProfileInfo.isSuccess) {
    setCookie("profile", JSON.stringify(getProfileInfo.data.user[0]), {
      maxAge: 60 * 60 * 23,
    });
    navigate("/");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[#f4f5f9]">
      <Paper mx="auto" w="25rem" radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Login
        </Text>

        <Divider labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit((value) => {
            getAccessToken.mutate(value);
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="Masukan email anda"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Masukan kata sandi anda"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            {/* <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Tidak punya akun? buat disini"}
            </Anchor> */}
            <button className="rounded-md bg-[#4c62f0] p-1 px-2 text-sm text-white">
              Masuk
            </button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
