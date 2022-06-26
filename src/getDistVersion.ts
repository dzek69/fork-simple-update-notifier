import https from 'https';

const getDistVersion = async (packageName: string, distTag: string) => {
  const url = `https://registry.npmjs.org/-/package/${packageName}/dist-tags`;

  return new Promise<string>((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = '';

        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          const json = JSON.parse(body);
          const version = json[distTag].split('-')[0];
          if (!version) {
            reject(new Error('Error getting version'));
          }

          resolve(version);
        });
      })
      .on('error', (err) => reject(err));
  });
};

export default getDistVersion;
