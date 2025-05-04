// src/app/contact/page.tsx

export default function ContactPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <p className="mb-4">
                For inquiries, feedback, or support, please reach out to us.
            </p>
            {/* Add contact form or email address later */}
            <p>Email: <a href="mailto:support@ivyapp.health" className="text-blue-600 dark:text-blue-400 hover:underline">support@ivyapp.health</a> (Placeholder)</p>
        </div>
    );
}

