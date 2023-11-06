import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Stack,
} from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { upperFirst } from "@mantine/hooks";

export function AuthenticationForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length >= 6
          ? null
          : "Password should include at least 6 characters",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.values.password.length < 6) {
      alert("Password harus terdiri minimal dari 6 karakter");
      return;
    }

    if (!form.values.terms) {
      alert("Anda harus menyetujui syarat dan ketentuan.");
      return;
    }
    try {
      const response = await axios.post(
        "https://lpm-api.glitch.me/api/register",
        {
          username: form.values.username,
          email: form.values.email,
          password: form.values.password,
        },
      );
      console.log("Response:", response.data);
      window.alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          window.alert("Email is already registered.");
        } else {
          console.error("Error:", error);
        }
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#f4f5f9]">
      <Paper mx="auto" w="25rem" radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Daftar
        </Text>

        <Divider labelPosition="center" my="lg" />

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              required
              label="Username"
              placeholder="Masukan username Anda"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="Masukan email Anda"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
              type="email"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Masukan kata sandi Anda"
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

            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button type="submit" radius="xl" className="bg-[#4c62f0]">
              {upperFirst("daftar")}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
