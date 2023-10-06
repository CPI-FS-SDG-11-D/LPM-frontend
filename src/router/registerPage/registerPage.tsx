import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
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
} from '@mantine/core';
import axios from 'axios';

export function AuthenticationForm(props: PaperProps) {
  const [type] = useToggle(['register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length >= 6 ? null : 'Password should include at least 6 characters'),
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    try {
      const response = await axios.post('https://lpm-api.glitch.me/endpoint', {
        baseUrl: 'https://lpm-api.glitch.me',
      });
      console.log('Response:', response.data);
      window.alert('Registration successful!');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Selamat datang di Layanan Pengaduan Masyarakat
      </Text>

      <Divider label="Daftar di sini" labelPosition="center" my="lg" />

      <form onSubmit={handleSubmit}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Username"
              className="w-1/2 p-2 border rounded-md"
              placeholder="Username"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            className="w-1/2 p-2 border rounded-md"
            placeholder="hello@email.co"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            className="w-1/2 p-2 border rounded-md"
            placeholder="password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
