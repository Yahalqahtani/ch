import RegeisterForm from '@/components/RegisterForm';
import Link from 'next/link';

export default async function RegisterPage() {
    return (
        <>
            <RegeisterForm />

            <div>
                <div> OR </div>
                <Link href="/login">Login here</Link>
            </div>
        </>
    );
}
