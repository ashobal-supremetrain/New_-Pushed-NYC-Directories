export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-xl">How we handle and protect your information</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            At the New York State Directory, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
            <p className="text-gray-600">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Submit a business listing</li>
              <li>Contact us through our contact form</li>
              <li>Sign up for our newsletter</li>
              <li>Create an account</li>
            </ul>
            <p className="text-gray-600">
              This information may include:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business information</li>
              <li>Messages and communications</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
            <li>Provide and maintain our services</li>
            <li>Process your business submissions</li>
            <li>Respond to your inquiries</li>
            <li>Send you important updates and notifications</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell or rent your personal information to third parties. We may share your information with:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
            <li>Service providers who assist in our operations</li>
            <li>Law enforcement when required by law</li>
            <li>Business partners with your consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Object to data processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@nysdirectory.com" className="text-blue-600 hover:text-blue-800">
              privacy@nysdirectory.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section className="text-sm text-gray-500">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </section>
      </div>
    </div>
  )
} 