import { useSession } from 'next-auth/react';
import { Container } from "./styles";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <Container>
      <h1>{session?.user.name}</h1>
    </Container>
  );
}