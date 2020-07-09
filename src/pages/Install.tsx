import React from 'react';
import styled from 'styled-components';

import { DownloadArrow } from '../assets/svg/DownloadArrow';
import { BackLinkBanner } from '../components/BackLinkBanner';
import { gutterWidth } from '../helpers/constants';
import { PWA } from '../assets/svg/PWA';
import { AppLogoStyle } from '../components/Banner';

const H1 = styled.h1`
  display: flex;
`;

const PageWithGutter = styled.div`
  padding: ${gutterWidth}px;
`;

const Logo = styled.span`
  ${AppLogoStyle};
  background-image: none;
  background-color: white;
  color: black;
  padding: 0;
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: lightgrey;
  margin: 48px 0;
`;

export const Install = () => (
  <>
    <BackLinkBanner sticky={true} back={{ link: '/', showArrows: true }} />
    <PageWithGutter>
      <H1>
        <DownloadArrow style={{ marginRight: '12px', width: '30px' }} />
        Install app
      </H1>
      <p><Logo>hbff</Logo> is a Progressive Web App <PWA style={{ width: '30px' }}/>, the next generation of mobile applications. Once installed you won&#39;t feel a difference to a native Android or iOS app, only that you never need to update it.</p>

      <h2>iOS</h2>
      <p>Open this page with Safari, click on the share button (box with up arrow) and in the opening popup &#34;Add to Home Screen&#34;. Ready!</p>

      <h2>Android</h2>
      <h3>Firefox</h3>
      <p>In the address bar, to the right of the URL there is a small house icon with a plus symbol in the middle. Click on it and <em>&#34;+ Add to home screen&#34;</em>. That&#39;s it!</p>

      <h3>Chrome / Brave</h3>
      <p>Look for a banner at the bottom of the page that says <em>&#34;Add hbff to Home screen&#34;</em>. Click on it and you&#39;re ready to go.</p>
      <p>If the banner is not there, click on the menu icon and select <em>&#34;Add to Home screen&#34;</em>. That&#39;s it, open the app via the app icon.</p>

      <Hr />
      <p><em>The app also works perfectly fine in the browser and you do not need to install it on your device. However, we recommend installing it for a better user experience.</em></p>

    </PageWithGutter>
  </>
);
