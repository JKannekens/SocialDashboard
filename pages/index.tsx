import { CtxOrReq } from 'next-auth/client/_utils';
import { getSession, signOut } from 'next-auth/react';

export default function Home() {
  return (
    <div className="flex justify-center content-center">
      <div className="w-1/4 block">
        <h1 className="text-center">
          This page is only visible once u are logged in.
        </h1>
        <div className="text-center">
          <button
            className="w-1/4 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
