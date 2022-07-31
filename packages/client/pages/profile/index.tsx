import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import React from 'react';

import { Layout } from '@Components';

type ProfileComponent = NextPage & {
  getLayout(page: ReactElement): ReactElement;
};

const Profile: ProfileComponent = () => {
  return <div>Profile</div>;
};

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Profile;
