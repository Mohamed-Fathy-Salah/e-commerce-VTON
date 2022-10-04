import Head from 'next/head';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ home, children, user }) => {
  return (
    <>
      <Head>
        <title>SmartFasion</title>
      </Head>
      {home && <Nav user={user} />}
      {children}
      {home && <Footer />}
    </>
  );
};
export default Layout;
