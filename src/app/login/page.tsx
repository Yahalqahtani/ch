import LoginForm from '@/components/LogInForm';
import RegeisterForm from '@/components/RegisterForm';
import Link from 'next/link';

export default async function LoginPage() {
    return (
        <>
            <LoginForm />
            <div>
                <div> OR </div>
                <Link href="/register">Create Account</Link>
            </div>
        </>
    );
}
