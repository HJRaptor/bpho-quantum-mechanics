import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // shadcn button component

export default function Homepage() {
    return (
        <>


            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    BPhO 2026 Computational Challenge
                </h1>
            </main>
        </>
    );
}