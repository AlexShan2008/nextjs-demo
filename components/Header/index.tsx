// import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
// import { useRouter } from 'next/router'
import { Layout, Menu } from 'antd';

const { Content } = Layout;
import { NAV_LIST } from './data';

type Props = {
  title?: string;
};

function Header({ title }: Props): JSX.Element {
  // const [active, setActive] = useState('1')
  // const router = useRouter()

  // useEffect(() => {
  //   if (router.pathname.includes('demo')) {
  //     setActive('2')
  //   } else {
  //     setActive('1')
  //   }
  // })

  return (
    <>
      <Head>
        <title>next-i18next</title>
      </Head>

      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        {NAV_LIST.map((nav) => (
          <Menu.Item key={nav.id}>
            <Link href={nav.href}>
              <a>{nav.name}</a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>

      <Content style={{ padding: '0 50px' }}>
        <h1>{title}</h1>
      </Content>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
