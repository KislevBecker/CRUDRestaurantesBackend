import app from './server';

import '@babel/polyfill';

async function main(){
  const PORT = process.env.PORT || 8080;
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
};

main();