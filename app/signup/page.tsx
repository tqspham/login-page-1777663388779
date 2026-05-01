export default function SignupPage(): React.ReactElement {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
          Create Account
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Sign up to get started.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Create Account
          </button>
          <p className="text-center text-slate-600 text-sm">
            Already have an account?{' '}
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
