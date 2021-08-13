require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }
  console.log("Notarizing the app with appleid: ", process.env.REACT_APP_APPLEID);

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId: 'com.shout.desktop',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
  });
};
