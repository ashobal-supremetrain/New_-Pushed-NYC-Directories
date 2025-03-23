export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-xl">Learn more about the New York State Directory</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            The New York State Directory is dedicated to connecting residents and visitors with businesses across New York State. Our mission is to provide a comprehensive, user-friendly platform that makes it easy to discover and connect with local businesses, fostering economic growth and community engagement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Listings</h3>
              <p className="text-gray-600">
                Browse through thousands of businesses across New York State, organized by category and location.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Navigation</h3>
              <p className="text-gray-600">
                Find businesses quickly with our intuitive search and filtering system.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Submissions</h3>
              <p className="text-gray-600">
                Add your business to our directory and reach more customers in your community.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Information</h3>
              <p className="text-gray-600">
                Trust in our verified business listings with up-to-date contact information.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
          <p className="text-gray-600 leading-relaxed">
            We are committed to maintaining a high-quality directory that serves both businesses and consumers. Our team regularly verifies and updates business information to ensure accuracy and reliability. We also work closely with business owners to help them showcase their services effectively.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Involved</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Want to add your business to our directory? It's easy and free!
            </p>
            <a
              href="/submit-business"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Your Business
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            Have questions or suggestions? We'd love to hear from you. Visit our{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-800">
              contact page
            </a>{' '}
            to get in touch with our team.
          </p>
        </section>
      </div>
    </div>
  )
} 