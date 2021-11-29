
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/Projetos/customer-list-results';
import { CustomerListToolbar } from '../components/Projetos/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://apilg.herokuapp.com/Project', {method: 'GET'})
  const customers = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      customers,
    },
  }
}

const Customers = (customers) => (
  <>
    <Head>
      <title>
        Projetos | LG Front End
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default Customers;
