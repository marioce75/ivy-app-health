// src/app/disclaimer/page.tsx

export default function DisclaimerPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
            <p className="mb-4">
                The information provided on IVY App is intended for educational and informational purposes only 
                and does not constitute medical advice. It is designed for use by qualified healthcare professionals.
            </p>
            <p className="mb-4">
                While we strive to ensure the accuracy and timeliness of the information, IVY App makes no warranties 
                regarding the completeness, reliability, or accuracy of this information. Clinical practice may vary, 
                and users should exercise their professional judgment and consult primary sources and institutional protocols.
            </p>
            <p className="mb-4">
                IVY App is not responsible for any errors or omissions, or for any outcomes resulting from the use of 
                this information. Reliance on any information provided by this application is solely at your own risk.
            </p>
            <p>
                Always consult with a qualified healthcare provider for any questions regarding a medical condition or treatment.
            </p>
        </div>
    );
}

