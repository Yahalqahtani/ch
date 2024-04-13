import { getSession } from '@/actions/actions';

import LogOutButton from '@/components/LogOutForm';
import LoginPage from './login/page';

export default async function Home() {
    const session = await getSession();

    return <>{session.isLoggedIn ? <LogOutButton /> : <LoginPage />}</>;
}
