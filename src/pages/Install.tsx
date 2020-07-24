import React from 'react';
import styled from 'styled-components';

import { DownloadArrow } from '../assets/svg/DownloadArrow';
import { Page } from '../components/Page';
import { gutterWidth } from '../helpers/constants';
import { PWA } from '../assets/svg/PWA';
import { AppLogoStyle } from '../components/Banner';

const Gutter = styled.div`
  padding: ${gutterWidth}px;
`;

const Logo = styled.span`
  ${AppLogoStyle};
  padding: 0;
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: lightgrey;
  margin: 48px 0;
`;

const H3 = styled.h3`
  color: grey;
`;

export const Install = () => (
  <Page heading="Install" hideNavigation={true}>
    <Gutter>
      <DownloadArrow style={{ margin: '12px 0', height: '30px', width: '30px' }} />
      <p><Logo>palastripe</Logo> is a Progressive Web App <PWA style={{ width: '30px' }}/>, the next generation of mobile applications. Once installed you won&#39;t feel a difference to a native Android or iOS app, only that you never need to update it.</p>

      <h2>iOS</h2>
      <p>Open this page with Safari, click on the share button (box with up arrow) and in the opening popup &#34;Add to Home Screen&#34;. Ready!</p>

      <h2>Android</h2>
      <H3>Firefox</H3>
      <p>In the address bar, to the right of the URL there is a small house icon with a plus symbol in the middle. Click on it and <em>&#34;+ Add to home screen&#34;</em>. That&#39;s it!</p>

      <H3>Chrome / Brave</H3>
      <p>Look for a banner at the bottom of the page that says <em>&#34;Add palastripe to Home screen&#34;</em>. Click on it and you&#39;re ready to go.</p>
      <p>If the banner is not there, click on the menu icon and select <em>&#34;Add to Home screen&#34;</em>. That&#39;s it, open the app via the app icon.</p>

      <Hr />
      <p><em>The app also works perfectly fine in the browser and you do not need to install it on your device. However, we recommend installing it for a better user experience.</em></p>

    </Gutter>
  </Page>
);
