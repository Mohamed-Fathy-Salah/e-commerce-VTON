import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ home, children, user, cartUpdate }) => {
  return (
    <>
      {home && <Nav user={user} cartUpdate={cartUpdate} />}
      {children}
      {home && <Footer />}
    </>
  );
};
export default Layout;
