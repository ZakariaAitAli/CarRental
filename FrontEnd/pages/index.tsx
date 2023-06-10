import type {NextPage} from 'next';
import {Content} from '../components/home/content';
import {initFirebase} from '../firebase/firebaseApp';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {
      Card,
      Spacer,
      Button,
      Text,
      Input,
      Row,
      Checkbox,
      Container,
      Link,
      Navbar,
      Switch,
    } from "@nextui-org/react";

const Home: NextPage = () => {
   const auth = getAuth();
   const [user, loading] = useAuthState(auth);
   const app = initFirebase();
   console.log(app);
   const signIn = () => {
      console.log("sign in")
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        window.location.href = "/";
      }).catch((error) => {
            console.log(error);
      });
  }

   return <>
         {user && <Content />}
         {!user && <Container
          display="flex"
          alignItems="center"
          justify="center"
          css={{ minHeight: "80vh" }}
        >
          <Card css={{ mw: "420px", p: "20px" }} variant="shadow">
            <Text
              size={24}
              weight="bold"
              css={{
                as: "center",
                mb: "20px",
              }}
            >
              Login
            </Text>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
            <Spacer y={1} />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              type="password"
              placeholder="Password"
              css={{ mb: "6px" }}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <Text size={14}>
                <Link>Forgot password?</Link>
              </Text>
            </Row>
            <Spacer y={1} />
            <Spacer y={0.5} />
            <Button color="primary">
              Sign in 
            </Button>
            <Spacer y={0.5} />
            <Button color="error" onPress={signIn}>
              Sign in with google
            </Button>
          </Card>
        </Container>}
      </>;
};

export default Home;
