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

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export default function ChangePassword(props: PaperProps) {
  const getAccessToken = useMutation({
    mutationFn: async (reqBody: object) => {
      const response = await axios.post(
        "https://lpm-api.glitch.me/api/login",
        reqBody,
      );
      return response.data;
    },
    onError: () => alert("Akun tidak tersedia"),
    onSuccess(data) {
      console.log(data);
      localStorage.setItem("token", data.token);
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

  return (
    <div className="flex h-screen items-center justify-center bg-[#f4f5f9]">
      <Paper mx="auto" w="25rem" radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Ganti Password
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

            <PasswordInput
              required
              label="Password baru"
              placeholder="Masukan kata sandi baru anda"
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

            <PasswordInput
              required
              label="Ulangi Password Baru"
              placeholder="Masukan kata sandi baru anda"
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
              Ubah
            </button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
