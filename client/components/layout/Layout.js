import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ home, children, user }) => {
  return (
    <>
      {home && <Nav user={user} />}
      {children}
      {home && <Footer />}
    </>
  );
};
export default Layout;
